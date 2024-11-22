import React, { useState } from "react";
import AddListingView from "./AddListing.view";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import db, { storage } from "../../../config/firebaseConfig";
import {
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  serverTimestamp,
  collection,
  doc,
  GeoPoint,
} from "@firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "@firebase/storage";
import { useEffect } from "react";
import { Place } from "../../../context/PlaceContext";
import { UserAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

async function getWebpFile(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;

      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0);

      canvas.toBlob(function (blob) {
        resolve(
          new File(
            [blob],
            source.file.name.substr(0, source.file.name.lastIndexOf(".")) +
              "." +
              "webp",
            { type: "image/webp" }
          )
        );
      }, "image/webp");
    };

    image.onerror = (error) => {
      reject(error);
    };

    image.src = source.data_url;
  });
}

const AddListing = () => {
  const { user } = UserAuth();
  const { placeValue, updatePlaceValue } = Place();
  const [meetupDate, setMeetupDate] = useState();
  const [meetupTime, setMeetupTime] = useState();
  const [divisionNumber, setDivisionNumber] = useState(1);
  const [portionNumber, setPortionNumber] = useState(1);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [images, setImages] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [portionPrice, setPortionPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const initialValues = {
    itemName: "",
    description: "",
    originalPrice: "",
  };

  const validationSchema = Yup.object({
    itemName: Yup.string().required("Your item name is required."),
    description: Yup.string().required("Your item description is required."),
    originalPrice: Yup.number()
      .positive("Your item price should be larger than 0.")
      .required("Your item price is required.")
      .typeError("Your item price should be a number."),
  });

  useEffect(() => {
    updatePlaceValue("");
  }, []);

  useEffect(() => {
    getDocs(collection(db, "category")).then((categoriesResponse) => {
      setCategories(
        categoriesResponse.docs.map((doc) => {
          return { value: doc.data().value, label: doc.data().label };
        })
      );
    });
  }, []);

  useEffect(() => {
    const _portionPrice = originalPrice / divisionNumber;
    const _totalPrice = _portionPrice * portionNumber;

    setPortionPrice(
      isNaN(_portionPrice) ||
        !isFinite(_portionPrice) ||
        _portionPrice < 0 ||
        divisionNumber < portionNumber
        ? Number(0).toFixed(2)
        : Number(_portionPrice).toFixed(2)
    );
    setTotalPrice(
      isNaN(_totalPrice) ||
        !isFinite(_totalPrice) ||
        _totalPrice < 0 ||
        divisionNumber < portionNumber
        ? Number(0).toFixed(2)
        : Number(_totalPrice).toFixed(2)
    );
  }, [originalPrice, divisionNumber, portionNumber]);

  const handleOnSubmit = ({ itemName, description, originalPrice }) => {
    if (
      images.length !== 0 &&
      placeValue &&
      category &&
      meetupDate &&
      meetupTime &&
      0 < divisionNumber &&
      0 < portionNumber &&
      portionNumber <= divisionNumber
    ) {
      const [year, month, day] = meetupDate.split("-");
      const [hours, minutes] = meetupTime.split(":");

      getDoc(doc(db, "user", user.uid)).then((userResponse) => {
        addDoc(collection(db, "product"), {
          categoryLabel: category.label,
          categoryValue: category.value,
          createdAt: serverTimestamp(),
          createdByDisplayName: userResponse.data().displayName,
          createdByFirstName: userResponse.data().firstName,
          createdById: doc(db, "user", user.uid),
          createdByIdent: user.uid,
          createdByLastName: userResponse.data().lastName,
          createdByNickName: userResponse.data().displayName,
          description: description,
          images: [
            "https://firebasestorage.googleapis.com/v0/b/splitshare-67496.appspot.com/o/system-image%2Fno-image.jpg?alt=media&token=3f828f90-b19c-42a7-a458-7a8dabca0870",
          ],
          lat: placeValue.geometry.location.lat(),
          latitude: placeValue.geometry.location.lat(),
          location: new GeoPoint(
            placeValue.geometry.location.lat(),
            placeValue.geometry.location.lng()
          ),
          long: placeValue.geometry.location.lng(),
          longitude: placeValue.geometry.location.lng(),
          meetUpAddress: placeValue.formatted_address,
          meetUpInfo: new Date(year, month - 1, day, hours, minutes),
          name: itemName,
          price: Number(portionPrice),
          qty: portionNumber,
        }).then(async (productResponse) => {
          const _images = [];
          const promises = images.map(async (image, index) => {
            const file = await getWebpFile(image);

            const fileRef = ref(
              storage,
              `product-image/${productResponse.id}/${file.name}`
            );

            return uploadBytes(fileRef, file).then(async (uploadResponse) => {
              return getDownloadURL(uploadResponse.ref).then((url) => {
                _images.push({ index: index, url: url });
              });
            });
          });

          Promise.all(promises).then((response) => {
            _images.sort((previous, next) => previous.index - next.index);
            const __images = _images.map((image) => image.url);

            updateDoc(doc(db, "product", productResponse.id), {
              images: __images,
              productId: productResponse.id,
            }).then((updateResponse) => {
              getDoc(doc(db, "product", productResponse.id)).then(
                (_productResponse) => {
                  navigate("/user");
                }
              );
            });
          });
        });
      });
    } else if (images.length === 0) {
      toast.error("At least one photo is required.", {
        autoClose: 1500,
      });
    }
  };

  const handleOnBlur = (event, formik) => {
    setOriginalPrice(event.target.value);
    formik.handleBlur(event);
  };

  const generatedProps = {
    placeValue,
    images,
    setImages,
    meetupDate,
    setMeetupDate,
    meetupTime,
    setMeetupTime,
    divisionNumber,
    setDivisionNumber,
    portionNumber,
    setPortionNumber,
    categories,
    setCategory,
    portionPrice,
    totalPrice,
    initialValues,
    validationSchema,
    handleOnSubmit,
    handleOnBlur,
    navigate,
  };
  return <AddListingView {...generatedProps} />;
};

export default AddListing;

/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import SettingsView from "./Settings.view";
import * as Yup from "yup";
import { updatePassword } from "firebase/auth";
import { auth, storage } from "./../../config/firebaseConfig";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Place } from "../../context/PlaceContext";
import { doc, getDoc, updateDoc, serverTimestamp } from "@firebase/firestore";
import db from "../../config/firebaseConfig";

const Settings = () => {
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [aboutUsVisibility, setAboutUsVisibility] = useState(true);
  const [singleImage, setSingleImage] = useState([]);
  const [contactNumberInfo, setContactNumberInfo] = useState("");
  const [addressInfo, setAddressInfo] = useState("");
  const { placeValue, updatePlaceValue } = Place();

  const user = auth.currentUser;

  useEffect(() => {
    updatePlaceValue("");
  }, []);

  useEffect(() => {
    if (user) {
      getDoc(doc(db, "user", user.uid)).then((userResponse) => {
        setSingleImage([{ data_url: userResponse.data().imageUrl }]);
        setContactNumberInfo(userResponse.data().contactNumber);
        setAddressInfo(userResponse.data().address);
      });
    }
  }, [user]);

  const changePasswordValues = {
    password: "",
    newPassword: "",
  };

  const changeContactValues = {
    contactNumber: contactNumberInfo,
  };

  const validatePasswordSchema = Yup.object({
    password: Yup.string().required("Your password is required"),
    newPassword: Yup.string().required("Your new password is required"),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Your new password does not match"
    ),
  });
  const resetAddressInfo = () => {
    setAddressInfo("");
  };
  const onSubmitUpdateInfo = async ({ contactNumber }) => {
    if (!singleImage[0].data_url.includes("firebasestorage.googleapis.com")) {
      for (const image of singleImage) {
        const file = image.file;
        const uniqueId = uuidv4();
        const fileRef = ref(
          storage,
          `profile-image/${file.name.split(".")[0]}-${uniqueId}`
        );
        const uploadTask = uploadBytesResumable(fileRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress + "% Done.");
          },
          (error) => {
            console.log(error);
          },
          async () => {
            try {
              const userDocRef = doc(db, "user", user.uid);
              const imageUrl = await getDownloadURL(fileRef);
              await updateDoc(userDocRef, {
                imageUrl: imageUrl,
                contactNumber: contactNumber,
                address: placeValue.formatted_address
                  ? placeValue.formatted_address
                  : addressInfo,
                updatedAt: serverTimestamp(),
              })
                .then(() => {
                  setSingleImage([{ data_url: imageUrl }]);
                })
                .then(() => {
                  toast.success("Information has been successfully updated.", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    newestOnTop: false,
                    theme: "light",
                    toastId: 3,
                  });
                });
            } catch (error) {
              toast.error("Error updating your information", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                newestOnTop: false,
                theme: "light",
                toastId: 4,
              });
            }
          }
        );
      }
    } else {
      const userDocRef = doc(db, "user", user.uid);

      updateDoc(userDocRef, {
        contactNumber: contactNumber,
        address: placeValue.formatted_address
          ? placeValue.formatted_address
          : addressInfo,
        updatedAt: serverTimestamp(),
      })
        .then(() => {
          if (!toast.isActive()) {
            toast.success("Information has been successfully updated.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              draggable: true,
              pauseOnHover: true,
              progress: undefined,
              theme: "light",
              toastId: 5,
            });
          }
        })
        .catch((error) => {
          toast.error("Error updating your information", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            newestOnTop: false,
            theme: "light",
            toastId: 6,
          });
        });
    }
  };

  const onSubmitNewPassword = async ({ newPassword }) => {
    updatePassword(user, newPassword)
      .then(() => {
        console.log("Password changed successfully.");
        toast.success("Password has been changed successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          progress: undefined,
          newestOnTop: false,
          theme: "light",
          toastId: 1,
        });
      })
      .catch((error) => {
        console.log("Error changing password", error);
        toast.error("Error changing password", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          pauseOnHover: true,
          progress: undefined,
          newestOnTop: false,
          theme: "light",
          toastId: 2,
        });
      });
  };

  const generatedProps = {
    profileVisibility,
    setProfileVisibility,
    passwordVisibility,
    setPasswordVisibility,
    aboutUsVisibility,
    setAboutUsVisibility,
    singleImage,
    setSingleImage,
    changePasswordValues,
    validatePasswordSchema,
    onSubmitNewPassword,
    changeContactValues,
    onSubmitUpdateInfo,
    addressInfo,
    resetAddressInfo,
  };
  return <SettingsView {...generatedProps} />;
};

export default Settings;

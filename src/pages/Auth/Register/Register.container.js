import React, { useState } from "react";
import * as Yup from "yup";
import RegisterView from "./Register.view";
import { UserAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { fetchSignInMethodsForEmail } from "firebase/auth";
import { auth, storage } from "../../../config/firebaseConfig";
import { toast } from "react-toastify";
import useMediaQuery from "../../../utils/useMediaQuery";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { Place } from "../../../context/PlaceContext";
import { useEffect } from "react";

const Register = () => {
  const { createUser } = UserAuth();
  const navigate = useNavigate();
  const [singleImage, setSingleImage] = useState([]);
  const { placeValue, updatePlaceValue } = Place();

  useEffect(() => {
    updatePlaceValue("");
  }, []);

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
    firstName: "",
    lastName: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Your email is required"),
    password: Yup.string().required("Your password is required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Your password does not match"
    ),
    firstName: Yup.string().required("Your First Name is required"),
    lastName: Yup.string().required("Your Last Name is required"),
    contactNumber: Yup.string().required("Your contact is required"),
  });

  const checkEmailExists = async (email) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0;
    } catch (error) {
      console.error("Error checking email existence: ", error);
      return false;
    }
  };

  const onSubmit = async ({
    email,
    password,
    firstName,
    lastName,
    contactNumber,
  }) => {
    checkEmailExists(email)
      .then((exists) => {
        if (exists) {
          toast.error("Email already exists.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          if (singleImage.length !== 0) {
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
                  await getDownloadURL(fileRef).then(async (imageUrl) => {
                    await createUser(
                      email,
                      password,
                      firstName,
                      lastName,
                      contactNumber,
                      imageUrl,
                      placeValue.formatted_address
                        ? placeValue.formatted_address
                        : ""
                    );
                  });
                }
              );
            }

            setSingleImage([]);
          } else {
            createUser(
              email,
              password,
              firstName,
              lastName,
              contactNumber,
              "",
              placeValue.formatted_address ? placeValue.formatted_address : ""
            );
          }
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error checking email existence: ", error);
      });
  };

  const lg = useMediaQuery("(min-width: 1200px)");

  const generatedProps = {
    // generated props here
    initialValues,
    validationSchema,
    onSubmit,

    singleImage,
    setSingleImage,

    lg,
    navigate,
  };
  return <RegisterView {...generatedProps} />;
};

export default Register;

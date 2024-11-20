import React from "react";
import LoginView from "./Login.view";
import * as Yup from "yup";
import { UserAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  browserPopupRedirectResolver,
  signInWithPopup,
} from "firebase/auth";
import db, { auth } from "../../../config/firebaseConfig";
import { toast } from "react-toastify";
import useMediaQuery from "../../../utils/useMediaQuery";
import { collection, doc, setDoc } from "@firebase/firestore";
const Login = () => {
  const { signIn } = UserAuth();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Your email is required"),
    password: Yup.string().required("Your password is required"),
  });

  const onSubmit = async ({ email, password }) => {
    await signIn(email, password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode === "auth/user-not-found") {
          console.log("Error code:", errorCode);
          console.log("Error message:", errorMessage);
          toast.error("User not found", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            newestOnTop: false,
            theme: "light",
          });
        } else if (errorCode === "auth/wrong-password") {
          console.log("Error code:", errorCode);
          console.log("Error message:", errorMessage);
          toast.error("Invalid Password", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          // Other error handling
          console.log("Error code:", errorCode);
          console.log("Error message:", errorMessage);
          // Display a generic error message to the user or perform other actions
        }
      });
  };

  const loginWithGoogle = async () => {
    const provider = await new GoogleAuthProvider();

    return signInWithPopup(auth, provider, browserPopupRedirectResolver)
      .then(async (result) => {
        console.log(result);
        const user = result.user;
        const userCollectionRef = collection(db, "user");
        const userDocRef = doc(userCollectionRef, user.uid);
        // Create or update the user document
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName,
          id: user.uid,
          imageUrl: user.photoURL,
          contactNumber: user.phoneNumber,
        });
        navigate("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`${errorMessage}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const lg = useMediaQuery("(min-width: 1200px)");
  const xl = useMediaQuery("(min-width: 1400px)");

  const generatedProps = {
    // generated props here
    initialValues,
    validationSchema,
    loginWithGoogle,
    onSubmit,

    lg,
    xl,
  };
  return <LoginView {...generatedProps} />;
};

export default Login;

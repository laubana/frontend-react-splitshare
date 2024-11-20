import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import db from "../config/firebaseConfig";

import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const createUser = async (
    email,
    password,
    firstName,
    lastName,
    contactNumber,
    imageUrl,
    address
  ) => {
    await createUserWithEmailAndPassword(auth, email, password);
    console.log(auth.currentUser.uid);
    const documentRef = doc(db, "user", auth.currentUser.uid);
    await setDoc(documentRef, {
      email,
      id: auth.currentUser.uid,
      firstName,
      lastName,
      displayName: `${firstName} ${lastName}`,
      contactNumber,
      imageUrl,
      address,
      createdAt: serverTimestamp(),
    });
  };

  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ createUser, user, logout, signIn }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};

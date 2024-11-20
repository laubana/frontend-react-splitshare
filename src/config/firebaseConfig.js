// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  CACHE_SIZE_UNLIMITED,
  getFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

export default getFirestore(firebaseApp);

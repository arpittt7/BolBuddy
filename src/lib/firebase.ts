
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: "voicementor-bbmi9",
  appId: "1:45820456369:web:461fbfdeaeda551b942190",
  storageBucket: "voicementor-bbmi9.firebasestorage.app",
  apiKey: "AIzaSyCyeVruNIJ_xUMeYoEHoeeGio9OORi09aE",
  authDomain: "voicementor-bbmi9.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "45820456369"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

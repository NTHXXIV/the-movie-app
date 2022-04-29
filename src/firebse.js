import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCdEP6sRhBXcwlL5Z1Xs5CuXfq9A5yd-e4",
  authDomain: "the-movie-app-3d17b.firebaseapp.com",
  projectId: "the-movie-app-3d17b",
  storageBucket: "the-movie-app-3d17b.appspot.com",
  messagingSenderId: "71615308980",
  appId: "1:71615308980:web:1578844f42317c945ae3e1",
  measurementId: "G-MD4MYB2BGG",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(firebaseApp);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};
export default db;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdU8a_fQ3w1nbHL6U2xUex361U3TL0Ufw",
  authDomain: "signin-and-signup-cc7ad.firebaseapp.com",
  projectId: "signin-and-signup-cc7ad",
  storageBucket: "signin-and-signup-cc7ad.appspot.com",
  messagingSenderId: "583625011993",
  appId: "1:583625011993:web:3698ae443ba4a438444b88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

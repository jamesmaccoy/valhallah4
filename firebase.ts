// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYAwLANnYsWyJMrhyIpxpsbJ_oLq2T_zk",
  authDomain: "life-44466.firebaseapp.com",
  projectId: "life-44466",
  storageBucket: "life-44466.appspot.com",
  messagingSenderId: "136802991156",
  appId: "1:136802991156:web:f47687f7accf984960de61",
  measurementId: "G-0YDFVKB5SX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db = getFirestore(app);
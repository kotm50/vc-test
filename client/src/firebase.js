// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1tvqhijxKe4ohJNfH7NqABJXH4YIf9ZU",
  authDomain: "formmail-account.firebaseapp.com",
  projectId: "formmail-account",
  storageBucket: "formmail-account.appspot.com",
  messagingSenderId: "1084504876062",
  appId: "1:1084504876062:web:1fb8ea6c70f2096bbbba0f",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

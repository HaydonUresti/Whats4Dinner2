import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPJLYasnvUkt88BS9j1c0mjLGkw0QdUw8",
  authDomain: "whats4dinner2.firebaseapp.com",
  projectId: "whats4dinner2",
  storageBucket: "whats4dinner2.appspot.com",
  messagingSenderId: "712656157969",
  appId: "1:712656157969:web:499dd97f7da48bf7ff20b0"
};


// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth, firebase };
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCsb53-XCIU13sjrkwU9VKe2Ao8tCpTLI",
    authDomain: "blog-app-d3a60.firebaseapp.com",
    projectId: "blog-app-d3a60",
    storageBucket: "blog-app-d3a60.appspot.com",
    messagingSenderId: "937163326635",
    appId: "1:937163326635:web:fa2db8b2221effff63e3ee"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBr4T8B3kM8o8761RHTkcswa4kVSHEfDAk",
    authDomain: "udyog-vriksh-616cd.firebaseapp.com",
    projectId: "udyog-vriksh-616cd",
    storageBucket: "udyog-vriksh-616cd.firebasestorage.app",
    messagingSenderId: "124877145038",
    appId: "1:124877145038:web:728831bbe17273411d219f",
    measurementId: "G-DSHYKXY1TC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

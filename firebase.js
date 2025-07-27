// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: " [REDACTED]",
    authDomain: "serenaviafit-8ffa0.firebaseapp.com",
    projectId: "serenaviafit-8ffa0",
    storageBucket: "serenaviafit-8ffa0.appspot.com",
    messagingSenderId: "1004683072146",
    appId: "1:1004683072146:web:a97a553bb842b867b78c4b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export it
export const db = getFirestore(app);

// Para debugging
console.log('Firebase app initialized:', app);
console.log('Firestore db initialized:', db);
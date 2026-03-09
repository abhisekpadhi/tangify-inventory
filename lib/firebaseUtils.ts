import { initializeApp } from "firebase/app";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || "",
    authDomain: "tangify-83e82.firebaseapp.com",
    projectId: "tangify-83e82",
    storageBucket: "tangify-83e82.firebasestorage.app",
    messagingSenderId: "743671851457",
    appId: "1:743671851457:web:e5cb7a1974f3ee8e7de740",
//   measurementId: "G-8G0WEPSF5T"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export const FirebaseUtils = { firestore }


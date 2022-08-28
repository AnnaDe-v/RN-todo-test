import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDuP-uoKdKyYabUH2h5cNiLtcGG2C9ivbI",
    authDomain: "todo-rn-e9f2a.firebaseapp.com",
    projectId: "todo-rn-e9f2a",
    storageBucket: "todo-rn-e9f2a.appspot.com",
    messagingSenderId: "476475751552",
    appId: "1:476475751552:web:1dee8adb5ca51961e37a65"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDm3uIA9IsCqps7_ydSZV-_mYKN9n4mp-s",
    authDomain: "honor-orphan.firebaseapp.com",
    projectId: "honor-orphan",
    storageBucket: "honor-orphan.firebasestorage.app",
    messagingSenderId: "219449645303",
    appId: "1:219449645303:web:aee8c567f7943704d45bf2",
    measurementId: "G-32W2GQFJRP"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

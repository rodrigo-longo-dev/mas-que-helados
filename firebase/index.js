// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBokBJkGcd77L78wW3a8a3LU0hyN8d7xg0",
  authDomain: "masquehelados-next.firebaseapp.com",
  projectId: "masquehelados-next",
  storageBucket: "masquehelados-next.appspot.com",
  messagingSenderId: "908703957529",
  appId: "1:908703957529:web:4cf243bcf4d2662bdbe088"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
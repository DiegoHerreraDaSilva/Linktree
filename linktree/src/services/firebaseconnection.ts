import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwDaxt2FcVC4akCaoE-VTuIHQVfq7r_2k",
  authDomain: "reactlinks-2d7fa.firebaseapp.com",
  projectId: "reactlinks-2d7fa",
  storageBucket: "reactlinks-2d7fa.firebasestorage.app",
  messagingSenderId: "712654940389",
  appId: "1:712654940389:web:866d61282efbfecb90cc0c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db };
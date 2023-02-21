import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "testes-full-dev.firebaseapp.com",
  projectId: "testes-full-dev",
  storageBucket: "testes-full-dev.appspot.com",
  messagingSenderId: "823886784353",
  appId: "1:823886784353:web:647fa58110ed4c389f4720",
  measurementId: "G-H89052B4G5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)


export const db = getFirestore(app);

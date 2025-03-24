import { getAuth } from "@firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDqu7vQi2Vt--MOF9LJM1K1U5tdGWpBjjs",
  authDomain: "pademi-b6470.firebaseapp.com",
  projectId: "pademi-b6470",
  storageBucket: "pademi-b6470.firebasestorage.app",
  messagingSenderId: "870978795494",
  appId: "1:870978795494:web:e11cc924d3ea000790c827"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDqBbgW4t5jynNMA_QE5MdC-N6opT0_ouI",
  authDomain: "emil-merchant-portal.firebaseapp.com",
  projectId: "emil-merchant-portal",
  storageBucket: "emil-merchant-portal.appspot.com",
  messagingSenderId: "643698026554",
  appId: "1:643698026554:web:c869625bd1d74570102d03",
  measurementId: "G-J70JYLXZDK"
};

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)

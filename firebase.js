import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAKGRDJWbXxU6i9-KyKcdGvC69Uf8r_P1k",
  authDomain: "riderapp-5d33b.firebaseapp.com",
  projectId: "riderapp-5d33b",
  storageBucket: "riderapp-5d33b.appspot.com",
  messagingSenderId: "552774130368",
  appId: "1:552774130368:web:05c0cdbfe3c18b124aab25",
};

export const firebase1 = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(firebase1);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJvhfl3yGaA7fAlqzKb7k6WmeXKAiJDxI",
  authDomain: "beantree-0.firebaseapp.com",
  projectId: "beantree-0",
  storageBucket: "beantree-0.appspot.com",
  messagingSenderId: "480906443500",
  appId: "1:480906443500:web:5f9141788ed9585a18c3c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// // Get a list of cities from your database
// async function getCities(db) {
//     const citiesCol = collection(db, 'cities');
//     const citySnapshot = await getDocs(citiesCol);
//     const cityList = citySnapshot.docs.map(doc => doc.data());
//     return cityList;
// }
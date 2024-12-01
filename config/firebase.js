import { Platform } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEeaWcozjuWmkj9zuYIGGSTTkC69Pa408",
  authDomain: "realtimechat-38588.firebaseapp.com",
  databaseURL: "https://realtimechat-38588-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "realtimechat-38588",
  storageBucket: "realtimechat-38588.firebasestorage.app",
  messagingSenderId: "433334288159",
  appId: "1:433334288159:web:4cbaeff2c75ccb8215fa2a",
  measurementId: "G-Y5WZTHLFFM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
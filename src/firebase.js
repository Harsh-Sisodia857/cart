import firebase from "firebase";
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDyo2D2f8zxv5T59yuneu4GzpATmuNRLho",
    authDomain: "cart-628b3.firebaseapp.com",
    projectId: "cart-628b3",
    storageBucket: "cart-628b3.appspot.com",
    messagingSenderId: "1027435659008",
    appId: "1:1027435659008:web:8d3d0d6321c9ae0dcc3de5"
};

// Initialize Firebase
const db = firebase.initializeApp(firebaseConfig).firestore();
export default db;
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"
const firebaseConfig = {
  apiKey: "AIzaSyC5Q1GxLaNVWyyjI3dvgzxBsN4lAW0lbtU",
  authDomain: "paginacurso-c0580.firebaseapp.com",
  projectId: "paginacurso-c0580",
  storageBucket: "paginacurso-c0580.appspot.com",
  messagingSenderId: "112846831049",
  appId: "1:112846831049:web:faff0ec53f2eff0ab33c18",
  measurementId: "G-6V87MMXLSG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.db = firebase.firestore()
firebase.auth = firebase.auth()
export default firebase



import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/firestore"

const firebaseConfig = {

    apiKey: "AIzaSyDpdsLxCUURnAk-wXVO9WQUo-2zj6kFRFI",
    authDomain: "e-com-by-jatinder.firebaseapp.com",
    projectId: "e-com-by-jatinder",  
    storageBucket: "e-com-by-jatinder.appspot.com",
    messagingSenderId: "71987469201",
    appId: "1:71987469201:web:9d9339edf119dfaffe5830",
    measurementId: "G-ZPPD9FBCP6"
  
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {db, auth};
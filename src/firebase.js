import firebase from "firebase/app";
import "firebase/database";
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBcobh2Mjqprs2vRhY6YulMSFEJiKZ0JKU",
    authDomain: "recruit-management-61344.firebaseapp.com",
    databaseURL: "https://recruit-management-61344-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "recruit-management-61344",
    storageBucket: "recruit-management-61344.appspot.com",
    messagingSenderId: "906324128507",
    appId: "1:906324128507:web:236aa938efa1ba320bf65e"
  };

  const fireDb = firebase.initializeApp(firebaseConfig);
  

  export default fireDb.database().ref();
  export const app = fireDb;
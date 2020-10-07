import React from 'react'
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyCDMt9gebQcP3HEhHKMOiT_uNZFeJtLUlU",
    authDomain: "bullyingandciberbullying.firebaseapp.com",
    databaseURL: "https://bullyingandciberbullying.firebaseio.com",
    projectId: "bullyingandciberbullying",
    storageBucket: "bullyingandciberbullying.appspot.com",
    messagingSenderId: "974419212475",
    appId: "1:974419212475:web:caf94d654af5fc99f2519e",
    measurementId: "G-ZHHDDNDBZ6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;

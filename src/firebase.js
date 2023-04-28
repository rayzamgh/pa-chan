// src/firebase.js
// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDXN3pUvOih0Vv_5SaTTAxw0m3qfbb2KK8",
    authDomain: "portfolio-web-249407.firebaseapp.com",
    projectId: "portfolio-web-249407",
    storageBucket: "portfolio-web-249407.appspot.com",
    messagingSenderId: "490760545858",
    appId: "1:490760545858:web:79eab2489cf56618baefdb",
    measurementId: "G-8EQ4HDP85V"
  };

var app = firebase.initializeApp(firebaseConfig);
var analytics = null

export { firebase, analytics }
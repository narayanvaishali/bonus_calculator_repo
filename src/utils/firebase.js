import * as firebase from 'firebase'

// Initialize Firebase
 var config = {
   apiKey: "",
   authDomain: "",
   databaseURL: "",
   projectId: "",
   storageBucket: "",
   messagingSenderId: ""
 };
 firebase.initializeApp(config);

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
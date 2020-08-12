import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB2nj46DeqUcu7IeXDHxRi_35OLLHHtZGY",
  authDomain: "smtm-5618c.firebaseapp.com",
  databaseURL: "https://smtm-5618c.firebaseio.com",
  projectId: "smtm-5618c",
  storageBucket: "smtm-5618c.appspot.com",
  messagingSenderId: "40463161734",
  appId: "1:40463161734:web:18c2a9654b39047996b407"
};

firebase.initializeApp(firebaseConfig);

const DB = firebase.firestore();
const AUTH = firebase.auth();

export {DB, AUTH};

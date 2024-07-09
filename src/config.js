import firebase from "firebase/compat/app"
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from "firebase/auth";

// firebase.auth().setPersistence();

const firebaseConfig = {
  apiKey: "AIzaSyD37B7VoWS9CVOCjxNmEudNrovRYSE_9PQ",
  authDomain: "bbstore-test.firebaseapp.com",
  databaseURL: "https://bbstore-test-default-rtdb.firebaseio.com",
  projectId: "bbstore-test",
  storageBucket: "bbstore-test.appspot.com",
  messagingSenderId: "645613823542",
  appId: "1:645613823542:web:36be672f9989544a339a97",
  measurementId: "G-K14HBS30VN"
};
if(firebase.app.length === 0){
    firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase();


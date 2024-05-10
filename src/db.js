// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import { getDatabase, set, ref } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBcfk_naWLY_bi-dvFk1H-f4x1VuPeCH00",
    authDomain: "cs5525-firebase-database.firebaseapp.com",
    databaseURL: "https://cs5525-firebase-database-default-rtdb.firebaseio.com",
    projectId: "cs5525-firebase-database",
    storageBucket: "cs5525-firebase-database.appspot.com",
    messagingSenderId: "331121222272",
    appId: "1:331121222272:web:12e12ea642e5a2e630bc65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

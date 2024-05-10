// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js'
import { getDatabase, update, ref, get, child } from 'https://www.gstatic.com/firebasejs/10.9.0/firebase-database.js'

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
const dbref = ref(db);

// login button
const login_event = document.querySelector("#loginBtn");

login_event.addEventListener("click", function (event) {
    event.preventDefault();

    // Get input fields from login.html
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#pswrd").value;

    // validate input fields
    if (validate_mail(username) == false || validate_password(password) == false) {
        alert('Your email or password are invalid, please double-check it again!');
        return
        // stop running code
    }


    signInWithEmailAndPassword(auth, username, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            const currentdate = new Date();
            const datetime = (currentdate.getMonth() + 1) + "/"
                + currentdate.getDate() + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + "h : "
                + currentdate.getMinutes() + "' : "
                + currentdate.getSeconds() + "s.";
            // datetime format : MM/DD/YYYY @(at) Hour(s):Minute(s):Second(s)

            var login_info = {
                last_login: datetime,
            };

            // update database and then redirect to the main page
            // NOTE: The .then method has to right after the update command, so the data can update
            // to the database first, and then redirect the page. I did try bunch of different methods
            // but none of them work, therefore, this is the best solution.
            update(ref(db, 'user/' + user.uid), login_info);

            get(child(dbref, 'user/' + user.uid)).then((snapshot) => {
                if (snapshot.exists) {
                    sessionStorage.setItem("user-info", JSON.stringify({
                        // Store user's first name in session storage
                        first_name: snapshot.val().first_name,
                    }));

                    sessionStorage.setItem("user-creds", JSON.stringify(user));
                    // alert("Sign In Successfully... Hit 'OK' to redirect to the home page!");
                    // redirect page
                    window.location.href = "../index.html";
                }

            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });

});

// functions
function validate_mail(mail) {
    var expression = /^[^@]+@\w+(\.\w+)+\w$/;
    if (expression.test(mail) == true) {
        // valid email
        return true;
    } else {
        // invalid email
        return false;
    }
}

function validate_password(password) {
    // Firebase: must be more than 6 characters
    if (password < 6) {
        return false;
    } else {
        return true;
    }
}



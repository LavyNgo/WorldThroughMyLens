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


// register button
const register_event = document.querySelector("#registerBtn");

register_event.addEventListener("click", function (event) {
    event.preventDefault()

    // Get input fields
    const first_name = document.querySelector("#fname").value;
    const last_name = document.querySelector("#lname").value;
    const mail = document.querySelector("#mail").value;
    const password = document.querySelector("#pswrd").value;
    const confirmed_password = document.querySelector("#confirmedpswrd").value;


    // validate input fields
    if (validate_mail(mail) == false || validate_password(password) == false) {
        alert('Your email or password are invalid, please double-check it again!');
        return
        // stop running code
    }

    if (password_match(password, confirmed_password) != false) {
        alert('Your password and confirmed password are not matching, please double-check it again!');
        return
        // stop running code
    }


    createUserWithEmailAndPassword(auth, mail, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;

            var user_info = {
                first_name: first_name,
                last_name: last_name,
                mail_or_username: mail
            };
            // set database
            // NOTE: The .then method has to right after the update command, so the data can update
            // to the database first, and then redirect the page. I did try bunch of different methods
            // but none of them work, therefore, this is the best solution.
            set(ref(db, 'user/' + user.uid), user_info).then(() => {
                alert("Creating user account...");
                window.location.href = "../login.html";
            });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
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

function password_match(password, confirmed_password) {
    // check if user types correctly for pswrd and confirmed pswrd
    if (password != confirmed_password) {
        return true;
    } else {
        return false;
    }
}
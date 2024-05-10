// import cart from "cart.js";

// Sticky nav bar
let nav = document.querySelector("nav");
window.onscroll = function () {
    if (document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky");
    } else {
        nav.classList.remove("sticky");
    }
}


// Cart appears and disappears
let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".closeCart");
let body = document.querySelector("body");

iconCart.addEventListener('click', () => {
    body.classList.toggle("activeTabCart");
})

closeCart.addEventListener('click', () => {
    body.classList.toggle("activeTabCart");
})


// get data from sessionStorage we did save from login
let userCreds = JSON.parse(sessionStorage.getItem("user-creds"));
let userInfo = JSON.parse(sessionStorage.getItem("user-info"));

// Function to display the user's name from session storage
function displayUsername() {
    console.log(userInfo.first_name);

    // Get field from home.html
    const changeText = document.querySelector("#changeToUsername");
    const logout = document.querySelector("#logout");

    if (userInfo.first_name != null) {
        changeText.innerText = "Welcome, " + userInfo.first_name + "!";
        changeText.href = "#";
        logout.style.visibility = "visible";
    } else {
        logout.style.visibility = "hidden";
    }
}

// delete current user when signout
const signout = () => {
    sessionStorage.removeItem("user-creds");
    sessionStorage.removeItem("user-info");
    window.location.href = "../index.html";
}
const logout = document.querySelector("#logout");
logout.addEventListener('click', signout);

// Check credentials
const checkCred = () => {
    if (!sessionStorage.getItem("user-creds"))
        window.location.href = "../index.html";
}

// after signin
window.addEventListener("load", (checkCred) => {
    // console.log("page is fully loaded");
    displayUsername();
});




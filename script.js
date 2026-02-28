// Replace the URL below with your Google Apps Script Web App URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbzkDyHTJvSjhlABKb8549jjZh6Kj6QSb8fwQnjQV3Zg2PbWdn0DuzyzamIaT_LwCfRh/exec';
const form = document.getElementById('registrationForm');
const btn = document.getElementById('submitBtn');
const errorMsg = document.getElementById('errorMsg');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    const password = document.getElementById('password').value;

    // 1. Basic Validation
    if(password.length < 6) {
        errorMsg.style.display = 'block';
        return;
    } else {
        errorMsg.style.display = 'none';
    }

    // 2. Change button status to Loading
    btn.disabled = true;
    btn.innerText = "Processing...";

    // 3. Send data to Google Sheets
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => {
        alert("Registration Successful! Your data has been saved.");
        form.reset(); // Clear the form
        btn.disabled = false;
        btn.innerText = "Register Now";
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert("Something went wrong. Please check your internet connection.");
        btn.disabled = false;
        btn.innerText = "Register Now";
    });
});
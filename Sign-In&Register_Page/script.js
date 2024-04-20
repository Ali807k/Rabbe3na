const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const userName=document.getElementById('username');
const password=document.getElementById('password');
const email=document.getElementById('email');
const form=document.getElementById('sign-up-form');
const errorElement=document.getElementById('error');
const confirmPassword=document.getElementById('confirm-password');


registerBtn.addEventListener('click', () => { //For the animation of the form
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {//For the animation of the form
    container.classList.remove("active");
});

form.addEventListener('submit', (e) => {
    let messages = [];
    if (password.value.length <= 6) {
        messages.push('Password must be longer than 6 characters');
        password.style.border = "1px solid red";
    }
    else(password.style.border = "initial");

    if (password.value !== confirmPassword.value) {
        messages.push('Passwords do not match');
        confirmPassword.style.border = "1px solid red";
    }
    else(confirmPassword.style.border = "initial");

    if(messages.length > 0){
        e.preventDefault()
        errorElement.innerText = messages.join(', ');
    }
});
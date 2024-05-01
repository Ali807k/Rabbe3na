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

    else {
        e.preventDefault(); // Prevent form from submitting the default way
        const formData = {
            username: username.value,
            email: email.value,
            password: password.value
        };

        fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Redirect or handle success
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
});
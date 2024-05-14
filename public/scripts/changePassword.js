const originalPassword = document.getElementById('orig');

const confirmPassword = document.getElementById('confirm');

const form = document.getElementById('change-password-form');

form.addEventListener('submit', (e) => {

    if (originalPassword.value !== confirmPassword.value) {
        e.preventDefault();
        alert('Passwords do not match');
    }

}
)
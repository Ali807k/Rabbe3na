document.getElementById('forgot-password-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    const email = document.getElementById('email').value;
  
    fetch('http://localhost:3000/api/email/forgot_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email })
    })
    .then(response => response.text()) 
    .then(data => {
      console.log(data); // Process response data here
      alert('If your email is in our database, you will receive a reset link.');
    })
    .catch(error => console.error('Error:', error));
  });
  
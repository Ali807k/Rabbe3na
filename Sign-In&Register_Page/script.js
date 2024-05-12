const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const username = document.getElementById("username");
const password = document.getElementById("password");
const email = document.getElementById("email");
const form = document.getElementById("sign-up-form");
const errorElement = document.getElementById("error");
const confirmPassword = document.getElementById("confirm-password");

const loginEmail = document.getElementById("emailLogIn");
const loginPassword = document.getElementById("passwordLogIn");
const signinForm = document.getElementById("sign-in-form");

registerBtn.addEventListener("click", () => {
  //For the animation of the form
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  //For the animation of the form
  container.classList.remove("active");
});

form.addEventListener("submit", (e) => {
  let messages = [];
  if (password.value.length <= 6) {
    messages.push("Password must be longer than 6 characters");
    password.style.border = "1px solid red";
  } else password.style.border = "initial";

  if (password.value !== confirmPassword.value) {
    messages.push("Passwords do not match");
    confirmPassword.style.border = "1px solid red";
  } else confirmPassword.style.border = "initial";

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(", ");
  } else {
    e.preventDefault(); // Prevent form from submitting the default way
    const formData = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Redirect or handle success
        window.location.href = "/Sign-In&Register_Page/access.html";
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }
});

signinForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent form from submitting the default way
  const formData = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  console.log("Form Data:", formData); // Debugging

  fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginEmail.value,
      password: loginPassword.value,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login successful:", data);
      sessionStorage.setItem("authToken", data.authToken); // Storing the token for future use
      sessionStorage.setItem("username", data.username); // Storing the username if necessary for the client app
      // Redirect to a secure page
      window.location.href = "/Home_Page/index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Invalid Email or Password");
    });
});

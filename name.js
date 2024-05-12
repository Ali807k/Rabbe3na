document.addEventListener("DOMContentLoaded", function () {
  let username = sessionStorage.getItem("username");
  if (sessionStorage.getItem("authToken") && username) {
    document.getElementById("username_").textContent = username;
    document.getElementById("log").textContent = "Log out";
  }
});
const logoutBtn = document.getElementById("log");
logoutBtn.addEventListener("click", () => {
  if (logoutBtn.textContent === "Log out") {
    sessionStorage.clear();
    localStorage.clear();
    document.getElementById("log").textContent = "Login";
    document.getElementById("username_").textContent = "Guest";
    window.location.href = "/Home_Page/index.html";
  }
});

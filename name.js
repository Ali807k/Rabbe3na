document.addEventListener('DOMContentLoaded', function() {
    let username = localStorage.getItem('username');
    if (localStorage.getItem('authToken') && username){
        document.getElementById('username_').textContent = username;
        document.getElementById("log").textContent = "Log out";
        
    }
});
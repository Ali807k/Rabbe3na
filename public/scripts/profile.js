let user = {}


function loadUserInformation() {
	fetch("http://localhost:3000/api/users")
	.then(response => response.json())
	.then((data) => {
		data.forEach(iUser => {
			if (iUser.username === sessionStorage.getItem("username")) {
				user = iUser;
			}
		});
		fillUpInformation();
	})
	.catch(error => console.error(error))
} 

function fillUpInformation() {
	document.querySelector(".username").textContent += user.username;
	document.querySelector(".contact").textContent = user.email;
}

document.addEventListener("DOMContentLoaded", loadUserInformation)
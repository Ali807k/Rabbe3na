// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("createJalsahButton"); 

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

var publicButton = document.getElementsByClassName("access-button public")[0];
var privateButton = document.getElementsByClassName("access-button private")[0];

publicButton.onclick = function() {
  publicButton.style.backgroundColor = "#84C686";
  privateButton.style.backgroundColor = "#ddd";
}

privateButton.onclick = function() {
  privateButton.style.backgroundColor = "#84C686";
  publicButton.style.backgroundColor = "#ddd";
}


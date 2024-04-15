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

let gameAccess = 'public'; // default access

publicButton.onclick = function() {
  publicButton.classList.add("active");
  privateButton.classList.remove("active");
  gameAccess = 'public';
}

privateButton.onclick = function() {
  privateButton.classList.add("active");
  publicButton.classList.remove("active");
  gameAccess = 'private';
}

document.getElementById("createButton").addEventListener("click", function() {
  console.log("Create button clicked");
  const titleValue = document.getElementById("title") ? document.getElementById("title").value : "Default Title";
  const jalsahData = {
    name: titleValue,
    gameAccess: gameAccess,
    time: document.getElementById("time").value,
    description: document.getElementById("description").value
  };

  addJalsahToSessionList(jalsahData);
});

function addJalsahToSessionList(jalsahData) {
  const jalsahElement = document.createElement("div");
  jalsahElement.classList.add("jalsah");
  jalsahElement.innerHTML = `
    <div class="jalsah-header">
      <span class="jalsah-name">${jalsahData.name}</span>
      <span class="jalsah-des">${jalsahData.description}</span>
    </div>
    <div class="jalsah-info">
      <span class="jalsah-distance">1.3 KM</span>
      <span class="jalsah-time">${jalsahData.time}</span>
    </div>
    <button class="join-btn">Join</button>
  `;
  document.getElementById("jalsahList").appendChild(jalsahElement);
}

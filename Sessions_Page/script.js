// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("createJalsahButton"); 

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
updateJalsahListDisplay();

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
  updateJalsahListDisplay();
});

function addJalsahToSessionList(jalsahData) {
  const jalsahElement = document.createElement("div");
  jalsahElement.classList.add("jalsah");
  jalsahElement.innerHTML = `
  <div class="jalsah-container">
  <div class="user-container">
    <span class="user-icon"><svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.33333 6.66667C8.33333 4.89856 9.03571 3.20286 10.286 1.95262C11.5362 
      0.702379 13.2319 0 15 0C16.7681 0 18.4638 0.702379 19.714 1.95262C20.9643 3.20286 21.6667 4.89856 21.6667 6.66667C21.6667 8.43478 20.9643 10.1305 19.714 
      11.3807C18.4638 12.631 16.7681 13.3333 15 13.3333C13.2319 13.3333 11.5362 12.631 10.286 11.3807C9.03571 10.1305 8.33333 8.43478 8.33333 6.66667ZM8.33333
       16.6667C6.1232 16.6667 4.00358 17.5446 2.44078 19.1074C0.877974 20.6702 0 22.7899 0 25C0 26.3261 0.526784 27.5979 1.46447 28.5355C2.40215 29.4732 3.67392
        30 5 30H25C26.3261 30 27.5979 29.4732 28.5355 28.5355C29.4732 27.5979 30 26.3261 30 25C30 22.7899 29.122 20.6702 27.5592 19.1074C25.9964 17.5446 23.8768 16.6667 21.6667 16.6667H8.33333Z" fill="#1F1F1F"/>
      </svg>
      </span>
    <span class="username-jalsah">Guest</span>
  </div>
  <span class="jalsah-desc">
  ${jalsahData.description}
  </span>
  <div class="jalsah-info-container">
    <div class="jalsah-info-icons">
      <span class="location-icon">
        <svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.18751 0C4.54707 0.00193526 2.97438 0.654452 1.81442 1.81441C0.654459 2.97438 0.00194185 4.54707 6.58287e-06
         6.1875C-0.00195817 7.52806 0.435933 8.83225 1.24651 9.9C1.24651 9.9 1.41526 10.1222 1.44282 10.1543L6.18751 15.75L10.9344
          10.1514C10.9592 10.1216 11.1285 9.9 11.1285 9.9L11.1291 9.89831C11.9392 8.83103 12.3769 7.52745 12.375 6.1875C12.3731
           4.54707 11.7206 2.97438 10.5606 1.81441C9.40063 0.654452 7.82794 0.00193526 6.18751 0ZM6.18751 8.4375C5.7425 8.4375
            5.30748 8.30554 4.93747 8.05831C4.56746 7.81107 4.27907 7.45967 4.10878 7.04854C3.93848 6.6374 3.89392 6.185 3.98074
           5.74855C4.06756 5.31209 4.28185 4.91118 4.59652 4.59651C4.91118 4.28184 5.3121 4.06755 5.74855 3.98073C6.18501 3.89392
            6.63741 3.93847 7.04854 4.10877C7.45968 4.27907 7.81108 4.56746 8.05831 4.93747C8.30555 5.30748 8.43751 5.74249 8.43751
             6.1875C8.43676 6.78401 8.19947 7.35587 7.77767 7.77767C7.35588 8.19946 6.78402 8.43676 6.18751 8.4375Z" fill="#1F1F1F"/>
        </svg>
        </span>
      <span class="time-icon">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 0.5C12.1423 0.5 15.5 3.85775 15.5 8C15.5 12.1423 12.1423 15.5 8 15.5C3.85775 15.5 0.5 12.1423 0.5 8C0.5 3.85775
         3.85775 0.5 8 0.5ZM8 3.5C7.80109 3.5 7.61032 3.57902 7.46967 3.71967C7.32902 3.86032 7.25 4.05109 7.25 4.25V8C7.25004 8.1989
          7.32909 8.38963 7.46975 8.53025L9.71975 10.7802C9.8612 10.9169 10.0507 10.9925 10.2473 10.9908C10.4439 10.989 10.6321 10.9102
           10.7711 10.7711C10.9102 10.6321 10.989 10.4439 10.9908 10.2473C10.9925 10.0507 10.9169 9.8612 10.7802 9.71975L8.75
            7.6895V4.25C8.75 4.05109 8.67098 3.86032 8.53033 3.71967C8.38968 3.57902 8.19891 3.5 8 3.5Z" fill="#1F1F1F"/>
        </svg>
      </span>
    </div>
    <div class="jalsah-info">
      <span class="jalsah-location">1.3 KM</span>
      <span class="jalsah-time">${jalsahData.time}</span>
    </div>
  </div>
</div>
  `;
  document.getElementById("jalsahList").appendChild(jalsahElement);
}

function updateJalsahListDisplay() {
  var jalsahList = document.getElementById("jalsahList");

  if (jalsahList.children.length === 0) {
      jalsahList.innerHTML = "<h1>No sessions available</h1>";
  } else {
      var h1Element = jalsahList.querySelector("h1");
      if (h1Element) {
      h1Element.remove();
      }
  }
}

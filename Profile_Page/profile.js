let user = {
  UserName: "xxsaudxx",
  Name: "saud ali",
  Joined: 1 / 2 / 2023,
  PNumber: "0513334444",
  Location: "Dhahran",
  ProfileImage: new URL(
    "C:/Users/96650/OneDrive/Desktop/SWE_363/p_363 - Copy/p.jpg"
  ),
};

let change = document.querySelector("#edit_profile");
change.addEventListener("click", function () {
  console.log("ok");
});

// get the button that opens the modal
let btn = document.querySelector("#edit_profile");

// get the modal
let modal = document.getElementById("dialog");

// get the span element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document
  .getElementById("imageUpload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];

    // Check if a file was selected
    if (file) {
      // Create a URL for the selected file
      const imageURL = URL.createObjectURL(file);

      // Display the image
      const imagePreview = document.getElementById("imagePreview");
      imagePreview.src = imageURL;
      imagePreview.style.display = "block";
    }
  });

//   setters
function change_name(name) {
  let holder = document.querySelector("#name");
  holder.textContent = name;
}

function change_user(user) {
  let holder = document.querySelector("#user");
  holder.textContent = user;
}

function change_joined(joined) {
  let holder = document.querySelector("#joined");
  holder.textContent = joined;
}

function change_location(location) {
  let holder = document.querySelector("#location_details");
  holder.textContent = location;
}

function change_p_number(digits) {
  let holder = document.querySelector("#P_number");
  holder.textContent = digits;
}

function change_pic(src) {
  let holder = document.querySelector("#pic_profile");
  holder.src = src;
}

function last_jalsah(last_jalsah, user_name, comment, distance, time) {
  let user_holder = last_jalsah
    .querySelector("#user_creator")
    .querySelector("#displayed_user");
  user_holder.textContent = user_name;

  let comment_holder = last_jalsah.querySelector("#comment");
  comment_holder.textContent = comment;

  let distance_holder = last_jalsah
    .querySelector("#distance")
    .querySelector("#displayed_distance");
  distance_holder.textContent = distance;

  let time_holder = last_jalsah
    .querySelector("#time")
    .querySelector("#displayed_time");
  time_holder.textContent = time;
}

const jsonString =
  '{"UserName": "saudxx", "Name": "mohammed abdullah", "Joined": "11/12/2023", "PNumber": "0598765432", "Location": "Dammam", "ProfileImage": "/download.png"}';

try {
  const jsonObject = JSON.parse(jsonString);
  console.log(jsonObject);

  let user = {
    UserName: jsonObject.UserName,
    Name: jsonObject.Name,
    Joined: jsonObject.Joined,
    PNumber: jsonObject.PNumber,
    Location: jsonObject.Location,
    ProfileImage: jsonObject.ProfileImage,
  };
  change_name(user.Name);
  change_user(user.UserName);
  change_joined(user.Joined);
  change_p_number(user.PNumber);
  change_location(user.Location);
  change_pic(user.ProfileImage);

  cha;
  console.log(user);
} catch (error) {
  console.error("Invalid JSON string:", error);
}

// let test = document.querySelector(".j2");
// last_jalsah(test, "saudxx", " لا تشدهاااااا", "10 km", "11:25");
// change_name("saud ali"); change_location("ryadh"); change_p_number("0508936254")

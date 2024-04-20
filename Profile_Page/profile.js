// Get references to the button and form
const editProfileButton = document.getElementById("editProfileButton");
const editProfileForm = document.getElementById("editProfileForm");

// Add event listener to the button
editProfileButton.addEventListener("click", () => {
  // Toggle the visibility of the form
  if (editProfileForm.style.display === "none") {
    editProfileForm.style.display = "block";
  } else {
    editProfileForm.style.display = "none";
  }
});

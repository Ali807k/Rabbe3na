const images = [
    "images/baloot-game-side.jpg",
    "images/baloot-game-red-side.jpg",
    "images/baloot-overview.jpg",
    "images/baloot-game-top.jpeg",
];

let currentImage = 0;
function changeBackgroundImage() {
    const backgroundImageElement = document.querySelector('.background-image');
    backgroundImageElement.src = images[currentImage];
	currentImage = (currentImage + 1) % images.length;
}
  
// Change background image every 4 seconds
setInterval(changeBackgroundImage, 4000);
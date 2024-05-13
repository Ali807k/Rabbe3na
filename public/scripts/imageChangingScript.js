const images = [
    "../assets/baloot-game-side.jpg",
    "../assets/baloot-game-red-side.jpg",
    "../assets/baloot-overview.jpg",
    "../assets/baloot-game-top.jpeg",
];

let currentImage = 0;
function changeBackgroundImage() {
    const backgroundImageElement = document.querySelector('.background-image');
    backgroundImageElement.src = images[currentImage];
	currentImage = (currentImage + 1) % images.length;
}
  
// Change background image every 4 seconds
setInterval(changeBackgroundImage, 4000);
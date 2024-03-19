const images = [
    "url(images/1.jpg)",
    "url(images/b.jpg)",
    "url(images/bloot.jpg)",
    "url(images/d.jpg)",
    "url(images/800_1680db2d58.jpeg)",
    
    
  ];
  let currentImage = 0;
  
  function changeBackgroundImage() {
    const backgroundImageElement = document.getElementById('slideshow');
    backgroundImageElement.style.backgroundImage = images[currentImage];
    currentImage = (currentImage + 1) % images.length;
  }
  
  // Change background image every 4 seconds
  setInterval(changeBackgroundImage, 4000);
window.onload = ImageRandom;
imagesArray = ["/assets/images/MLOPLN.png", "/assets/images/Bruno.png", "/assets/images/MondoParado.png"];
function ImageRandom(){

     var num = Math.floor(Math.random() * 3);
     document.getElementById("RandomImage").src = imagesArray[num];
}
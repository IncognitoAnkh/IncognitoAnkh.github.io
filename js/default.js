window.onload = ImageRandom;
imagesArray = ["/src/img/MLOPLN.png", "/src/img/Bruno.png", "/src/img/MondoParado.png"];
function ImageRandom(){

     var num = Math.floor(Math.random() * 3);
     document.getElementById("RandomImage").src = imagesArray[num];
}
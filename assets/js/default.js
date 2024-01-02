window.onload = ImageRandom;
imagesArray = ["/assets/images/MLOPLN.png", "/assets/images/Bruno.png", "/assets/images/MondoParado.png", "/assets/images/MLOPLN2.png", "/assets/images/yobikomikun.gif"];
function ImageRandom(){

     var num = Math.floor(Math.random() * 5);
     document.getElementById("RandomImage").src = imagesArray[num];
}
/* const images = document.querySelectorAll(".gallery_item img");
let imgIndex
let imgSrc;
// get images src onclick
images.forEach((img, i) => {
    img.addEventListener("click", (e) => {
        imgSrc = e.target.src.replace("thumbnails", "full");
        //run modal function
        imgModal(imgSrc);
        //index of the next image
        imgIndex = i;
    });
});
//creating the modal----------------------------------------------------------------
let imgModal = (src) => {
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");

    //add modal to the parent element 
    document.querySelector(".main").append(modal);

    //adding image to modal
    const newImage = document.createElement("img");
    newImage.setAttribute("src", src);

    //creating the close button
    const closeBtn = document.createElement("i");
    closeBtn.setAttribute("class", "fas fa-times closeBtn Btns");

    //close function
    closeBtn.onclick = () => {
        modal.remove();
    };

//next and previous buttons---------------------------------------------------------
    const nextBtn = document.createElement("i");
    nextBtn.setAttribute("class", "fas fa-angle-right nextBtn Btns");

    // change the src of current image to the src of next image
    nextBtn.onclick = () => {
        newImage.setAttribute("src", nextImg())
    };
    const prevBtn = document.createElement("i");
    prevBtn.setAttribute("class", "fas fa-angle-left prevBtn Btns");

    // change the src of current image to the src of pevious image
    prevBtn.onclick = () => {
        newImage.setAttribute("src", prevImg())
    }
    modal.append(newImage, closeBtn, nextBtn, prevBtn);
};

//next image function
let nextImg = () => {
    imgIndex++;

    //check if it is the the last image
    if (imgIndex >= images.length) {
        imgIndex = 0
    }

    //return src of the new image
    return images[imgIndex].src.replace("thumbnails", "full");
};

//previous image function
let prevImg = () => {
    imgIndex--;
    console.log(imgIndex);

    //check if it is the first image
    if (imgIndex < 0) {
        imgIndex = images.length - 1
    }

    //return src of previous image
    return images[imgIndex].src.replace("thumbnails", "full");
} */
let imageElement = document.getElementById("moving-image");
let buttonElement = document.querySelector(".img-animation-btn");

function animateImage() {
    let a = parseInt(prompt("Введіть кількість пікселів для зміщення вліво:"));
    let b = parseInt(prompt("Введіть час зміщення в секундах:"));
    let currentLeft = parseInt(window.getComputedStyle(imageElement).left);
    if (!isNaN(a) && !isNaN(b)) {
        if (b > 0 && (currentLeft - a !== 0)) {
            imageElement.style.transition = "left " + b + "s ease-in-out";
            imageElement.style.left = (currentLeft - a) + "px";
        }
    }
}

buttonElement.addEventListener("click", function () {
    animateImage();
});
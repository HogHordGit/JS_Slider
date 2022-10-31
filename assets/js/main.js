const slides = document.querySelectorAll(".slide");
const pauseButton = document.querySelector("#pause");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");


let currentSlide = 0;
let isPlaying = true;
let timerID = null;

function nextSlide() {
    slides[currentSlide].classList.remove("active");

    currentSlide = (currentSlide + 1) % slides.length;

    slides[currentSlide].classList.add("active");
}

function pausePlayHandler() {
    if (isPlaying) {
        isPlaying = false;
        clearInterval(timerID);
        pauseButton.innerHTML = "Play";
    } else {
        isPlaying = true;
        timerID = setInterval(nextSlide, 1000);
        pauseButton.innerHTML = "Pause";
    }
}

pauseButton.addEventListener("click", pausePlayHandler);

timerID = setInterval(nextSlide, 1000);
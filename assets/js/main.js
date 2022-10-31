const slides = document.querySelectorAll(".slide");
const pauseBtn = document.querySelector("#btn-pause");
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");

let currentSlide = 0;
let isPlaying = true;
let timerID = null;

function goToNth(n) {
    slides[currentSlide].classList.remove("active");
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
}

function goToPrev() {
    goToNth(currentSlide - 1);
}

function goToNext() {
    goToNth(currentSlide + 1);
}

function pause() {
    isPlaying = false;
    clearInterval(timerID);
    pauseBtn.innerHTML = "Play";
}

function play() {
    isPlaying = true;
    timerID = setInterval(goToNext, 1000);
    pauseBtn.innerHTML = "Pause";
}

function pausePlayHandler() {
    isPlaying ? pause() : play();
}

function next() {
    goToNext();
    pause();
}

function prev() {
    goToPrev();
    pause();
}

pauseBtn.addEventListener("click", pausePlayHandler);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

timerID = setInterval(goToNext, 2000);
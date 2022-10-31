const slides = document.querySelectorAll(".slide");
const indicatorsContainer = document.querySelector("#indicators-container");
const indicators = document.querySelectorAll(".indicator");
const pauseBtn = document.querySelector("#btn-pause");
const prevBtn = document.querySelector("#btn-prev");
const nextBtn = document.querySelector("#btn-next");

let currentSlide = 0;
let isPlaying = true;
let timerID = null;

function goToNth(n) {
    slides[currentSlide].classList.toggle("active");
    indicators[currentSlide].classList.toggle("active");

    currentSlide = (n + slides.length) % slides.length;

    indicators[currentSlide].classList.toggle("active");
    slides[currentSlide].classList.toggle("active");
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

function indicate(e) {
    const target = e.target;

    if (target && target.classList.contains("indicator")) {
        console.dir(target.getAttribute("data-slide-to"));
        console.dir(target.dataset.slideTo);
    }
}

pauseBtn.addEventListener("click", pausePlayHandler);
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

timerID = setInterval(goToNext, 2000);

indicatorsContainer.addEventListener("click", indicate);
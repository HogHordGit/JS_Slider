(function () {
    const container = document.querySelector("#carousel");
    const slides = container.querySelectorAll(".slide");
    const indicatorsContainer = document.querySelector("#indicators-container");
    const indicators = indicatorsContainer.querySelectorAll(".indicator");
    const pauseBtn = container.querySelector("#btn-pause");
    const prevBtn = container.querySelector("#btn-prev");
    const nextBtn = container.querySelector("#btn-next");

    const SLIDES_COUNT = slides.length;
    const CODE_LEFT_ARROW = "ArrowLeft";
    const CODE_RIGHT_ARROW = "ArrowRight";
    const CODE_SPACE = "Space";
    const FA_PLAY = "<i class='fas fa-play-circle'></i>";
    const FA_PAUSE = "<i class='fas fa-pause-circle'></i>";

    let startPosX = null;
    let endPosX = null;
    let currentSlide = 0;
    let isPlaying = true;
    let timerID = null;
    let interval = 2000;

    function goToNth(n) {
        
        slides[currentSlide].classList.toggle("active");
        indicators[currentSlide].classList.toggle("active");

        currentSlide = (n + SLIDES_COUNT) % SLIDES_COUNT;

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
        pauseBtn.innerHTML = FA_PLAY;
    }

    function play() {
        isPlaying = true;
        timerID = setInterval(goToNext, interval);
        pauseBtn.innerHTML = FA_PAUSE;
    }

    function pausePlay() {
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
            goToNth(+target.dataset.slideTo);
            pause();
        }
    }

    function pressKey(e) {
        if (e.code === CODE_LEFT_ARROW) prev();
        if (e.code === CODE_RIGHT_ARROW) next();
        if (e.code === CODE_SPACE) pausePlay();
    }

    function swipeStart(e) {
        if (e instanceof MouseEvent) {
            startPosX = e.pageX;

            return;
        }
        if (e instanceof TouchEvent) {
            startPosX = e.changedTouches[0].pageX;
        }
    }

    function swipeEnd(e) {
        if (e instanceof MouseEvent) {
            endPosX = e.pageX;
        }else if (e instanceof TouchEvent) {
            endPosX = e.changedTouches[0].pageX;
        }

        if (startPosX - endPosX < -100) prev();
        if (startPosX - endPosX > 100) next();
    }

    function initListeners() {
        container.addEventListener("touchstart", swipeStart);
        container.addEventListener("touchend", swipeEnd);
        container.addEventListener("mousedown", swipeStart);
        container.addEventListener("mouseup", swipeEnd);

        pauseBtn.addEventListener("click", pausePlay);
        prevBtn.addEventListener("click", prev);
        nextBtn.addEventListener("click", next);
        indicatorsContainer.addEventListener("click", indicate);
        document.addEventListener("keydown", pressKey);
    }

    function inti() {
        initListeners();
        timerID = setInterval(goToNext, interval);
    }

    inti();

}());
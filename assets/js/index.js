function Carousel() {
    this.container = document.querySelector("#carousel");
    this.slidesContainer = this.container.querySelector(".slides");
    this.slides = this.container.querySelectorAll(".slide");
    this.indicatorsContainer = document.querySelector("#indicators-container");
    this.indicators = this.indicatorsContainer.querySelectorAll(".indicator");
    this.pauseBtn = this.container.querySelector("#btn-pause");
    this.prevBtn = this.container.querySelector("#btn-prev");
    this.nextBtn = this.container.querySelector("#btn-next");

    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = "ArrowLeft";
    this.CODE_RIGHT_ARROW = "ArrowRight";
    this.CODE_SPACE = "Space";
    this.FA_PLAY = "<i class='fas fa-play-circle'></i>";
    this.FA_PAUSE = "<i class='fas fa-pause-circle'></i>";

    this.startPosX = null;
    this.endPosX = null;
    this.currentSlide = 0;
    this.isPlaying = true;
    this.timerID = null;
    this.interval = 2000;
}

Carousel.prototype = {
    goToNth(n) {
        this.slides[this.currentSlide].classList.toggle("active");
        this.indicators[this.currentSlide].classList.toggle("active");

        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;

        this.indicators[this.currentSlide].classList.toggle("active");
        this.slides[this.currentSlide].classList.toggle("active");
    },
    goToPrev() {
        this.goToNth(this.currentSlide - 1);
    },
    goToNext() {
        this.goToNth(this.currentSlide + 1);
    },
    pause() {
        this.isPlaying = false;
        clearInterval(this.timerID);
        this.pauseBtn.innerHTML = this.FA_PLAY;
    },
    play() {
        this.isPlaying = true;
        this.timerID = setInterval(() => this.goToNext(), this.interval);
        this.pauseBtn.innerHTML = this.FA_PAUSE;
    },
    pausePlay() {
        this.isPlaying ? this.pause() : this.play();
    },
    next() {
        this.goToNext();
        this.pause();
    },
    prev() {
        this.goToPrev();
        this.pause();
    },
    indicate(e) {
        const target = e.target;

        if (target && target.classList.contains("indicator")) {
            this.goToNth(+target.dataset.slideTo);
            this.pause();
        }
    },
    pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    },
    swipeStart(e) {
        if (e instanceof MouseEvent) {
            this.startPosX = e.pageX;

            return;
        }
        if (e instanceof TouchEvent) {
            this.startPosX = e.changedTouches[0].pageX;
        }
    },
    swipeEnd(e) {
        if (e instanceof MouseEvent) {
            this.endPosX = e.pageX;
        }else if (e instanceof TouchEvent) {
            this.endPosX = e.changedTouches[0].pageX;
        }

        if (this.startPosX - this.endPosX < -100) this.prev();
        if (this.startPosX - this.endPosX > 100) this.next();
    },
    initListeners() {
        this.container.addEventListener("touchstart", this.swipeStart.bind(this));
        this.container.addEventListener("touchend", this.swipeEnd.bind(this));
        this.slidesContainer.addEventListener("mousedown", this.swipeStart.bind(this));
        this.slidesContainer.addEventListener("mouseup", this.swipeEnd.bind(this));

        this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
        this.prevBtn.addEventListener("click", this.prev.bind(this));
        this.nextBtn.addEventListener("click", this.next.bind(this));
        this.indicatorsContainer.addEventListener("click", this.indicate.bind(this));
        document.addEventListener("keydown", this.pressKey.bind(this));
    },
    init() {
        this.initListeners();
        this.timerID = setInterval(() => this.goToNext(), this.interval);
    }
};

Carousel.prototype.constructor = Carousel;

const slider = new Carousel();

slider.init();
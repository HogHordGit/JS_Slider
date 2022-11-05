function Carousel() {
    this.container = document.querySelector("#carousel");
    this.slidesContainer = this.container.querySelector(".slides");
    this.slides = this.container.querySelectorAll(".slide");
    this.indicatorsContainer = document.querySelector("#indicators-container");
    this.indicators = this.indicatorsContainer.querySelectorAll(".indicator");
    this.pauseBtn = this.container.querySelector("#btn-pause");
    this.prevBtn = this.container.querySelector("#btn-prev");
    this.nextBtn = this.container.querySelector("#btn-next");
}

Carousel.prototype = {
    _initProps() {
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
    },
    _goToNth(n) {
        this.slides[this.currentSlide].classList.toggle("active");
        this.indicators[this.currentSlide].classList.toggle("active");

        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;

        this.indicators[this.currentSlide].classList.toggle("active");
        this.slides[this.currentSlide].classList.toggle("active");
    },
    _goToPrev() {
        this._goToNth(this.currentSlide - 1);
    },
    _goToNext() {
        this._goToNth(this.currentSlide + 1);
    },
    _indicate(e) {
        const target = e.target;

        if (target && target.classList.contains("indicator")) {
            this._goToNth(+target.dataset.slideTo);
            this.pause();
        }
    },
    _pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    },
    _initListeners() {
        this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
        this.prevBtn.addEventListener("click", this.prev.bind(this));
        this.nextBtn.addEventListener("click", this.next.bind(this));
        this.indicatorsContainer.addEventListener("click", this._indicate.bind(this));
        document.addEventListener("keydown", this._pressKey.bind(this));
    },
    init() {
        this._initProps();
        this._initListeners();
        this.timerID = setInterval(() => this._goToNext(), this.interval);
    },
    pause() {
        this.isPlaying = false;
        clearInterval(this.timerID);
        this.pauseBtn.innerHTML = this.FA_PLAY;
    },
    play() {
        this.isPlaying = true;
        this.timerID = setInterval(() => this._goToNext(), this.interval);
        this.pauseBtn.innerHTML = this.FA_PAUSE;
    },
    pausePlay() {
        this.isPlaying ? this.pause() : this.play();
    },
    next() {
        this._goToNext();
        this.pause();
    },
    prev() {
        this._goToPrev();
        this.pause();
    },
};

Carousel.prototype.constructor = Carousel;
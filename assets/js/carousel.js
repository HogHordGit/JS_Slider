function Carousel(containerID = "#carousel",slidesID = ".slides", slideID = ".slide", interval = 2000) {
    this.container = document.querySelector(containerID);
    this.slidesContainer = this.container.querySelector(slidesID);
    this.slides = this.container.querySelectorAll(slideID);

    this.interval = interval;
}

Carousel.prototype = {
    _initIndicators() {
        const indicators = document.createElement("div");
        
        indicators.classList.add("indicators");
        indicators.setAttribute("id", "indicators-container");

        for(let i = 0; i < this.SLIDES_COUNT; i++) {
            const indicator = document.createElement("div");

            indicator.setAttribute("class", i !== 0 ? "indicator" : "indicator active");
            indicator.dataset.slideTo = `${i}`;

            indicators.append(indicator);
        }
        
        this.container.append(indicators);

        this.indicatorsContainer = document.querySelector("#indicators-container");
        this.indicators = this.indicatorsContainer.querySelectorAll(".indicator");
    },
    _initProps() {
        this.currentSlide = 0;
        this.isPlaying = true;

        this.SLIDES_COUNT = this.slides.length;
        this.CODE_LEFT_ARROW = "ArrowLeft";
        this.CODE_RIGHT_ARROW = "ArrowRight";
        this.CODE_SPACE = "Space";
        this.FA_PLAY = "<i class='fas fa-play-circle'></i>";
        this.FA_PAUSE = "<i class='fas fa-pause-circle'></i>";
        this.FA_NEXT = "<i class='fas fa-angle-right'></i>";
        this.FA_PREV = "<i class='fas fa-angle-left'></i>";
    },
    _initControls() {
        const controls = document.createElement("div");
        const PREV = `<div id="btn-prev" class="control control-prev">${this.FA_PREV}</i></div>`;
        const PAUSE = `<div id="btn-pause" class="control control-pause">${this.FA_PAUSE}</div>`;
        const NEXT = `<div id="btn-next" class="control control-next">${this.FA_NEXT}</div>`;

        controls.classList.add("controls");
        controls.setAttribute("id", "controls-container");

        controls.innerHTML = PREV + PAUSE + NEXT;

        this.container.append(controls);

        this.pauseBtn = this.container.querySelector("#btn-pause");
        this.prevBtn = this.container.querySelector("#btn-prev");
        this.nextBtn = this.container.querySelector("#btn-next");
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
    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        this.timerID = setInterval(() => this._goToNext(), this.interval);
    },
};

Carousel.prototype.constructor = Carousel;
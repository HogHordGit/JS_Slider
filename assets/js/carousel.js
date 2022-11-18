class Carousel {
    constructor(params) {
        const settings = {...{containerID: "#carousel", slideID: ".slide", slidesContainerID: ".slides", interval: 2000, isPlaying: true}, ...params};

        this.slidesContainer = document.querySelector(settings.slidesContainerID);
        this.container = document.querySelector(settings.containerID);
        this.slideItems = this.container.querySelectorAll(settings.slideID);
        this.interval = settings.interval;
        this.isPlaying = settings.isPlaying;
    }

    _initIndicators() {
        const indicators = document.createElement("div");
        
        indicators.setAttribute("class", "slides-body__indicators indicators");
        indicators.setAttribute("id", "indicators-container");

        for(let i = 0; i < this.SLIDES_COUNT; i++) {
            const indicator = document.createElement("div");

            indicator.setAttribute("class", i !== 0 ? "indicators__indicator" : "indicators__indicator active");
            indicator.dataset.slideTo = `${i}`;

            indicators.append(indicator);
        }
        
        this.slidesContainer.append(indicators);

        this.indicatorsContainer = document.querySelector("#indicators-container");
        this.indicators = this.indicatorsContainer.querySelectorAll(".indicators__indicator");
    }
    _initProps() {
        this.currentSlide = 0;

        this.SLIDES_COUNT = this.slideItems.length;
        this.CODE_LEFT_ARROW = "ArrowLeft";
        this.CODE_RIGHT_ARROW = "ArrowRight";
        this.CODE_SPACE = "Space";
        this.FA_PLAY = "<i class='fas fa-play-circle'></i>";
        this.FA_PAUSE = "<i class='fas fa-pause-circle'></i>";
        this.FA_NEXT = "<i class='fas fa-angle-right'></i>";
        this.FA_PREV = "<i class='fas fa-angle-left'></i>";
    }
    _initControls() {
        const CLASS_SWIPE = "constrols__swipe";

        const controls = document.createElement("div");

        const PREV = `<div id="btn-prev" class="constrols__swipe -left">${this.FA_PREV}</i></div>`;
        const PAUSE = `<div id="btn-pause" class="constrols__swipe -pause">
                       ${this.isPlaying ? this.FA_PAUSE : this.FA_PLAY}</div>`;
        const NEXT = `<div id="btn-next" class="constrols__swipe -right">${this.FA_NEXT}</div>`;

        controls.setAttribute("class", "slides-body__constrols constrols");
        controls.setAttribute("id", "controls-container");

        controls.innerHTML = PREV + PAUSE + NEXT;

        this.slidesContainer.append(controls);

        this.pauseBtn = this.container.querySelector("#btn-pause");
        this.prevBtn = this.container.querySelector("#btn-prev");
        this.nextBtn = this.container.querySelector("#btn-next");
    }
    _goToNth(n) {
        this.slideItems[this.currentSlide].classList.toggle("active");
        this.indicators[this.currentSlide].classList.toggle("active");

        this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;

        this.indicators[this.currentSlide].classList.toggle("active");
        this.slideItems[this.currentSlide].classList.toggle("active");
    }
    _goToPrev() {
        this._goToNth(this.currentSlide - 1);
    }
    _goToNext() {
        this._goToNth(this.currentSlide + 1);
    }
    _indicate(e) {
        const target = e.target;

        if (target && target.classList.contains("indicators__indicator")) {
            this._goToNth(+target.dataset.slideTo);
            this.pause();
        }
    }
    _pressKey(e) {
        if (e.code === this.CODE_LEFT_ARROW) this.prev();
        if (e.code === this.CODE_RIGHT_ARROW) this.next();
        if (e.code === this.CODE_SPACE) this.pausePlay();
    }
    _initListeners() {
        document.addEventListener("keydown", this._pressKey.bind(this));
        this.pauseBtn.addEventListener("click", this.pausePlay.bind(this));
        this.prevBtn.addEventListener("click", this.prev.bind(this));
        this.nextBtn.addEventListener("click", this.next.bind(this));
        this.indicatorsContainer.addEventListener("click", this._indicate.bind(this));
        
        // this.slidesContainer.addEventListener("mouseenter", this.pause.bind(this));
        // this.slidesContainer.addEventListener("mouseleave", this.play.bind(this));
        // this.slidesContainer.addEventListener("touchstart", this.pause.bind(this));
        // this.slidesContainer.addEventListener("touchend", this.play.bind(this));
    }
    _tick(flag = true) {
        if (!flag) return;
        
        this.timerID = setInterval(() => this._goToNext(), this.interval);
    }
    pause() {
        if (this.isPlaying) {
            this.isPlaying = false;
            clearInterval(this.timerID);
            this.pauseBtn.innerHTML = this.FA_PLAY;
        }
    }
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this._tick();
            this.pauseBtn.innerHTML = this.FA_PAUSE;
        }
    }
    pausePlay() {
        this.isPlaying ? this.pause() : this.play();
    }
    next() {
        this._goToNext();
        this.pause();
    }
    prev() {
        this._goToPrev();
        this.pause();
    }
    init() {
        this._initProps();
        this._initControls();
        this._initIndicators();
        this._initListeners();
        this._tick(this.isPlaying);
    }
}

export default Carousel;
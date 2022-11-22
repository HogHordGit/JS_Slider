import Carousel from "./carousel.js";

class SwipeCarousel extends Carousel {
    constructor(...args) {
        super(...args);
        this.flag = true;
    }
    
    _initListeners() {
        super._initListeners();

        this.container.addEventListener("touchstart", this._swipeStart.bind(this));
        this.container.addEventListener("touchend", this._swipeEnd.bind(this));
    }
    _swipeStart(e) {
        if (e instanceof TouchEvent) {
            this.startPosX = e.changedTouches[0].pageX;
        }
    }  
    _swipeEnd(e) {
        const ev = document.querySelector(".-pause");

        if (e instanceof TouchEvent) {
            this.endPosX = e.changedTouches[0].pageX;
        }
    
        if (this.startPosX - this.endPosX < -100) this.prev();
        if (this.startPosX - this.endPosX > 100) this.next();
    }
}

export default SwipeCarousel;
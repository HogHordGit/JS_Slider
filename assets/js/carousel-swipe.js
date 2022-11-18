import Carousel from "./carousel.js";

class SwipeCarousel extends Carousel {
    // constructor(...args) {
    //     super(...args);
    //     this.slidesContainer = this.slideItems[0].parentElement;
    // }

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
        if (e instanceof TouchEvent) {
            this.endPosX = e.changedTouches[0].pageX;
        }
    
        if (this.startPosX - this.endPosX < -100) this.prev();
        if (this.startPosX - this.endPosX > 100) this.next();

        if ((this.startPosX - this.endPosX > -30) && (this.startPosX - this.endPosX < 30)) {
            const ev = document.querySelectorAll(".constrols__swipe");

            ev.forEach((item) => {
                item.style.opacity = 1;
            });

            setTimeout(() => {
                ev.forEach((item) => {
                    item.style.opacity = 0;
                });
            }, 2000);
        }
    }
}

export default SwipeCarousel;
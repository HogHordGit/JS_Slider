import SwipeCarousel from "./carousel-swipe.js";

const slider = new SwipeCarousel({
    containerID: "#carousel",
    slideID: ".slides-body__slide", 
    slidesContainerID: ".slides-body",
    interval: 3000,
    isPlaying: false
});


slider.init();
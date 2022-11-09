import SwipeCarousel from "./carousel-swipe.js";

const slider = new SwipeCarousel({
    containerID: "#carousel",
    slideID: ".slide", 
    slidesContainerID: ".slides",
    interval: 2000,
    isPlaying: false
});


slider.init();
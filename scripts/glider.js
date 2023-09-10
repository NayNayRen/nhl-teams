// window.addEventListener("load", () => {
function loadGlider() {

    let gliders = document.querySelectorAll(".glider");
    gliders.forEach((glider, ele) => {
        new Glider(glider, {
            slidesToShow: 1,
            slidesToScroll: 1,
            scrollLock: true,
            draggable: true,
            rewind: true,
            dots: glider.parentNode.querySelector(".dots"),
            arrows: {
                prev: glider.parentNode.querySelector(".glider-prev"),
                next: glider.parentNode.querySelector(".glider-next"),
            },
            responsive: [
                {
                    // screens greater than > 400px
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        // itemWidth: 150,
                        duration: 1,
                    },
                },
                {
                    // screens greater than > 700px
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        // itemWidth: 150,
                        duration: 1,
                    },
                },
                {
                    // screens greater than > 1300px
                    breakpoint: 1300,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        // itemWidth: 150,
                        duration: 1,
                    },
                },
            ],
        });
    });
}
// });

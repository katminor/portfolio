let currentSlides = [0, 0, 0, 0, 0, 0];

function changeSlide(n, carousel) {
    showSlide(currentSlides[carousel - 1] + n, carousel);
}

function showSlide(n, carousel) {
    const slides = document.querySelectorAll(`#carousel${carousel} .carousel-item`);
    const dots = document.querySelectorAll(`#carousel${carousel} .carousel-dot`);

    if (n >= slides.length) {
        currentSlides[carousel - 1] = 0;
    } else if (n < 0) {
        currentSlides[carousel - 1] = slides.length - 1;
    } else {
        currentSlides[carousel - 1] = n;
    }

    slides.forEach((slide) => {
        slide.style.display = 'none';
    });

    dots.forEach((dot) => {
        dot.classList.remove('active');
    });

    const currentSlide = slides.item(currentSlides[carousel - 1]);
    if (currentSlide !== null) {
        currentSlide.style.display = 'block';
    }

    const currentDot = dots.item(currentSlides[carousel - 1]);
    if (currentDot !== null) {
        currentDot.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    for (let i = 1; i <= 6; i++) {
        const carousel = document.querySelector(`#carousel${i}`);
        if (!carousel) continue;

        const carouselDotsContainer = carousel.querySelector('.carousel-dots');
        const carouselSlides = carousel.querySelectorAll('.carousel-item');
        const prevBtn = document.querySelector(`#prev-btn${i}`);
        const nextBtn = document.querySelector(`#next-btn${i}`);

        carouselSlides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            dot.addEventListener('click', () => showSlide(index, i));
            carouselDotsContainer.appendChild(dot);
        });

        prevBtn.addEventListener('click', () => changeSlide(-1, i));
        nextBtn.addEventListener('click', () => changeSlide(1, i));

        showSlide(currentSlides[i - 1], i);

        function adjustArrowPositions(carousel) {
            const slide = carousel.children[0].children[1].children[1];
            const textAboveSlide = carousel.children[0].children[1].children[0];
            const prevBtnHeight = prevBtn.clientHeight;
            const nextBtnHeight = nextBtn.clientHeight;
            const carouselHeight = slide.clientHeight;
            const textHeight = textAboveSlide.clientHeight;
            const fullHeight = textHeight + carouselHeight;
            const halfHeight = fullHeight * .5;

            prevBtn.style.position = "relative";
            prevBtn.style.marginTop = `${textHeight + prevBtnHeight}px`;
            nextBtn.style.marginTop = `${textHeight + nextBtnHeight}px`;
            }
    
            adjustArrowPositions(carousel);

            window.addEventListener('resize', function() {
                adjustArrowPositions(carousel);
            });
    }
});

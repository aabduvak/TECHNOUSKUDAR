export default class Sliders {
    constructor(selector, time = 3000){
        this.slides = document.querySelectorAll(selector);
        this.slideIndex = 1;
        this.paused = false;
        this.time = time;
    }

    showSlides(i) {
        if (i > this.slides.length) {
            this.slideIndex = 1;
        }

        if (i < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach(item => {
            item.classList.add('animate__animated');
            item.style.display = 'none';
        });

        this.slides[this.slideIndex - 1].style.display = 'block';
    }

    plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    activeAnimation() {
        this.paused = setInterval(() => {
            this.plusSlides(1);
            this.slides[this.slideIndex - 1].classList.remove('animate__slideInRight');
            this.slides[this.slideIndex - 1].classList.add('animate__slideInLeft');
        }, this.time);
    }
        
    init() {
        this.showSlides(this.slideIndex);
        this.activeAnimation();

        this.slides[0].parentNode.addEventListener('mouseenter', () => {
            clearInterval(this.paused);
        });
        this.slides[0].parentNode.addEventListener('mouseleave', () => {
            this.activeAnimation();
        });
    }
}

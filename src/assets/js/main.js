import VideoPlayer from './modules/videoPlayer';
import Menu from './modules/menu';
import Forms from './modules/forms';
import Sliders from './modules/slider';
import Splide from '@splidejs/splide';

window.addEventListener("DOMContentLoaded", () => {
    try {
        new VideoPlayer('.play', '.overlay').init();
    }catch(e){}    

    if (document.querySelector('.promo')) {
        new Menu('.promo .hamburger', '.promo .menu', '.promo .menu__close', '.promo .menu__overlay').init();
        
    } else {
        new Menu('.other-header .hamburger', '.other-header .menu', '.other-header .menu__close', '.other-header .menu__overlay').init();
        new Forms().init();
        new Sliders('.techpost__item', 2000).init();
        new Splide( '.splide', {
            type   : 'loop',
            perPage: 2,
            perMove: 1,
            focus  : 'center',
            autoplay: true,
        } ).mount();
    }


});
import VideoPlayer from './modules/videoPlayer';
import Menu from './modules/menu';

window.addEventListener("DOMContentLoaded", () => {
    try {
        new VideoPlayer('.play', '.overlay').init();
    }catch(e){}

    if (document.querySelector('.promo')) {
        new Menu('.promo .hamburger', '.promo .menu', '.promo .menu__close', '.promo .menu__overlay').init();
    } else {
        new Menu('.other-header .hamburger', '.other-header .menu', '.other-header .menu__close', '.other-header .menu__overlay').init();
    }
});
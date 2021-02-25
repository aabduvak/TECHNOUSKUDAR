import VideoPlayer from './modules/videoPlayer';
import Menu from './modules/menu';

window.addEventListener("DOMContentLoaded", () => {

    new VideoPlayer('.play', '.overlay').init();
    new Menu('.promo .hamburger', '.promo .menu', '.menu__close', '.menu__overlay').init();

});
class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.scroll = this.calcScroll();
    }
    closeModal () {
        // selector.style.display = 'none';
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeModal(this.overlay);
            }
        });
        document.body.classList.remove('modal-open');
        document.body.style.marginRight = `0px`;
    }

    openModal() {
        // selector.style.display = 'block';
        document.body.classList.add('modal-open');
        document.body.style.marginRight = `${this.scroll}px`;
    }

    bindTriggerBtn() {
        this.btns.forEach((btn) => {

            btn.addEventListener('click', () => {
                this.activeBtn = btn;
                this.openModal();

                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = 'flex';
                    
                    if (this.path !== btn.getAttribute('data-url')) {
                        this.path = btn.getAttribute('data-url');
                        this.player.loadVideoById({
                            videoId: this.path
                        });
                    }   
                } else {
                    this.path = btn.getAttribute('data-url');

                    this.createPlayer(this.path);
                }
            });
        });
    }

    calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();

        return scrollWidth;
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
        });

        this.overlay.style.display = 'flex';
    }


    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.closeModal();
            this.overlay.style.display = 'none';
            this.player.stopVideo();
        });
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

            this.bindTriggerBtn();
            this.bindCloseBtn();
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {

    new VideoPlayer('.play', '.overlay').init();

    

});
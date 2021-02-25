export default class Menu {
    constructor(trigger, selector, close, overlay) {
        this.selector = document.querySelector(selector);
        this.trigger = document.querySelector(trigger);
        this.overlay = document.querySelector(overlay);
        this.close = document.querySelector(close);
        this.scroll = this.calcScroll();
    }

    addClasses() {
        this.selector.classList.add('animate__animated');
    }

    btnTriggerBind(selector, trigger) {
        trigger.addEventListener('click', () => {
            document.body.classList.add('modal-open');
            document.body.style.marginRight = `${this.scroll}px`;
            selector.style.visibility = 'unset';
            selector.style.opacity = '1';
            selector.style.left = '0';
            selector.classList.add('animate__fadeInLeft');
            
            try {
                selector.classList.remove('animate__fadeOutLeft');
            }catch(e){}
        });
    }

    closeMenu(selector) {
        document.body.classList.remove('modal-open');
        document.body.style.marginRight = `0px`;
        selector.style.visibility = 'hidden';
        selector.style.opacity = '0';
        selector.style.left = '-100%';
        selector.classList.add('animate__fadeOutLeft');
        try {
            selector.classList.remove('animate__fadeInLeft');
        }catch(e){}
    }

    btnCloseBind(selector, close, overlay) {
        close.addEventListener('click', (e) => {
            this.closeMenu(selector);
        });
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.closeMenu(selector);
            }
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

    init() {
        this.addClasses();
        this.btnCloseBind(this.selector, this.close, this.overlay);
        this.btnTriggerBind(this.selector, this.trigger);
    }
}
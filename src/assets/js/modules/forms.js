import {postData} from '../services/requests';

export default class Forms {
    constructor() {
        this.form = document.querySelectorAll('form'),
        this.inputs = document.querySelectorAll('input'),
        this.comments = document.querySelectorAll('[name="message"]'),
        this.message = {
            loading: 'Yükleniyor...',
            success: 'Teşekkürler! Biz sizinle iletişime geçeceğiz...',
            error: 'Bir hata oluştu...',
        }
    }
    
    formsending() {
        const path = 'assets/contact-form-handler.php';

        const clearInputs = () => {
            this.inputs.forEach(item => {
                item.value = '';
            });
            this.comments.forEach(item => {
                item.value = '';
            });
        };
    
        this.form.forEach(item => {
            item.addEventListener('submit', (e) => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.classList.add('status');
                item.parentNode.appendChild(statusMessage);

                item.classList.add('animate__animated', 'animate__fadeOutUp');

                setTimeout(() => {
                    item.style.display = 'none';
                }, 400);

                let textMessage = document.createElement('div');
                textMessage.textContent = this.message.loading;
                statusMessage.appendChild(textMessage);

                const formData = new FormData(item);

                let api = path;

                postData(api, formData)
                    .then(res => {
                        textMessage.textContent = this.message.success;
                    })
                    .catch(() => {
                        textMessage.textContent = this.message.error;
                    })
                    .finally(() => {
                        clearInputs();
                        setTimeout(() => {
                            statusMessage.remove();
                            item.style.display = 'block';
                            item.classList.remove('animate__fadeOutUp');
                            item.classList.add('animate__fadeInUp');
                        }, 5000);
                    });
            });
        });
    }
    
    init() {
        this.formsending();
    }
}
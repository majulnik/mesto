export class Popup {
    _selector = null;
    _element = null;

    constructor(selector){
        this._selector = selector;
        this._selectElement()
    }

    _selectElement() {
        this._element = document.querySelector(this._selector)        
    }

    setEventListener() {
        const buttonClose = this._element.querySelector('.popup__close');
        buttonClose.addEventListener('click', this.close.bind(this));

        this._element.addEventListener('click', this._handleBlurAreaClose.bind(this))        
    }

    open() {
        this._element.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose.bind(this));
    }

    close() {
        this._element.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
    }

    _handleEscClose(evt) {
        if (evt.key == 'Escape') {
            this.close();
        }
    }

    _handleBlurAreaClose(evt) {
        if (evt.target.classList.contains('popup')) {
            this.close();
          }
    }
}
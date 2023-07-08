export class FormValidator {

    _form = null;
    _inputList = null;
    _buttonElement = null;

    constructor (config, formSelector) {
        this.config = config;
        this.formSelector = formSelector;      
    }

    enableValidation() {
        this._form = document.querySelector(this.formSelector);
    
        this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            })
            this._inputList = Array.from(this._form.querySelectorAll(this.config.inputSelector));
            this._buttonElement = this._form.querySelector(this.config.submitButtonSelector);
            this._toggleButtonState();
    
            this._inputList.forEach((input) => {
                input.addEventListener('input', () => {
                    this._toggleInputState(input);
                    this._toggleButtonState();
                });
            })
    }

    disableSubmitButton() {
        this._form.reset();
        this._buttonElement.classList.add('popup__button_disabled');
        this._buttonElement.disabled = true;
    }

    _hasInvalidInput() {
        return this._inputList.some((input) => {
            return !this._isInputValid(input)
        })
    }
    
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this.config.inactiveButtonClass);
            this._buttonElement.disabled = true;
    
        } else {
            this._buttonElement.classList.remove(this.config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
    
    _showInputError(form, input) {
        const inputError = form.querySelector('#' + input.id + '-error');
        input.classList.add(this.config.inputErrorClass);
        inputError.innerText = input.validationMessage;
    }
    
    _hideInputError(form, input) {
        const inputError = form.querySelector('#' + input.id + '-error');
        input.classList.remove(this.config.inputErrorClass);
        inputError.innerText = '';
    }
    
    _isInputValid(input) {
        if (input.validity.valid) return true;
        return false;
    }
    
    _toggleInputState(input) {
        if (this._isInputValid(input)) {
            this._hideInputError(this._form, input);
        } else {
            this._showInputError(this._form, input);
        }
    }      
}
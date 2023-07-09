export class FormValidator {

    _form = null;
    _inputList = null;
    _buttonElement = null;

    constructor (config, formElement) {
        this._config = config;
        this._form = formElement;    
    }

    enableValidation() { 
        this._form.addEventListener('submit', (evt) => {
                evt.preventDefault();
                setTimeout(() => {
                    this._toggleButtonState();
                }, 0)
        })
        this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
        this._buttonElement = this._form.querySelector(this._config.submitButtonSelector);
        this._toggleButtonState();
    
        this._inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._toggleInputState(input);
                this._toggleButtonState();
            });
        })
    }

    _hasInvalidInput() {
        return this._inputList.some((input) => {
            return !this._isInputValid(input)
        })
    }
    
    _toggleButtonState() {
        if (this._hasInvalidInput(this._inputList)) {
            this._buttonElement.classList.add(this._config.inactiveButtonClass);
            this._buttonElement.disabled = true;
    
        } else {
            this._buttonElement.classList.remove(this._config.inactiveButtonClass);
            this._buttonElement.disabled = false;
        }
    }
    
    _showInputError(form, input) {
        const inputError = form.querySelector('#' + input.id + '-error');
        input.classList.add(this._config.inputErrorClass);
        inputError.innerText = input.validationMessage;
    }
    
    _hideInputError(form, input) {
        const inputError = form.querySelector('#' + input.id + '-error');
        input.classList.remove(this._config.inputErrorClass);
        inputError.innerText = '';
    }
    
    _isInputValid(input) {
        return input.validity.valid
    }
    
    _toggleInputState(input) {
        if (this._isInputValid(input)) {
            this._hideInputError(this._form, input);
        } else {
            this._showInputError(this._form, input);
        }
    }      
}
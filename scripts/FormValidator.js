export class FormValidator {
    constructor (config, formSelector) {
        this.config = config;
        this.formSelector = formSelector;      
    }

    enableValidation() {
        const form = document.querySelector(this.formSelector);
    
        form.addEventListener('submit', (evt) => {
                evt.preventDefault();
            })
            const inputList = Array.from(form.querySelectorAll(this.config.inputSelector));
            const buttonElement = form.querySelector(this.config.submitButtonSelector);
            this._toggleButtonState(inputList, buttonElement);
    
            inputList.forEach((input) => {
                input.addEventListener('input', () => {
                    this._toggleInputState(form, input);
                    this._toggleButtonState(inputList, buttonElement);
                });
            })
    }

    _hasInvalidInput(inputList) {
        return inputList.some((input) => {
            return !this._isInputValid(input)
        })
    }
    
    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this.config.inactiveButtonClass);
            buttonElement.disabled = true;
    
        } else {
            buttonElement.classList.remove(this.config.inactiveButtonClass);
            buttonElement.disabled = false;
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
    
    _toggleInputState(form, input) {
        if (this._isInputValid(input)) {
            this._hideInputError(form, input);
        } else {
            this._showInputError(form, input);
        }
    }      
}
function hasInvalidInput(inputList) {
    return inputList.some((input) => {
        return !isInputValid(input)
    })
}

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;

    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}

function showInputError(form, input, inputErrorClass) {
    const inputError = form.querySelector('#' + input.id + '-error');
    input.classList.add(inputErrorClass);
    inputError.innerText = input.validationMessage;
}

function hideInputError(form, input, inputErrorClass) {
    const inputError = form.querySelector('#' + input.id + '-error');
    input.classList.remove(inputErrorClass);
    inputError.innerText = '';
}

function isInputValid(input) {
    if (input.validity.valid) return true;
    return false;
}

function toggleInputState(form, input, inputErrorClass) {
    if (isInputValid(input)) {
        hideInputError(form, input, inputErrorClass);
    } else {
        showInputError(form, input, inputErrorClass);
    }
}

function enableValidation(params) {
    const formList = document.querySelectorAll(params.formSelector);

    formList.forEach((form) => {
        form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        })
        const inputList = Array.from(form.querySelectorAll(params.inputSelector));
        const buttonElement = form.querySelector(params.submitButtonSelector);
        toggleButtonState(inputList, buttonElement, params.inactiveButtonClass);

        inputList.forEach((input) => {
            input.oninput = () => {
                toggleInputState(form, input, params.inputErrorClass);
                toggleButtonState(inputList, buttonElement, params.inactiveButtonClass);
            }
        })
    })
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible',
})
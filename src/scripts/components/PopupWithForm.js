import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    _submitCallback = null;
    _form = null;
    _inputs = null;

    constructor(selector, submitCallback) {
        super(selector);
        this._submitCallback = submitCallback;
        this._form = this._element.querySelector('form');
        this._submitButton = this._element.querySelector('button[type=submit]')
        this._inputs = Array.from(this._form.querySelectorAll('input'));
    }

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', this._submitForm.bind(this));
    }

    _submitForm(evt) {
        evt.preventDefault();
        const fieldsData = this._getInputValues();
        this._submitCallback(fieldsData, this._submitButton);
    }

    _getInputValues() {
        const formData = {};
        this._inputs.forEach(function(input) {
            formData[input.name] = input.value;
        }); 
        return formData;
    }

    close() {
        super.close();
        this._form.reset()
    }
}
import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    _submitCallback = null;
    _form = null;

    constructor(selector, submitCallback) {
        super(selector);
        this._submitCallback = submitCallback;
        this._form = this._element.querySelector('form');
    }

    setEventListener() {
        super.setEventListener();
        this._form.addEventListener('submit', this._submitForm.bind(this));
    }

    _submitForm() {
        const fieldsData = this._getInputValues();
        this._submitCallback(fieldsData);
        this.close();
    }

    _getInputValues() {
        const inputs = Array.from(this._form.querySelectorAll('input'));
        const formData = {};
        inputs.forEach(function(input) {
            formData[input.name] = input.value;
        }); return formData;
    }

    close() {
        super.close();
        this._form.reset()
    }
}
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    _popupImageName = null;
    _popupImageSrc = null;

    constructor(selector){
        super(selector);
        this._popupImageName = this._element.querySelector('#popupImageName');
        this._popupImageSrc = this._element.querySelector('#popupImageSrc');
    }

    open (src, text, alt) {
        popupImageSrc.src = src;
        popupImageSrc.alt = alt;
        popupImageName.innerText = text;

        super.open();
    }
}
import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
    open (src, text, alt) {
        const popupImageName = this._element.querySelector('#popupImageName');
        const popupImageSrc = this._element.querySelector('#popupImageSrc');
        popupImageSrc.src = src;
        popupImageSrc.alt = alt;
        popupImageName.innerText = text;

        super.open();
    }
}
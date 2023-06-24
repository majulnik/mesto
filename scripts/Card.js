import { waitEscapeFunction, openModal, closeModal } from './utils.js'

const popupImageName = document.getElementById('popupImageName');
const popupImageSrc = document.getElementById('popupImageSrc');
const popupImage = document.querySelector('#image_popup');

export class Card {
    _template = null;
    _element = null;

    constructor(data, elementTemplate) {
        this.data = data;
        this.elementTemplate = elementTemplate;
    }

    getElement() {
        this._getTemplate()
        this._fillCardData()
        this._setEventListeners()
        return this._element;
    }

    _getTemplate() {
        this._template = document.querySelector(this.elementTemplate).content.querySelector('.elements__item');
    }

    _fillCardData() {
        const elementsTemplateImage = this._template.querySelector('img');
        const elementsTemplateDescription = this._template.querySelector('.elements__description');
        const elementsTemplateLike = this._template.querySelector('.elements__like');

        elementsTemplateImage.src = this.data.link;
        elementsTemplateImage.alt = this.data.alt;
        elementsTemplateDescription.textContent = this.data.name;
        if (this.data.like)
            elementsTemplateLike.classList.add("elements__like_active");

        this._element = this._template.cloneNode(true);
    }

    _setEventListeners() {
        const imageItem = this._element.querySelector('.elements__image');
        imageItem.addEventListener('click', () => {
            openModal(popupImage);
            popupImageSrc.src = this.data.link;
            popupImageSrc.alt = this.data.alt;
            popupImageName.innerText = this.data.name;
        });

        const likeItem = this._element.querySelector('.elements__like');
        likeItem.addEventListener('click', () => {
            likeItem.classList.toggle('elements__like_active');
        });

        const deleteItem = this._element.querySelector('.elements__delete');
        deleteItem.addEventListener('click', () => {
            this._element.remove();
        });

    }
}
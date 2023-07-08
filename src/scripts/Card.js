export class Card {
    _template = null;
    _element = null;
    _handleCardClick = null;

    constructor(data, elementTemplate, handleCardClick) {
        this.data = data;
        this.elementTemplate = elementTemplate;
        this._handleCardClick = handleCardClick;
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
        this._element = this._template.cloneNode(true);
        const elementsTemplateImage = this._element.querySelector('img');
        const elementsTemplateDescription = this._element.querySelector('.elements__description');
        const elementsTemplateLike = this._element.querySelector('.elements__like');

        elementsTemplateImage.src = this.data.link;
        elementsTemplateImage.alt = this.data.alt;
        elementsTemplateDescription.textContent = this.data.name;
        if (this.data.like) {
            elementsTemplateLike.classList.add("elements__like_active");
        }
    }

    _setEventListeners() {
        const imageItem = this._element.querySelector('.elements__image');
        imageItem.addEventListener('click', () => {
            this._handleCardClick();
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
export class Card {
    _template = null;
    _element = null;
    _handleCardClick = null;
    _cantDelete = null;
    _deletePopup = null;

    constructor(data, elementTemplate, cantDelete, deletePopup, handleCardClick) {
        this._data = data;
        this._elementTemplate = elementTemplate;
        this._handleCardClick = handleCardClick;
        this._cantDelete = cantDelete;
        this._deletePopup = deletePopup;
    }

    getElement() {
        this._getTemplate()
        this._fillCardData()
        this._setEventListeners()
        return this._element;
    }

    _getTemplate() {
        this._template = document.querySelector(this._elementTemplate).content.querySelector('.elements__item');
    }

    _fillCardData() {
        this._element = this._template.cloneNode(true);
        this._elementImage = this._element.querySelector('img');
        const elementsTemplateDescription = this._element.querySelector('.elements__description');
        const elementsTemplateLike = this._element.querySelector('.elements__like');
        const elementsTemplateLikeCount = this._element.querySelector('.elements__like-counter');
        elementsTemplateLikeCount.innerText = this._data.likes.length;

        this._elementImage.src = this._data.link;
        this._elementImage.alt = this._data.alt;
        elementsTemplateDescription.textContent = this._data.name;
        const deleteItem = this._element.querySelector('.elements__delete');
        if (!this._cantDelete) {
            deleteItem.remove();
        }
    }

    _likeCard(evt) {
        evt.target.classList.toggle('elements__like_active'); 
    }

    _deleteCard() {
        this._element.remove();
    }

    _setEventListeners() {   
        this._elementImage.addEventListener('click', () => {
            this._handleCardClick(this._data);
        });

        const likeItem = this._element.querySelector('.elements__like');
        likeItem.addEventListener('click', (evt) => {
            this._likeCard(evt);
        });

        const deleteItem = this._element.querySelector('.elements__delete');
        if (deleteItem) {
            deleteItem.addEventListener('click', () => {
//            this._deleteCard();
              this._deletePopup.open();
        });
       }
    }
}
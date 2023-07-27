export class Card {
    _template = null;
    _element = null;
    _handleCardClick = null;
    _userId = null;
    _deleteCallback = null;
    _addLikeCallback = null;
    _removeLikeCallback = null;

    constructor(data, elementTemplate, userId, deleteCallback, addLikeCallback, removeLikeCallback, handleCardClick) {
        this._data = data;
        this._elementTemplate = elementTemplate;
        this._handleCardClick = handleCardClick;
        this._userId = userId;
        this._deleteCallback = deleteCallback;
        this._addLikeCallback = addLikeCallback;
        this._removeLikeCallback = removeLikeCallback;
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
        this._elementsTemplateDescription = this._element.querySelector('.elements__description');
        this._elementsTemplateLike = this._element.querySelector('.elements__like');
        this._elementsTemplateLikeCount = this._element.querySelector('.elements__like-counter');
        this._elementsTemplateLikeCount.innerText = this._data.likes.length;

        this._elementImage.src = this._data.link;
        this._elementImage.alt = this._data.alt;
        this._elementsTemplateDescription.textContent = this._data.name;
        const deleteItem = this._element.querySelector('.elements__delete');
        if (this._userId != this._data.ownerId) {
            deleteItem.remove();
        }
        this._setIsLiked();
    }

    updateLikes(likes) {
        this._data.likes = likes;
        this._setIsLiked();
        this._elementsTemplateLikeCount.innerText = this._data.likes.length;
    }

    _likeCard() {
        if (this._elementsTemplateLike.classList.contains('elements__like_active')) {
            this._removeLikeCallback(this._data.id, this);
        } else {
            this._addLikeCallback(this._data.id, this);
        }
    }

    _setIsLiked() {
        if (this._data.likes.some(element => element._id = this._userId)) {
            this._elementsTemplateLike.classList.add('elements__like_active')
        } else {
            this._elementsTemplateLike.classList.remove('elements__like_active')
        }
    }

    deleteCard() {
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
              this._deleteCallback({ card: this, id: this._data.id});
        });
       }
    }
}
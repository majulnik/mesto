export class Card {
    _template = null;
    _element = null;

    constructor (data, elementTemplate) {
        this.data = data;
        this.elementTemplate = elementTemplate;
    }

    getElement() {
        this._getTemplate()
        this._fillCardData()
        this._addLikeListener()
        this._addPopupListener()
        this._addDeleteListener()

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
    
    _addPopupListener () {
        const waitEscapeFunction = function (evt) {
            if (evt.key == 'Escape') {
              const popup = document.querySelector('.popup_opened');
              closeModal(popup);
            }
          }
          
          function openModal(popup) {
            popup.classList.add('popup_opened');
            document.addEventListener('keydown', waitEscapeFunction);
          }
          
          function closeModal(popup) {
            popup.classList.remove('popup_opened');
            document.removeEventListener('keydown', waitEscapeFunction);
          }

          const popupImageName = document.querySelector('#popupImageName');
          const popupImageSrc = document.querySelector('#popupImageSrc');
          
          const popupImage = document.querySelector('#image_popup');

        const imageItem = this._element.querySelector('.elements__image');
        imageItem.addEventListener('click', () => {
          openModal(popupImage);
          popupImageSrc.src = this.data.link;
          popupImageSrc.alt = this.data.alt;
          popupImageName.innerText = this.data.name;
        });

    }

    _addLikeListener () {
        const likeItem = this._element.querySelector('.elements__like');
        likeItem.addEventListener('click', () => {
          likeItem.classList.toggle('elements__like_active');
        });

    }

    _addDeleteListener () {
        const deleteItem = this._element.querySelector('.elements__delete');
        deleteItem.addEventListener('click', () => {
            this._element.remove();
        });
    }


}


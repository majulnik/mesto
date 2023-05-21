const formElement = document.querySelector('.popup__container_type_profile');

const nameInput = formElement.querySelector('#profile-name');
const jobInput = formElement.querySelector('#profile-description');

const placeInput = document.querySelector('#new-place');
const linkInput = document.querySelector('#new-link');

const placeForm = document.querySelector('#placeForm');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const buttonPopupOpen = document.querySelector('.profile__button_type_edit');
const profileEditPopup = document.querySelector('#profile_popup');
const popupAddPLace= document.querySelector('#item_popup');

const buttonPopupClose = profileEditPopup.querySelector('.popup__close');

const buttonItemPopupClose = document.querySelector('#closeItemPopup');
const buttonItemPopupOpen = document.querySelector('#openItemPopup');

const closeImagePopup = document.querySelector('#closeImagePopup');
const popupImageName = document.querySelector('#popupImageName');
const popupImageSrc = document.querySelector('#popupImageSrc');

const popupImage = document.querySelector('#image_popup');

const elementsContainer = document.querySelector('#elements__container');

// Переменные для манипуляции с шаблоном карточки
const elementsTemplate = document.querySelector('#elements__template').content.querySelector('.elements__item');
const elementsTemplateImage = elementsTemplate.querySelector('img');
const elementsTemplateDescription = elementsTemplate.querySelector('.elements__description');
const elementsTemplateLike = elementsTemplate.querySelector('.elements__like');

// Добавление информации о пользователе на страницу через попап
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = jobInput.value;

  profileNameElement.textContent = nameValue;
  profileDescriptionElement.textContent = descriptionValue;

  closePopup();
}

// Добавление карточки - Добавление элемента в начало массива: метод unshift
function handleItemAdd(evt) {
  evt.preventDefault();
  closeItemPopup();

  const itemValue = placeInput.value;
  const linkValue = linkInput.value;

  const newItem =
  {
    name: itemValue,
    link: linkValue,
    alt: '',
    like: false,
  };
  displayAddCard(newItem);
}

function openModal (popup) {
  popup.classList.add('popup_opened');
}

function closeModal (popup) {
  popup.classList.remove('popup_opened');
}

function openPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openModal(profileEditPopup);
}

function closePopup() {
  closeModal(profileEditPopup);
}

function openItemPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  openModal(popupAddPLace);
}

function closeItemPopup() {
  closeModal(popupAddPLace);
}

closeImagePopup.addEventListener('click', () => {
  closeModal(popupImage);
});

buttonPopupOpen.addEventListener('click', openPopup);

buttonPopupClose.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);

// Форма добавления карточки - открытие нажатием на кнопку «+» и закрытие кликом на крестик
buttonItemPopupOpen.addEventListener('click', openItemPopup);

buttonItemPopupClose.addEventListener('click', closeItemPopup);

placeForm.addEventListener('submit', handleItemAdd);

//placeForm.onsubmit = handleItemAdd;

function getCardElement (cardContent) {
  elementsTemplateImage.src = cardContent.link;
  elementsTemplateImage.alt = cardContent.alt;
  elementsTemplateDescription.textContent = cardContent.name;
  if (cardContent.like)
    elementsTemplateLike.classList.add("elements__like_active");

  const card = elementsTemplate.cloneNode(true);
  addCardListener(card, cardContent);
  return card;
}

function addCardListener(card, cardContent) {
      // 4. Лайк карточки
      const likeItem = card.querySelector('.elements__like');
      likeItem.addEventListener('click', () => {
        likeItem.classList.toggle('elements__like_active');
      });
  
      // Удаление карточки
      const deleteItem = card.querySelector('.elements__delete');
      deleteItem.addEventListener('click', () => {
        card.remove();
      });
  
      // Открытие попапа с картинкой
      const imageItem = card.querySelector('.elements__image');
      imageItem.addEventListener('click', () => {
        openModal(popupImage);
        popupImageSrc.src = cardContent.link;
        popupImageSrc.alt = cardContent.alt;
        popupImageName.innerText = cardContent.name;
      });
}

function displayElements(cards) {

  for (let i = cards.length - 1; i >= 0; i--) { 
    displayAddCard(cards[i]);  
  }
};

function displayAddCard(cardData) {
  const cardElement = getCardElement(cardData);
  elementsContainer.prepend(cardElement);
}

displayElements(initialCards);
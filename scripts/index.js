import { Card } from './Card.js'
import { FormValidator } from './FormValidator.js'
import { initialCards } from './constants.js'
import { waitEscapeFunction, openModal, closeModal } from './utils.js'

const profileForm = document.querySelector('.popup__container_type_profile');

const nameInput = profileForm.querySelector('#profile-name');
const jobInput = profileForm.querySelector('#profile-description');

const placeInput = document.querySelector('#new-place');
const linkInput = document.querySelector('#new-link');

const placeForm = document.querySelector('#placeForm');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const buttonProfilePopupOpen = document.querySelector('.profile__button_type_edit');
const profileEditPopup = document.querySelector('#profile_popup');
const popupAddPLace = document.querySelector('#item_popup');

const buttonProfilePopupClose = profileEditPopup.querySelector('.popup__close');

const buttonItemPopupClose = document.querySelector('#closeItemPopup');
const buttonItemPopupOpen = document.querySelector('#openItemPopup');

const closeImagePopup = document.querySelector('#closeImagePopup');
const popupImageName = document.querySelector('#popupImageName');
const popupImageSrc = document.querySelector('#popupImageSrc');

const popupImage = document.querySelector('#image_popup');

const elementsContainer = document.querySelector('#elements__container');

const saveItem = document.querySelector('#saveItem');
const saveProfile = document.querySelector('#saveProfile');

const profileInputs = [nameInput, jobInput];

const popups = document.querySelectorAll('.popup');



  // Добавление информации о пользователе на страницу через попап
function submitEditProfileForm(evt) {
    evt.preventDefault();
  
    const nameValue = nameInput.value;
    const descriptionValue = jobInput.value;
  
    profileNameElement.textContent = nameValue;
    profileDescriptionElement.textContent = descriptionValue;
  
    closeProfilePopup();
  }
  

  
  // Добавление карточки - Добавление элемента в начало массива: метод unshift
  function handleItemAdd(evt) {
    evt.preventDefault();
    // if (!isFormValid([placeInput, linkInput], saveItem)) {
    //   return false;
    // }
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

  // const waitEscapeFunction = function (evt) {
  //   if (evt.key == 'Escape') {
  //     const popup = document.querySelector('.popup_opened');
  //     closeModal(popup);
  //   }
  // }
  
  // function openModal(popup) {
  //   popup.classList.add('popup_opened');
  //   document.addEventListener('keydown', waitEscapeFunction);
  // }
  
  // function closeModal(popup) {
  //   popup.classList.remove('popup_opened');
  //   document.removeEventListener('keydown', waitEscapeFunction);
  // }
  
  function openProfilePopup() {
    nameInput.value = profileNameElement.textContent;
    jobInput.value = profileDescriptionElement.textContent;
    openModal(profileEditPopup);
  }
  
  function closeProfilePopup() {
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
  
  buttonProfilePopupOpen.addEventListener('click', openProfilePopup);
  
  buttonProfilePopupClose.addEventListener('click', closeProfilePopup);
  
  profileForm.addEventListener('submit', submitEditProfileForm);
  
  // Форма добавления карточки - открытие нажатием на кнопку «+» и закрытие кликом на крестик
  buttonItemPopupOpen.addEventListener('click', openItemPopup);
  
  buttonItemPopupClose.addEventListener('click', closeItemPopup);
  
  placeForm.addEventListener('submit', handleItemAdd);


popups.forEach(popup => popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closeModal(popup);
    }
  }))

  function displayElements(cards) {

    for (let i = cards.length - 1; i >= 0; i--) {
        displayAddCard(cards[i])
    }
  };

  function displayAddCard(cardContent) {
    const card = new Card(cardContent, '#elements__template')            
    const element = card.getElement();
    elementsContainer.prepend(element);
  }

  displayElements(initialCards);

  const profileFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible',
}, '#form')

profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator({
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__error_visible',
}, '#placeForm')

placeFormValidator.enableValidation();
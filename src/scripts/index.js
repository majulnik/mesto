import { Card } from './Card.js'
import { Section } from './Section.js'
import { UserInfo } from './UserInfo.js'
import { PopupWithForm } from './PopupWithForm.js'
import { PopupWithImage } from './PopupWithImage.js'
import { FormValidator } from './FormValidator.js'
import { initialCards, validationConfig } from './constants.js'
import '../pages/index.css';

const profileForm = document.querySelector('.popup__container_type_profile');
const nameInput = profileForm.querySelector('#profile-name');
const jobInput = profileForm.querySelector('#profile-description');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const buttonProfilePopupOpen = document.querySelector('.profile__button_type_edit');
const buttonItemPopupOpen = document.querySelector('#openItemPopup');

  function openProfilePopup() {
    nameInput.value = userInfo.getUserInfo().name;
    jobInput.value = userInfo.getUserInfo().description;
    profileFormPopup.open();
  }
  
  function openItemPopup() {
    itemFormPopup.open();
  }
  
  buttonProfilePopupOpen.addEventListener('click', openProfilePopup);
  
  // Форма добавления карточки - открытие нажатием на кнопку «+» и закрытие кликом на крестик
  buttonItemPopupOpen.addEventListener('click', openItemPopup);
  
const profileFormValidator = new FormValidator(validationConfig, '#form')

profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationConfig, '#placeForm')

placeFormValidator.enableValidation();

const cardSection = new Section({
  items: initialCards,
  renderer(item) {
    const card = new Card(item, '#elements__template', function() {
      imagePopup.open(item.link, item.name, item.alt)
    })            
    const element = card.getElement();

    return element;
  }
  
},'#elements__container');
  cardSection.render();
  const userInfo = new UserInfo({
    name: ".profile__name",
    description: '.profile__description'
  });

const imagePopup = new PopupWithImage('#image_popup');
const profileFormPopup = new PopupWithForm('#profile_popup', function(data) {
  profileNameElement.textContent = data['profile-name'];
  profileDescriptionElement.textContent = data['profile-description'];
});

const itemFormPopup = new PopupWithForm('#item_popup', function(data) {
  const newItem =
  {
    name: data['new-place'],
    link: data['new-link'],
    alt: '',
    like: false,
  };
  cardSection.addItem(newItem);
});

imagePopup.setEventListener();
profileFormPopup.setEventListener();
itemFormPopup.setEventListener();
import { Card } from '../scripts/components/Card.js'
import { Section } from '../scripts/components/Section.js'
import { UserInfo } from '../scripts/components/UserInfo.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { FormValidator } from '../scripts/components/FormValidator.js'
import { initialCards, validationConfig } from '../scripts/utils/constants.js'
import './index.css';

const profileForm = document.querySelector('.popup__container_type_profile');
const nameInput = profileForm.querySelector('#profile-name');
const jobInput = profileForm.querySelector('#profile-description');
const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');
const buttonProfilePopupOpen = document.querySelector('.profile__button_type_edit');
const buttonItemPopupOpen = document.querySelector('#openItemPopup');
const avatar = document.querySelector('.profile__avatar');
let userId;

  function openProfilePopup() {
    const profileData = userInfo.getUserInfo();
    nameInput.value = profileData.name;
    jobInput.value = profileData.description;
    profileFormPopup.open();
  }
  
  function openItemPopup() {
    itemFormPopup.open();
    placeFormValidator.toggleButtonState();
  }
  
  buttonProfilePopupOpen.addEventListener('click', openProfilePopup);
  
  // Форма добавления карточки - открытие нажатием на кнопку «+» и закрытие кликом на крестик
  buttonItemPopupOpen.addEventListener('click', openItemPopup);
  
const profileFormValidator = new FormValidator(validationConfig, document.querySelector('#form'))

profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationConfig, document.querySelector('#placeForm'))

placeFormValidator.enableValidation();

const cardSection = new Section({
  items: [],
  renderer(item) {
    const cantDelete = item.ownerId == userId;
    const card = new Card(item, '#elements__template', cantDelete, deleteCardPopup, function(data) {
      imagePopup.open(data.link, data.name, data.alt)
    })            
    const element = card.getElement();

    return element;
  }
  
},'#elements__container');
  cardSection.render();

  fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
  headers: {
    authorization: '377fe50e-25a8-44d8-a25d-c437a9f3d8a8'
  }
})
  .then(res => res.json())
  .then((result) => {
    result.reverse().forEach(card => {
      const newItem =
      {
        name: card.name,
        link: card.link,
        alt: card.name,
        likes: card.likes,
        ownerId: card.owner._id,
      };
      cardSection.renderItem(newItem);
    });
  }); 

  const userInfo = new UserInfo({
    name: ".profile__name",
    description: '.profile__description'
  });

const imagePopup = new PopupWithImage('#image_popup');
const profileFormPopup = new PopupWithForm('#profile_popup', function(data) {
  userInfo.setUserInfo ({name: data['profile-name'], description: data['profile-description']});

  fetch('https://mesto.nomoreparties.co/v1/cohort-71/users/me', {
  method: 'PATCH',
  headers: {
    authorization: '377fe50e-25a8-44d8-a25d-c437a9f3d8a8',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: data['profile-name'],
    about: data['profile-description']
  })
}); 

});

const deleteCardPopup = new PopupWithForm('#item_delete-popup', function(data) {

});

// deleteCardPopup.open();

const itemFormPopup = new PopupWithForm('#item_popup', function(data) {
  fetch('https://mesto.nomoreparties.co/v1/cohort-71/cards', {
  method: 'POST',
  headers: {
    authorization: '377fe50e-25a8-44d8-a25d-c437a9f3d8a8',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: data['new-place'],
    link: data['new-link'],
  })
}); 
  const newItem =
  {
    name: data['new-place'],
    link: data['new-link'],
    alt: data['new-place'],
    likes: [],
    ownerId: userId,
  };
  cardSection.renderItem(newItem);
});

imagePopup.setEventListener();
profileFormPopup.setEventListener();
itemFormPopup.setEventListener();

fetch('https://mesto.nomoreparties.co/v1/cohort-71/users/me', {
  headers: {
    authorization: '377fe50e-25a8-44d8-a25d-c437a9f3d8a8'
  }
})
  .then(res => res.json())
  .then((result) => {
    avatar.src = result.avatar;
    userInfo.setUserInfo ({name: result.name, description: result.about});
    userId = result._id;
  }); 
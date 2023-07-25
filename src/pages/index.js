import { Card } from '../scripts/components/Card.js'
import { Section } from '../scripts/components/Section.js'
import { UserInfo } from '../scripts/components/UserInfo.js'
import { PopupWithForm } from '../scripts/components/PopupWithForm.js'
import { PopupWithImage } from '../scripts/components/PopupWithImage.js'
import { FormValidator } from '../scripts/components/FormValidator.js'
import { initialCards, validationConfig } from '../scripts/utils/constants.js'
import { API } from '../scripts/utils/api.js'
import './index.css';

const profileForm = document.querySelector('.popup__container_type_profile');
const nameInput = profileForm.querySelector('#profile-name');
const jobInput = profileForm.querySelector('#profile-description');
const buttonProfilePopupOpen = document.querySelector('.profile__button_type_edit');
const buttonItemPopupOpen = document.querySelector('#openItemPopup');
const avatar = document.querySelector('.profile__avatar');
const buttonEditAvatar = document.querySelector('.profile__avatar-edit');
let userId;

const api = new API({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-71',
  headers: {
    authorization: '377fe50e-25a8-44d8-a25d-c437a9f3d8a8',
    'Content-Type': 'application/json'
  }
})

function openProfilePopup() {
  const profileData = userInfo.getUserInfo();
  nameInput.value = profileData.name;
  jobInput.value = profileData.description;
  profileFormPopup.open();
}

function openAvatarPopup() {
  avatarEditFormPopup.open();
  avatarEditFormValidator.toggleButtonState();
}

function openItemPopup() {
  itemFormPopup.open();
  placeFormValidator.toggleButtonState();
}

buttonProfilePopupOpen.addEventListener('click', openProfilePopup);
buttonEditAvatar.addEventListener('click', openAvatarPopup);

// Форма добавления карточки - открытие нажатием на кнопку «+» и закрытие кликом на крестик
buttonItemPopupOpen.addEventListener('click', openItemPopup);

const profileFormValidator = new FormValidator(validationConfig, document.querySelector('#form'))

profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(validationConfig, document.querySelector('#placeForm'))

placeFormValidator.enableValidation();

const avatarEditFormValidator = new FormValidator(validationConfig, document.querySelector('#avatarEditForm'))
avatarEditFormValidator.enableValidation();

function renderServerCard(card) {
  const newItem =
  {
    name: card.name,
    link: card.link,
    alt: card.name,
    likes: card.likes,
    ownerId: card.owner._id,
    id: card._id,
  };
  cardSection.renderItem(newItem);
}

function renderServerUser(user) {
  avatar.src = user.avatar;
  userInfo.setUserInfo({ name: user.name, description: user.about });
  userId = user._id;
}

let currentDeleteData = null;

function deleteCard(data) {
  currentDeleteData = data;
  deleteCardPopup.open();
};

function addLike(cardId) {
  return api.addLike(cardId);
};

function removeLike(cardId) {
  return api.deleteLike(cardId);
};

function markButtonSaved(button) {
  button.innerText = 'Сохранено';
  button.style.opacity = 1;
}

function markButtonSaving(button) {
  button.innerText = 'Сохранение...';
  button.style.opacity = 0.5;
}

const cardSection = new Section({
  items: [],
  renderer(item) {
    const card = new Card(item, '#elements__template', userId, deleteCard, addLike, removeLike, function (data) {
      imagePopup.open(data.link, data.name, data.alt)
    })
    const element = card.getElement();

    return element;
  }

}, '#elements__container');
cardSection.render();

const userInfo = new UserInfo({
  name: ".profile__name",
  description: '.profile__description'
});

const imagePopup = new PopupWithImage('#image_popup');
const profileFormPopup = new PopupWithForm('#profile_popup', function (data, button) {
  markButtonSaving(button);
  api.editUser({
    name: data['profile-name'],
    about: data['profile-description']
  }).then(user => {
    renderServerUser(user)
  }).catch(err => console.log(err))
    .finally(() => {
      markButtonSaved(button)
      profileFormPopup.close()
    })
});

const deleteCardPopup = new PopupWithForm('#item_delete-popup', function (data, button) {
  markButtonSaving(button);
  api.deleteCard(currentDeleteData.id).then(result => {
    currentDeleteData.card.deleteCard()
  }).catch(err => console.log(err))
  .finally(() => {
    markButtonSaved(button)
    deleteCardPopup.close()
  })
});

const avatarEditFormPopup = new PopupWithForm('#image_edit-popup', function (data, button) {
  markButtonSaving(button);
  api.editAvatar({
    avatar: data['new-link'],
  }).then(user => {
    renderServerUser(user)
  }).catch(err => console.log(err))
  .finally(() => {
    markButtonSaved(button)
    avatarEditFormPopup.close()
  })
});

const itemFormPopup = new PopupWithForm('#item_popup', function (data, button) {
  markButtonSaving(button);
  api.addCard({
    name: data['new-place'],
    link: data['new-link'],
  }).then(card => renderServerCard(card))
  .catch(err => console.log(err))
  .finally(() => {
    markButtonSaved(button)
    itemFormPopup.close()
  })
});

imagePopup.setEventListener();
profileFormPopup.setEventListener();
itemFormPopup.setEventListener();
deleteCardPopup.setEventListener();
avatarEditFormPopup.setEventListener();

const initialData = [api.getCards(), api.getUserInfo()];
Promise.all(initialData).then(([cards, user]) => {
  renderServerUser(user);
  cards.reverse().forEach(card => {
    renderServerCard(card);
  });
})
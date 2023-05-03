let formElement = document.querySelector('.popup__container_type_profile');

let nameInput = formElement.querySelector('#profile-name');
let jobInput = formElement.querySelector('#profile-description');

function handleFormSubmit(evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let descriptionValue = jobInput.value;

  let profileNameElement = document.querySelector('.profile__name');
  let profileDescriptionElement = document.querySelector('.profile__description');

  profileNameElement.textContent = nameValue;
  profileDescriptionElement.textContent = descriptionValue;

  closePopup();
}

let ButtonPopupOpen = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');

function openPopup() {
  let profileNameValue = document.querySelector('.profile__name').textContent;
  let profileDescriptionValue = document.querySelector('.profile__description').textContent;

  nameInput.value = profileNameValue;
  jobInput.value = profileDescriptionValue;

  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

ButtonPopupOpen.addEventListener('click', openPopup);

let buttonPopupClose = popup.querySelector('.popup__close');

buttonPopupClose.addEventListener('click', closePopup);

let popupSaveButton = formElement.querySelector('.popup__save');
popupSaveButton.addEventListener('click', handleFormSubmit);
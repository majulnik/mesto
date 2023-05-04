let formElement = document.querySelector('.popup__container_type_profile');

let nameInput = formElement.querySelector('#profile-name');
let jobInput = formElement.querySelector('#profile-description');

let profileNameElement = document.querySelector('.profile__name');
let profileDescriptionElement = document.querySelector('.profile__description');

let ButtonPopupOpen = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');

let buttonPopupClose = popup.querySelector('.popup__close');

function handleFormSubmit(evt) {
  evt.preventDefault();

  let nameValue = nameInput.value;
  let descriptionValue = jobInput.value;

  profileNameElement.textContent = nameValue;
  profileDescriptionElement.textContent = descriptionValue;

  closePopup();
}

function openPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

ButtonPopupOpen.addEventListener('click', openPopup);

buttonPopupClose.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);
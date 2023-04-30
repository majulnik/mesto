const ButtonPopupOpen = document.querySelector('.profile__button_type_edit');
const popup = document.querySelector('.popup');
const buttonPopupClose = document.querySelector('.popup__close');

ButtonPopupOpen.addEventListener('click', () => {
    popup.classList.add('popup__opened');
});

buttonPopupClose.addEventListener('click', () => {
    popup.classList.remove('popup__opened');
});
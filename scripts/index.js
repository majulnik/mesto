// Находим форму в DOM
let formElement = document.querySelector('.popup__container_type_profile');

// Находим поля формы в DOM
let nameInput = document.querySelector('#profile-name');
let jobInput = document.querySelector('#profile-description');

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Получите значение полей jobInput и nameInput из свойства value

  let nameValue = nameInput.value;
  let descriptionValue = jobInput.value;

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileNameElement = document.querySelector('.profile__name');
  let profileDescriptionElement = document.querySelector('.profile__description');

  // Вставьте новые значения с помощью textContent
  profileNameElement.textContent = nameValue;
  profileDescriptionElement.textContent = descriptionValue;
}

// Добавляем обработчик клика по кнопке "Редактировать профиль"
let ButtonPopupOpen = document.querySelector('.profile__button_type_edit');
let popup = document.querySelector('.popup');

ButtonPopupOpen.addEventListener('click', () => {
  // Получаем текущие значения полей из профиля
  let profileNameValue = document.querySelector('.profile__name').textContent;
  let profileDescriptionValue = document.querySelector('.profile__description').textContent;

  // Устанавливаем текущие значения в поля формы
  nameInput.value = profileNameValue;
  jobInput.value = profileDescriptionValue;

  // Открываем попап
  popup.classList.add('popup__opened');
});

// Добавляем обработчик клика по кнопке "Закрыть"
let buttonPopupClose = document.querySelector('.popup__close');

buttonPopupClose.addEventListener('click', () => {
  // Закрываем попап
  popup.classList.remove('popup__opened');
});

// Добавляем обработчик нажатия на клавишу "Escape"
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    // Закрываем попап
    popup.classList.remove('popup__opened');
  }
});

// Добавляем обработчик клика по оверлею
popup.addEventListener('click', function(event) {
  if (event.target === this) {
    // Закрываем попап
    popup.classList.remove('popup__opened');
  }
});

// Находим кнопку "Сохранить"
let popupSaveButton = document.querySelector('.popup__save');

// Добавляем обработчик клика по кнопке "Сохранить"
popupSaveButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  handleFormSubmit(evt);
  popup.classList.remove('popup__opened');
}); 
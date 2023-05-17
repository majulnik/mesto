// 1. Шесть карточек «из коробки» - добавление фотографий через template
const initialCards = [
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1564324738343-a8aeafb375d7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fCVEMCVCMCVEMCVCQiVEMSU4MiVEMCVCMCVEMCVCOXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1000&q=60',
    alt: 'Фото Байкал',
    like: false,
  },
  {
    name: 'Дагестан',
    link: 'https://images.unsplash.com/photo-1643281237857-5f14c2b9f3ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8JUQwJUIwJUQwJUJCJUQxJTgyJUQwJUIwJUQwJUI5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60',
    alt: 'Фото Дагестан',
    like: false,
  },
  {
    name: 'Калининград',
    link: 'https://images.unsplash.com/photo-1679262353529-e85c6ef78a8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    alt: 'Фото Калининград',
    like: false,
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1597533849860-5a04a21a7b3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    alt: 'Фото Санкт-Петербург',
    like: false,
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1575582293156-7d185b60c7bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    alt: 'Фото Карелия',
    like: false,
  },
  {
    name: 'Великий Устюг',
    link: 'https://images.unsplash.com/photo-1608478870699-0c4809cccd25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=943&q=80',
    alt: 'Фото Великий Устюг',
    like: false,
  }
];

const formElement = document.querySelector('.popup__container_type_profile');

const nameInput = formElement.querySelector('#profile-name');
const jobInput = formElement.querySelector('#profile-description');

const placeInput = document.querySelector('#new-place');
const linkInput = document.querySelector('#new-link');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const ButtonPopupOpen = document.querySelector('.profile__button_type_edit');
const popup = document.getElementById('profile_popup');
const popupItem = document.getElementById('item_popup');

const buttonPopupClose = popup.querySelector('.popup__close');

const buttonItemPopupClose = document.getElementById('closeItemPopup');
const buttonItemPopupOpen = document.getElementById('openItemPopup');
const buttonItemPopupSave = document.getElementById('saveItem');

// Добавление информации о пользователе на страницу через попап
function handleFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const descriptionValue = jobInput.value;

  profileNameElement.textContent = nameValue;
  profileDescriptionElement.textContent = descriptionValue;

  closePopup();
}

// 3. Добавление карточки - Добавление элемента в начало массива: метод unshift
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
  initialCards.unshift(newItem);
  displayElements(initialCards);
}

function openPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function openItemPopup() {
  nameInput.value = profileNameElement.textContent;
  jobInput.value = profileDescriptionElement.textContent;
  popupItem.classList.add('popup_opened');
}

function closeItemPopup() {
  popupItem.classList.remove('popup_opened');
}

ButtonPopupOpen.addEventListener('click', openPopup);

buttonPopupClose.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);

// 2. Форма добавления карточки - открытие нажатием на кнопку «+» и закрытие кликом на крестик
buttonItemPopupOpen.addEventListener('click', openItemPopup);

buttonItemPopupClose.addEventListener('click', closeItemPopup);

buttonItemPopupSave.addEventListener('click', handleItemAdd);

function displayElements(cards) {
  const elementsContainer = document.getElementById('elements__container');
  elementsContainer.innerHTML = "";
  cards.forEach(element => {
    const card = document.createElement('div');
    card.className = 'elements__item';

    const content = `<button type="button" class="elements__delete" aria-label="Delete"></button>
    <img class="elements__image" src="${element.link}" alt="${element.alt}">
    <div class="elements__info">
        <h2 class="elements__description">${element.name}</h2>
        <div class="elements__like-area">
            <button type="button" class="elements__like ${element.like ? 'elements__like_active':""}" aria-label="Like"></button>
        </div>
    </div>`;
    card.innerHTML = content;
    elementsContainer.appendChild(card);

// 6. Открытие попапа с картинкой
const imageItem = document.querySelector('.elements__image');
const imageOpen = document.getElementById('gallery_popup');
const imageItemClose = document.querySelector('.popup__close');
    
imageItem.addEventListener('click', () => {
    imageOpen.classList.add('popup__opened');   
});

imageItemClose.addEventListener('click', () => {
  imageOpen.classList.remove('popup__opened');
});

// 4. Лайк карточки
const likeItem = card.querySelector('.elements__like');
likeItem.addEventListener('click', () => {
likeItem.classList.add('elements__like_active');

});

});
  };
  displayElements(initialCards);





// 5. Удаление карточки через иконку корзины


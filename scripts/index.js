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

// 1. Шесть карточек «из коробки» - добавление фотографий через template

const initialCards = [
  {
    name: 'Байкал',
    link: 'https://images.unsplash.com/photo-1652167934538-c0b4ab5ced1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    like: false,
  },
  {
    name: 'Дагестан',
    link: 'https://images.unsplash.com/photo-1627327660729-a48ba87c4bb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80',
    like: false,
  },
  {
    name: 'Калининград',
    link: 'https://images.unsplash.com/photo-1679262353529-e85c6ef78a8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    like: false,
  },
  {
    name: 'Карелия',
    link: 'https://images.unsplash.com/photo-1575582293156-7d185b60c7bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
    like: false,
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1597533849860-5a04a21a7b3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    like: false,
  },
  {
    name: 'Великий Устюг',
    link: 'https://images.unsplash.com/photo-1608478870699-0c4809cccd25?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=943&q=80',
    like: false,
  }
];



function displayElements(cards) {
  const elementsContainer = document.getElementById('elements__container');
  cards.forEach(element => {
    const card = document.createElement('div');
    card.className = 'elements__item';    

    const content = `<button type="button" class="elements__delete" aria-label="Delete"></button>
    <img class="elements__image" src="${element.link}" alt="Фото Байкал">
    <div class="elements__info">
        <h2 class="elements__description">${element.name}</h2>
        <div class="elements__like-area">
            <button type="button" class="elements__like ${element.like ? 'elements__like_active':""}" aria-label="Like"></button>
        </div>
    </div>`;
    card.innerHTML = content;
    elementsContainer.appendChild(card);
  });
    console.log(elementsContainer);

//4. Лайк карточки - работает только на ПЕРВОЙ карточке
const likeItem = document.querySelectorAll('.elements__like');
likeItem.addEventListener('click', () => {
likeItem.classList.add('elements__like_active');
});
  };
  displayElements(initialCards);


// 2. Форма добавления карточки - открытие нажатием на кнопку «+» и закрытие кликом на крестик

// 3. Добавление карточки - Добавление элемента в начало массива: метод unshif???



// 5. Удаление карточки через иконку корзины

// 6. Открытие попапа с картинкой


// Если перезагрузить страницу, карточки и лайки не сохранятся.
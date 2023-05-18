const formElement = document.querySelector('.popup__container_type_profile');

const nameInput = formElement.querySelector('#profile-name');
const jobInput = formElement.querySelector('#profile-description');

const placeInput = document.querySelector('#new-place');
const linkInput = document.querySelector('#new-link');

const placeForm = document.getElementById('placeForm');

const profileNameElement = document.querySelector('.profile__name');
const profileDescriptionElement = document.querySelector('.profile__description');

const buttonPopupOpen = document.querySelector('.profile__button_type_edit');
const popup = document.getElementById('profile_popup');
const popupItem = document.getElementById('item_popup');

const buttonPopupClose = popup.querySelector('.popup__close');

const buttonItemPopupClose = document.getElementById('closeItemPopup');
const buttonItemPopupOpen = document.getElementById('openItemPopup');

const closeImagePopup = document.getElementById('closeImagePopup');
const popupImageName = document.getElementById('popupImageName');
const popupImageSrc = document.getElementById('popupImageSrc');

const popupImage = document.getElementById('image_popup');

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

closeImagePopup.addEventListener('click', () => {
  popupImage.classList.remove('popup_opened');
});

buttonPopupOpen.addEventListener('click', openPopup);

buttonPopupClose.addEventListener('click', closePopup);

formElement.addEventListener('submit', handleFormSubmit);

// 2. Форма добавления карточки - открытие нажатием на кнопку «+» и закрытие кликом на крестик
buttonItemPopupOpen.addEventListener('click', openItemPopup);

buttonItemPopupClose.addEventListener('click', closeItemPopup);

placeForm.addEventListener('submit', handleItemAdd);

//placeForm.onsubmit = handleItemAdd;

function getCardElement (cardContent) {
  const card = document.createElement('div');
  card.className = 'elements__item';

  const content = `<button type="button" class="elements__delete" aria-label="Delete"></button>
  <img class="elements__image" src="${cardContent.link}" alt="${cardContent.alt}">
  <div class="elements__info">
      <h2 class="elements__description">${cardContent.name}</h2>
      <div class="elements__like-area">
          <button type="button" class="elements__like ${cardContent.like ? 'elements__like_active' : ""}" aria-label="Like"></button>
      </div>
  </div>`;
  card.innerHTML = content;
  return card;
}

function addCardListener(card, cardContent) {
      // 4. Лайк карточки
      const likeItem = card.querySelector('.elements__like');
      likeItem.addEventListener('click', () => {
        likeItem.classList.add('elements__like_active');
      });
  
      // Удаление карточки
      const deleteItem = card.querySelector('.elements__delete');
      deleteItem.addEventListener('click', () => {
        card.outerHTML = '';
      });
  
      // Открытие попапа с картинкой
      const imageItem = card.querySelector('.elements__image');
      imageItem.addEventListener('click', () => {
        popupImage.classList.add('popup_opened');
        popupImageSrc.src = cardContent.link;
        popupImageSrc.alt = cardContent.alt;
        popupImageName.innerText = cardContent.name;
      });
}

function displayElements(cards) {
  const elementsContainer = document.getElementById('elements__container');
  elementsContainer.innerHTML = "";
  cards.forEach(element => {
    const card = getCardElement(element);
    elementsContainer.appendChild(card);

    addCardListener(card, element);    
  });
};

displayElements(initialCards);
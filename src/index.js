import './pages/index.css';
import editIcon from './images/edit-icon.svg';
import { openPopup, closePopup, renderLoading } from './scripts/modal.js';
import { createCard } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import * as api from './scripts/api.js';

// Глобальные переменные
let userId = null;
let cardToDelete = null;
let cardIdToDelete = null;

// DOM-элементы
// --- Профиль
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const openProfileEditBtn = document.querySelector('.profile__edit-button');
const addCardBtn = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');
profileImage.style.setProperty('--edit-icon', `url(${editIcon})`);

// --- Попап редактирования профиля
const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const nameInput = editProfilePopup.querySelector('.popup__input_type_name');
const jobInput = editProfilePopup.querySelector('.popup__input_type_description');

// --- Попап добавления карточки
const newCardPopup = document.querySelector('.popup_type_new-card');
const newCardForm = newCardPopup.querySelector('.popup__form');
const cardTitleInput = newCardPopup.querySelector('.popup__input_type_card-name');
const cardLinkInput = newCardPopup.querySelector('.popup__input_type_url');

// --- Попап смены аватара
const avatarPopup = document.querySelector('.popup_type_change-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarLinkInput = avatarPopup.querySelector('.popup__input_type_url');

// --- Попап подтверждения удаления
const confirmPopup = document.querySelector('.popup_type_confirm');

// --- Попап с изображением
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// --- Список карточек
const placesList = document.querySelector('.places__list');

// Конфигурация валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'form__input_type_error'
};

enableValidation(validationConfig);

// Коллбэки для карточки
const cardCallbacks = {
  onDeleteClick: (cardData, element) => {
    cardToDelete = element;
    cardIdToDelete = cardData._id;
    openPopup(confirmPopup);
  },
  onImageClick: openImagePopup,
  onLikeClick: handleLikeClick
};

// Обработчики
function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(editProfileForm, validationConfig);
  openPopup(editProfilePopup);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  const btn = event.submitter;
  renderLoading(true, btn, 'Сохранить', 'Сохранение...');

  api.editProfile(nameInput.value, jobInput.value)
    .then((newData) => {
      profileName.textContent = newData.name;
      profileJob.textContent = newData.about;
      closePopup(editProfilePopup);
    })
    .catch((err) => console.error('Ошибка при изменении данных профиля:', err))
    .finally(() => renderLoading(false, btn, 'Сохранить', 'Сохранение...'));
}

function openNewCardPopup() {
  clearValidation(newCardFormForm, validationConfig);
  openPopup(newCardPopup);
}

function handleAddCardSubmit(event) {
  event.preventDefault();
  const btn = event.submitter;
  renderLoading(true, btn, 'Добавить', 'Добавление...');

  api.addNewCard(cardTitleInput.value, cardLinkInput.value)
    .then((card) => {
      placesList.prepend(createCard(card, userId, cardCallbacks));
      event.target.reset();
      closePopup(newCardPopup);
    })
    .catch((err) => console.error('Ошибка создания карточки:', err))
    .finally(() => renderLoading(false, btn, 'Добавить', 'Добавление...'));
}

function changeAvatarPopup() {
  clearValidation(avatarForm, validationConfig);
  openPopup(avatarPopup);
}

function handleChangeAvatarSubmit(event) {
  event.preventDefault();
  const btn = event.submitter;
  renderLoading(true, btn, 'Сохранить', 'Сохранение...');

  api.changeAvatar(avatarLinkInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((err) => console.error('Ошибка при изменении аватара:', err))
    .finally(() => renderLoading(false, btn, 'Сохранить', 'Сохранение...'));
}

function handleLikeClick(cardData, cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const method = isLiked ? api.removeLike : api.putLike;

  method(cardData._id)
    .then((updatedCard) => {
      likeCounter.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active',
        updatedCard.likes.some(user => user._id === userId));
    })
    .catch((err) => console.error('Ошибка при обновлении лайка:', err));
}

function openImagePopup(card) {
  imagePopupImg.src = card.link;
  imagePopupImg.alt = card.name;
  imagePopupCaption.textContent = card.name;
  openPopup(imagePopup);
}

function addUserData(data) {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
}

// Загрузка данных и отрисовка карточек
Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([userData, cardList]) => {
    userId = userData._id;
    addUserData(userData);
    cardList.forEach((card) => {
      placesList.append(createCard(card, userId, cardCallbacks));
    });
  })
  .catch((err) => console.error('Ошибка при загрузке данных:', err));

// Навешивание слушателей
profileImage.addEventListener('click', changeAvatarPopup);
openProfileEditBtn.addEventListener('click', openEditPopup);
addCardBtn.addEventListener('click', openNewCardPopup);
newCardForm.addEventListener('submit', handleAddCardSubmit);
editProfileForm.addEventListener('submit', handleProfileFormSubmit);
avatarForm.addEventListener('submit', handleChangeAvatarSubmit);
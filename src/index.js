import './pages/index.css';
import avatarImage from './images/avatar.jpg';
import initialCards from './scripts/cards.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { createCard, deleteCard } from './scripts/card.js';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarImage})`;

const placesList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const editPopup = document.querySelector('.popup_type_edit');
const openEditBtn = document.querySelector('.profile__edit-button');
const formElement = editPopup.querySelector('.popup__form');
const nameInput = editPopup.querySelector('.popup__input_type_name');
const jobInput = editPopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const newCardPopup = document.querySelector('.popup_type_new-card');
const addCardBtn = document.querySelector('.profile__add-button');
const formAddCard = newCardPopup.querySelector('.popup__form');
const titleInput = newCardPopup.querySelector('.popup__input_type_card-name');
const linkInput = newCardPopup.querySelector('.popup__input_type_url');

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(editPopup);
  formElement.addEventListener('submit', handleFormSubmit);
};

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(editPopup);
  formElement.removeEventListener('submit', handleFormSubmit);
};

function openNewCardPopup() {
  openPopup(newCardPopup);
  formAddCard.addEventListener('submit', handleAddCardSubmit);
};

function handleAddCardSubmit(event) {
  event.preventDefault();
  const card = {
    name: titleInput.value,
    link: linkInput.value
  }
  placesList.append(createCard(card, deleteCard, openImagePopup))
  titleInput.value = '';
  linkInput.value = '';
  closePopup(newCardPopup);
};

function openImagePopup(card) {
  const imagePopupImg = imagePopup.querySelector('.popup__image');
  const imagePopupCaption = imagePopup.querySelector('.popup__caption');
  imagePopupImg.src = card.link;
  imagePopupImg.alt = card.name;
  imagePopupCaption.textContent = card.name;
  openPopup(imagePopup);
};

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard, openImagePopup));
});

openEditBtn.addEventListener('click', openEditPopup);
addCardBtn.addEventListener('click', openNewCardPopup);
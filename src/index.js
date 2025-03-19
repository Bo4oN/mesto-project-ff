import './pages/index.css';
import avatarImage from './images/avatar.jpg';
import initialCards from './scripts/cards.js';
import { openPopup, closePopup } from './scripts/modal.js';
import { createCard, deleteCard } from './scripts/card.js';

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatarImage})`;

const placesList = document.querySelector('.places__list');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImg = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');
const editProfilePopup = document.querySelector('.popup_type_edit');
const openProfileEditBtn = document.querySelector('.profile__edit-button');
const editProfileFormElement = editProfilePopup.querySelector('.popup__form');
const nameProfileInput = editProfilePopup.querySelector('.popup__input_type_name');
const jobProfileInput = editProfilePopup.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const newCardPopup = document.querySelector('.popup_type_new-card');
const addCardBtn = document.querySelector('.profile__add-button');
const formAddCard = newCardPopup.querySelector('.popup__form');
const titleAddCardInput = newCardPopup.querySelector('.popup__input_type_card-name');
const linkAddCardInput = newCardPopup.querySelector('.popup__input_type_url');

function openEditPopup() {
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileJob.textContent;
  openPopup(editProfilePopup);
};

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameProfileInput.value;
  profileJob.textContent = jobProfileInput.value;
  closePopup(editProfilePopup);
};

function openNewCardPopup() {
  openPopup(newCardPopup);
};

function handleAddCardSubmit(event) {
  event.preventDefault();
  const card = {
    name: titleAddCardInput.value,
    link: linkAddCardInput.value
  }
  placesList.prepend(createCard(card, deleteCard, openImagePopup))
  event.target.reset();
  closePopup(newCardPopup);
};

function openImagePopup(card) {
  imagePopupImg.src = card.link;
  imagePopupImg.alt = card.name;
  imagePopupCaption.textContent = card.name;
  openPopup(imagePopup);
};

initialCards.forEach((card) => {
  placesList.append(createCard(card, deleteCard, openImagePopup));
});

openProfileEditBtn.addEventListener('click', openEditPopup);
addCardBtn.addEventListener('click', openNewCardPopup);
formAddCard.addEventListener('submit', handleAddCardSubmit);
editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);
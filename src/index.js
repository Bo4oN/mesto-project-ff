import './pages/index.css';
import editIcon from './images/edit-icon.svg';
import { openPopup, closePopup, renderLoading } from './scripts/modal.js';
import { createCard } from './scripts/card.js';
import * as api from './scripts/api.js';

let userId = null;
let cardToDelete = null;
let cardIdToDelete = null;

const profileImage = document.querySelector('.profile__image');
profileImage.style.setProperty('--edit-icon', `url(${editIcon})`);

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
const avatarPopup = document.querySelector('.popup_type_change-avatar');
const linkAvatarInput = avatarPopup.querySelector('.popup__input_type_url');
const formChangeAvatar = avatarPopup.querySelector('.popup__form')

const cardCallbacks = {
  onDeleteClick: (cardData, element) => {
    cardToDelete = element;
    cardIdToDelete = cardData._id;
    openPopup(confirmPopup);
  },
  onImageClick: openImagePopup,
  onLikeClick: handleLikeClick
};

function openEditPopup() {
  nameProfileInput.value = profileName.textContent;
  jobProfileInput.value = profileJob.textContent;
  openPopup(editProfilePopup);
};

function handleProfileFormSubmit(event) {
  event.preventDefault();

  const newName = nameProfileInput.value;
  const newAbout = jobProfileInput.value;
  const btn = event.submitter;
  
  renderLoading(true, btn, 'Сохранить', 'Сохранение...');

  api.editProfile(newName, newAbout)
  .then((newData) => {
    profileName.textContent = newData.name;
    profileJob.textContent = newData.about;
    closePopup(editProfilePopup);
  })
  .catch((err) => {
    console.error('Ошибка при изменении данных профиля: ', err);
  })
  .finally(() => renderLoading(true, btn, 'Сохранить', 'Сохранение...'));
};

function openNewCardPopup() {
  openPopup(newCardPopup);
};

function handleAddCardSubmit(event) {
  event.preventDefault();

  const cardName = titleAddCardInput.value;
  const cardLink = linkAddCardInput.value;
  const btn = event.submitter;
  
  renderLoading(true, btn, 'Добавить', 'Добавление...');

  api.addNewCard(cardName, cardLink)
  .then((card) => {
    placesList.prepend(
      createCard({ ...card, currentUserId: userId }, cardCallbacks)
    );
    event.target.reset();
    closePopup(newCardPopup);
  })
  .catch((err) => {
    console.error('Ошибка создания карточки: ', err);
  })
  .finally(() => renderLoading(false, btn, 'Добавить', 'Добавление...'));
}

function openImagePopup(card) {
  imagePopupImg.src = card.link;
  imagePopupImg.alt = card.name;
  imagePopupCaption.textContent = card.name;
  openPopup(imagePopup);
};

function changeAvatarPopup() {
  openPopup(avatarPopup);
};

function handleChangeAvatarSubmit(event) {
  event.preventDefault();

  const newAvatar = linkAvatarInput.value;
  const btn = event.submitter;
  
  renderLoading(true, btn, 'Сохранить', 'Сохранение...');

  api.changeAvatar(newAvatar)
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(avatarPopup);
    })
    .catch((err) => {
      console.error('Ошибка при изменении аватара: ', err);
    })
    .finally(() => {
      renderLoading(false, btn, 'Сохранить', 'Сохранение...');
    });
};

function handleLikeClick(cardData, cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');
  const isLiked = likeButton.classList.contains('card__like-button_is-active');

  const method = isLiked ? api.removeLike : api.putLike;

  method(cardData._id)
    .then((updatedCard) => {
      likeCounter.textContent = updatedCard.likes.length;

      if (updatedCard.likes.some(user => user._id === userId)) {
        likeButton.classList.add('card__like-button_is-active');
      } else {
        likeButton.classList.remove('card__like-button_is-active');
      }
    })
    .catch((err) => {
      console.error('Ошибка при обновлении лайка:', err);
    });
}

function addUserData(data) {
  profileName.textContent = data.name;
  profileJob.textContent = data.about;
  profileImage.style.backgroundImage = `url(${data.avatar})`;
};

Promise.all([api.getUserInfo(), api.getAllCards()])
  .then(([userData, cardList]) => {
    userId = userData._id;
    addUserData(userData);

    cardList.forEach((card) => {
      placesList.append(createCard(
        {...card, currentUserId: userId},
        cardCallbacks
      ));
    });
  })
  .catch((err) => {
    console.error('Ошибка при загрузке данных: ', err);
  });

profileImage.addEventListener('click', changeAvatarPopup);
openProfileEditBtn.addEventListener('click', openEditPopup);
addCardBtn.addEventListener('click', openNewCardPopup);
formAddCard.addEventListener('submit', handleAddCardSubmit);
editProfileFormElement.addEventListener('submit', handleProfileFormSubmit);
formChangeAvatar.addEventListener('submit', handleChangeAvatarSubmit);
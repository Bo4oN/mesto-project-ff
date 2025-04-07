const templateCard = document.querySelector('#card-template').content;

export function deleteCard(cardElement) {
  cardElement.remove();
};

export function createCard(cardData, { onDeleteClick, onImageClick, onLikeClick }) {
  const cardElement = templateCard.cloneNode(true).firstElementChild;
  const img = cardElement.querySelector('.card__image');
  const title = cardElement.querySelector('.card__title');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  img.src = cardData.link;
  img.alt = cardData.name;
  title.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  // Вызов переданного обработчика по клику на картинку
  img.addEventListener('click', () => onImageClick(cardData));

  // Вызов переданного обработчика лайка
  likeButton.addEventListener('click', () => onLikeClick(cardData, cardElement));

  // Вызов обработчика удаления
  deleteButton.addEventListener('click', () => onDeleteClick(cardData, cardElement));

  if (cardData.owner._id !== cardData.currentUserId) {
    deleteButton.remove();
  }

  if (cardData.likes.some(user => user._id === cardData.currentUserId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  return cardElement;
}
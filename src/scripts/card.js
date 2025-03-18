const templateCard = document.querySelector('#card-template').content;

export function deleteCard(cardElement) {
  cardElement.remove();
};

export function createCard(card, deleteCard, openImagePopup) {
  const newCard = templateCard.cloneNode(true).firstElementChild;
  const img = newCard.querySelector('.card__image');
  const title = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button');
  const likeButton = newCard.querySelector('.card__like-button');

  img.src = card.link;
  img.alt = card.name;
  title.textContent = card.name;

  deleteButton.addEventListener('click', () => deleteCard(newCard));
  img.addEventListener('click', () => openImagePopup(card));
  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_is-active'));

  return newCard;
};
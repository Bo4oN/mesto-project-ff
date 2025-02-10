const templateCard = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

function createCard(card, deleteCard) {
  const newCard = templateCard.cloneNode(true).firstElementChild;
  const img = newCard.querySelector('.card__image');
  const title = newCard.querySelector('.card__title');
  const deleteButton = newCard.querySelector('.card__delete-button');

  img.src = card.link;
  img.alt = card.name;
  title.textContent = card.name;

  deleteButton.addEventListener('click', () => deleteCard(newCard));
  return newCard;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

initialCards.forEach((card) => { 
  placesList.append(createCard(card, deleteCard));
});
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('click', handleOutsideClick);
  const closeBtn = popup.querySelector('.popup__close');
  if (closeBtn) closeBtn.addEventListener('click', handleCloseBtnClick);
};

export function closePopup(popup) {
  if (!popup) return;
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('click', handleOutsideClick);
  const closeBtn = popup.querySelector('.popup__close');
  if (closeBtn) closeBtn.removeEventListener('click', handleCloseBtnClick);
};

function handleCloseBtnClick(event) { closePopup(event.target.closest('.popup')); }

function handleEscClose(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closePopup(openedPopup);
  }
};

function handleOutsideClick(event) {
  if (event.target.classList.contains('popup')) {
    closePopup(event.target);
  }
};
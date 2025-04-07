import { setEventListeners, resetValidation, toggleButtonState } from './validation.js'

export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
  document.addEventListener('click', handleOutsideClick);
  const closeBtn = popup.querySelector('.popup__close');

  if (closeBtn) closeBtn.addEventListener('click', handleCloseBtnClick);

  const form = popup.querySelector('.popup__form');
  if (form) {
    toggleButtonState(form);
    if (!form.dataset.validationAttached) {
      setEventListeners(form);
      form.dataset.validationAttached = "true";
    }
  }
};

export function closePopup(popup) {
  if (!popup) return;
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
  document.removeEventListener('click', handleOutsideClick);
  const closeBtn = popup.querySelector('.popup__close');
  if (closeBtn) closeBtn.removeEventListener('click', handleCloseBtnClick);

  const form = popup.querySelector('.popup__form');
  if (form) {
    form.reset();
    resetValidation(form);
  }
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

export function renderLoading(isLoading, buttonElement, defaultText, loadingText) {
  buttonElement.textContent = isLoading ? loadingText : defaultText;
}

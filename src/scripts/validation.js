const showInputError = (formElement, inputElement) => {
  inputElement.classList.add('form__input_type_error');
  const errorSpan = formElement.querySelector(`#${inputElement.name}-error`);
  errorSpan.textContent = inputElement.validationMessage;
};

const hideInputError = (formElement, inputElement) => {
  inputElement.classList.remove('form__input_type_error');
  const errorSpan = formElement.querySelector(`#${inputElement.name}-error`);
  errorSpan.textContent = '';
};

const isValidity = (formElement, inputElement) => {
  const value = inputElement.value.trim();
  const type = inputElement.type;

  inputElement.setCustomValidity('');

  if (type === 'text' && value !== '') {
    const allowedRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;
    if (!allowedRegex.test(value)) {
      inputElement.setCustomValidity("Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы");
    }
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement);
  } else {
    hideInputError(formElement, inputElement);
  }
};

export function toggleButtonState(formElement) {
  const btn = formElement.querySelector('.popup__button');
  if (!btn) return;

  if (!formElement.checkValidity()) {
    btn.disabled = true;
    btn.classList.add('popup__button_inactive');
  } else {
    btn.disabled = false;
    btn.classList.remove('popup__button_inactive');
  }
};

export function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValidity(formElement, inputElement);
      toggleButtonState(formElement);
    });
  });
}

export function resetValidation(formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach((inputElement) => {
    inputElement.classList.remove('form__input_type_error');
    inputElement.setCustomValidity('');

    const errorSpan = formElement.querySelector(`#${inputElement.name}-error`);
    if (errorSpan) {
      errorSpan.textContent = '';
    }
  });
  
  toggleButtonState(formElement);
}
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.classList.remove(config.inputErrorClass);
    inputElement.setCustomValidity('');

    const errorSpan = formElement.querySelector(`#${inputElement.name}-error`);
    if (errorSpan) {
      errorSpan.textContent = '';
    }
  });

  toggleButtonState(formElement, config);
}

function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValidity(formElement, inputElement, config);
      toggleButtonState(formElement, config);
    });
  });

  toggleButtonState(formElement, config);
}

function isValidity(formElement, inputElement, config) {
  inputElement.setCustomValidity('');

  if (inputElement.validity.patternMismatch) {
    const customMessage = inputElement.dataset.errorMessage;
    inputElement.setCustomValidity(customMessage);
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

function showInputError(formElement, inputElement, config) {
  const errorSpan = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  if (errorSpan) errorSpan.textContent = inputElement.validationMessage;
}

function hideInputError(formElement, inputElement, config) {
  const errorSpan = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  if (errorSpan) errorSpan.textContent = '';
}

function toggleButtonState(formElement, config) {
  const button = formElement.querySelector(config.submitButtonSelector);
  const isFormValid = formElement.checkValidity();

  button.disabled = !isFormValid;
  button.classList.toggle(config.inactiveButtonClass, !isFormValid);
}
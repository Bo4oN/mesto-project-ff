const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-35',
  headers: {
    authorization: '9eb055ff-774c-4522-b63a-a06efa878219',
    'Content-Type': 'application/json'
  }
};

export function getUserInfo() {
  return fetch(config.baseUrl + '/users/me', {
    headers: config.headers
  })
  .then(checkResponse);
};

export function getAllCards() {
  return fetch(config.baseUrl + '/cards', {
    headers: config.headers
  })
  .then(checkResponse);
};

export function editProfile(newName, newAbout) {
  return fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: newName,
      about: newAbout
      })
  })
  .then(checkResponse);
};

export function addNewCard(cardName, cardLink) {
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardName,
      link: cardLink
    })
  })
  .then(checkResponse);
};

export function deleteCard(cardId) {
  return fetch(config.baseUrl + '/cards/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
};

export function putLike(cardId) {
  return fetch(config.baseUrl + '/cards/likes/' + cardId, {
    method: 'PUT',
    headers: config.headers
  })
  .then(checkResponse);
};

export function removeLike(cardId) {
  return fetch(config.baseUrl + '/cards/likes/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
};

export function changeAvatar(avatarUrl) {
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl
    })
  })
  .then(checkResponse);
};

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

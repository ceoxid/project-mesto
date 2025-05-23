"use strict";

const cohortId = "apf-cohort-202";
export let userId;
const authorizationToken = "af66cb8b-6b8f-47cd-ba83-8dfe0104fcb1";
const config = {
  baseUrl: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: authorizationToken,
    "Content-Type": "application/json"
  }
};

export function setUserId(id) {
  userId = id;
}

export function handleError(err) {
  if (err.status === undefined) {
    console.log('Неизвестная ошибка');
  } else {
    console.log(`Ошибка ${err.status}`)
  }
}

function getData(path, method = "GET", body = null) {
  const params = {
    method: method,
    headers: config.headers
  };

  if (body) {
    params.body = JSON.stringify(body);
  }

  return fetch(`${config.baseUrl}/${path}`, params)
    .then(res => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    });
}

export function getProfileData() {
  return getData("users/me");
}

export function getInitialCards() {
  return getData("cards");
}

export function updateProfileInfo(name, about) {
  return getData("users/me", "PATCH", { name: name, about: about });
}

export function createCard(name, link) {
  return getData("cards", "POST", { name: name, link: link });
}

export function deleteCard(id) {
  return getData(`cards/${id}`, 'DELETE');
}

export function setLike(id) {
  return getData(`cards/likes/${id}`, 'PUT');
}

export function unsetLike(id) {
  return getData(`cards/likes/${id}`, 'DELETE');
}

export function updateAvatar(link) {
  return getData('users/me/avatar', 'PATCH', {avatar: link});
}

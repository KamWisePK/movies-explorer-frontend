
 export const BASE_URL = 'https://api.diplomyandex.movies.nomoredomainsmonster.ru';

 //export const BASE_URL = 'http://localhost:3000';

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      },
      credentials:'include',
    body: JSON.stringify({ email, password, name })
  }).then(checkAnswer);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify({ email, password })
  }).then(checkAnswer);
}

export const saveMovie = (token, movie) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    credentials:'include',
    body: JSON.stringify(movie)
  }).then(checkAnswer);
}

export const getSavedMovies = (token) => {
  return fetch(`${BASE_URL}/movies`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    credentials:'include',
  }).then(checkAnswer);
}

export const deleteMovie = (token, id) => {
  return fetch(`${BASE_URL}/movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    credentials:'include',
  }).then(checkAnswer);
}

export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    credentials:'include',
  }).then(checkAnswer);
}

export const updateUserInfo = (token, userData) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    credentials:'include',
    body: JSON.stringify(userData)
  }).then(checkAnswer);
}

const checkAnswer = res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);

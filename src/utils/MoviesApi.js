class MoviesApi {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
    this._headers = headers;
  }

  getInitalCardsList() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
      credentials:'include',
      mode: "cors",
    })
      .then(res => this._checkRequestResult(res))
  }

  _checkRequestResult(res) {
    if (res.ok) {
      return res.json();
    }
    console.log(res)
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json',
    
  },
  credentials:'include',
});

export default moviesApi;

class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  changeLikeCardStatus(id, isLiked) {
    
    if (isLiked) {
      return fetch(`${this._url}cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);
    } else if (!isLiked) {
      return fetch(`${this._url}cards/${id}/likes`, {
        method: 'PUT',
        headers: this._headers
      })
      .then(this._checkResponse);
    }   
  }
 

  getUserData() {
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._headers

    })
    .then(this._checkResponse);
  }


  setUserData(name, about) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })

    })
    .then(this._checkResponse);
  }

  setAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })

    })
    .then(this._checkResponse);
  }

  removeCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  _checkResponse(res) {   
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);     
  }


  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse);
  }

  postNewCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })

    })
    .then(this._checkResponse);
  }
}

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-40/',
  headers: {
    authorization: 'c6cdad07-f201-4fb1-b931-468bd978f248',
    'Content-Type': 'application/json'
  }
}
);

export {api};
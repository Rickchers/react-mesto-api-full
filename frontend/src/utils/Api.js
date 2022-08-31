class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  changeLikeCardStatus(id, isLiked) {
    
    if (isLiked) {
      //`${this._url}cards/${id}/likes`
      return fetch(`http://localhost:3001/cards/${id}/likes`, {
        method: 'DELETE',
        //headers: this._headers
        headers: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
          'Content-Type': 'application/json'
        }
      })
      .then(this._checkResponse);
    } else if (!isLiked) {
      //`${this._url}cards/${id}/likes`
      return fetch(`http://localhost:3001/cards/${id}/likes`, {
        method: 'PUT',
        headers: {
          authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
          'Content-Type': 'application/json'
        }
        //headers: this._headers
      })
      .then(this._checkResponse);
    }   
  }
 

  getUserData() {
    //`${this._url}users/me`
    return fetch('http://localhost:3001/users/me', {
      method: 'GET',
      //headers: this._headers
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
        'Content-Type': 'application/json'
      }

    })
    .then(this._checkResponse);
  }


  setUserData(name, about) {
    //`${this._url}users/me`
    return fetch('http://localhost:3001/users/me', {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })

    })
    .then(this._checkResponse);
  }

  setAvatar(link) {
    //`${this._url}users/me/avatar`
    return fetch('http://localhost:3001/users/me/avatar', {
      method: 'PATCH',
      // headers: this._headers,
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })

    })
    .then(this._checkResponse);
  }

  removeCard(id) {
    //`${this._url}cards/${id}`
    return fetch(`http://localhost:3001/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
        'Content-Type': 'application/json'
      }
      //headers: this._headers
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
    return fetch('http://localhost:3001/cards/', {
      method: 'GET',
      //headers: this._headers
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
        'Content-Type': 'application/json'
      }
    })
    .then(this._checkResponse);
  }

  postNewCard(data) {
    //`${this._url}cards`
    return fetch('http://localhost:3001/cards', {
      method: 'POST',
      //headers: this._headers,
      headers: {
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
        'Content-Type': 'application/json'
      },
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
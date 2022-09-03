class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _checkResponse(res) {   
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка is number: ${res.status}`);     
  }

  _getHeaders() {
    const token = localStorage.getItem("token");
    return {
      "Authorization": `Bearer ${token}`,
      ...this._headers,
    }
  }

  changeLikeCardStatus(id, isLiked) {
    
    if (isLiked) {
      //`${this._url}cards/${id}/likes`
      return fetch(`${this._url}cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._getHeaders()
        // headers: {
        //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
        //   'Content-Type': 'application/json'
        // }
      })
      .then(this._checkResponse);
    } else if (!isLiked) {
      //`${this._url}cards/${id}/likes`
      return fetch(`${this._url}cards/${id}/likes`, {
        method: 'PUT',
        headers: this._getHeaders()
        // headers: {
        //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
        //   'Content-Type': 'application/json'
        // }
      })
      .then(this._checkResponse);
    }   
  }
 

  getUserData() {
    //`${this._url}users/me`
    return fetch(`${this._url}users/me`, {
      method: 'GET',
      headers: this._getHeaders()
      // headers: {
      //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
      //   'Content-Type': 'application/json'
      // }

    })
    .then(this._checkResponse);
  }


  setUserData(name, about) {
    //`${this._url}users/me`
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      // headers: {
      //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify({
        name: name,
        about: about
      })

    })
    .then(this._checkResponse);
  }

  setAvatar(link) {
    //`${this._url}users/me/avatar`
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      // headers: {
      //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify({
        avatar: link
      })

    })
    .then(this._checkResponse);
  }

  removeCard(id) {
    //`${this._url}cards/${id}`
    return fetch(`${this._url}cards/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
      // headers: {
      //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
      //   'Content-Type': 'application/json'
      // }
    })
    .then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._url}cards`, {
      method: 'GET',
      headers: this._getHeaders()
      // headers: {
      //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
      //   'Content-Type': 'application/json'
      // }
    })
    .then(this._checkResponse);
  }

  postNewCard(data) {
    //`${this._url}cards`
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      // headers: {
      //   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA',
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })

    })
    .then(this._checkResponse);
  }
}

const api = new Api({
  url: 'http://api.rickchers.mesto.nomoredomains.sbs/',
  headers: {
    "Accept": "application/json",
    'Content-Type': 'application/json',
    //"Authorization": `Bearer ${token}`,
  }
}
);

export {api};
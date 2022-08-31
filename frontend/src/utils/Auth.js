export const BASE_URL = "https://auth.nomoreparties.co";

//аутентификация пользователя (регистрация)
export const register = (email, password) => {
  //`${BASE_URL}/signup`
  return fetch('http://localhost:3001/signup', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

//авторизация пользователя
export const authorize = (email, password) => {
  //`${BASE_URL}/signin`
  return fetch('http://localhost:3001/signin', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })

    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);

        return data;
      } else {
        return;
      }
    });
};

//проверка токена
export const getContent = (token) => {
  //`${BASE_URL}/users/me`
  return fetch("http://localhost:3001/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

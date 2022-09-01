export const BASE_URL = "http://api.rickchers.mesto.nomoredomains.sbs";

//аутентификация пользователя (регистрация)
export const register = (email, password) => {
  //`${BASE_URL}/signup`
  return fetch(`${BASE_URL}/signup`, {
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
  return fetch(`${BASE_URL}/signin`, {
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
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

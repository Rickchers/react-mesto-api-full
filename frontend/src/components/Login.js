import React, { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    props.onLogin(email, password);
  }
  return (
    <form onSubmit={handleSubmit} className="auth">
      <h2 className="auth__title">Вход</h2>

      <input
        required
        onChange={handleChangeEmail}
        type="text"
        value={email || ""}
        placeholder="Email"
        className="auth__input"
        name="name"
        minLength="2"
        maxLength="40"
      />
      <span className="form__input-error"></span>

      <input
        required
        onChange={handleChangePassword}
        type="password"
        value={password || ""}
        placeholder="Пароль"
        className="auth__input"
        name="about"
        minLength="2"
        maxLength="200"
      />

      <button type="submit" className="auth__button">
        Войти
      </button>
    </form>
  );
}

export default Login;

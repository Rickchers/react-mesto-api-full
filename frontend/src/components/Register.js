import { Link } from "react-router-dom";
import React, { useState } from "react";

function Register(props) {
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
    props.onRegister(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="auth">
      <h2 className="auth__title">Регистрация</h2>

      <input
        required
        onChange={handleChangeEmail}
        type="text"
        value={email}
        placeholder="Email"
        className="auth__input"
        name="name"
        minLength="2"
        maxLength="40"
      />

      <input
        required
        onChange={handleChangePassword}
        type="password"
        value={password}
        placeholder="Пароль"
        className="auth__input"
        name="about"
        minLength="2"
        maxLength="200"
      />

      <button type="submit" className="auth__button">
        Зарегистрироваться
      </button>

      <Link to="/sign-in" className="auth__login-link">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
}

export default Register;

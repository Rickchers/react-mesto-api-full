import editIconPath from "../images/edit_icon.svg";
import editButtonPath from "../images/Edit_Button.svg";
import addButtonPath from "../images/cross.svg";

import React from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import Card from "./Card";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt="аватар"
        />

        <div className="profile__avatar-wrapper">
          <img
            onClick={props.onEditAvatar}
            className="profile__edit-icon"
            src={editIconPath}
            alt="кнопка редактирования аватара"
          />
        </div>

        <div className="profile__wrapper">
          <div className="profile__info">
            <h1 className="profile__title">{currentUser.name}</h1>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button type="button" className="profile__edit-button fade-out">
            <img
              onClick={props.onEditProfile}
              className="profile__button-image"
              src={editButtonPath}
              alt="кнопка редактирования профиля"
            />
          </button>
        </div>

        <button
          onClick={props.onAddPlace}
          type="button"
          className="profile__add-button fade-out"
        >
          <img
            className="profile__add-button-image"
            src={addButtonPath}
            alt="кнопка добавить"
          />
        </button>
      </section>

      <section className="cards" aria-label="фотогалерея">
        {props.cards.map((card) => {
          return (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          );
        })}
      </section>
    </main>
  );
}

export default Main;

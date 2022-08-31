import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [link, setLink] = useState("");
  const [name, setName] = useState("");



  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      buttonText="Сохранить"
      title="Новое место"
      name="addCard"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <section className="form__section">
          <input
            required
            
            onChange={handleChangeName}
            id="cardName"
            value={name}
            placeholder="Название"
            className="popup__input"
            name="name"
            minLength="2"
            maxLength="30"
          />
          <span className="form__input-error"></span>
        </section>

        <section className="form__section">
          <input
            required
            
            onChange={handleChangeLink}
            type="url"
            id="cardLink"
            value={link}
            placeholder="Ссылка на картинку"
            className="popup__input"
            name="link"
          />
          <span className="form__input-error">Введите адрес сайта</span>
        </section>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;

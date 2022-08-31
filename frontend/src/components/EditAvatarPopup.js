import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(inputRef.current.value);
  }

  useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      buttonText="Сохранить"
      title="Обновить аватар"
      name="avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <section className="form__section">
          <input
            required
            defaultValue={""}
            ref={inputRef}
            type="url"
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

export default EditAvatarPopup;

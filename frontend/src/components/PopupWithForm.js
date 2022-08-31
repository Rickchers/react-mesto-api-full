import closeIconPath from "../images/Close_Icon.svg";

function PopupWithForm({
  buttonText,
  name,
  isOpen,
  title,
  children,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container_form-type">
        <form
          onSubmit={onSubmit}
          name="user-profile"
          className="form"
        >
          <h2 className="popup__title"> {title} </h2>
          {children}
          <button type="submit" className="popup__button">
            {buttonText}
          </button>
        </form>

        <button className="popup__close-button fade-out">
          <img
            onClick={onClose}
            src={closeIconPath}
            className="popup__button-image"
            alt="кнопка закрытия формы"
          />
        </button>
      </div>
    </div>
  );
}

export default PopupWithForm;

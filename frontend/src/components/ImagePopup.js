import closeIconPath from "../images/Close_Icon.svg";

function ImagePopup(props) {
  return (
    <div
      className={`popup ${props.card ? "popup_opened" : ""}`}
      id="popup-preview"
    >
      <figure className="popup__container">
        <img src={props.card} className="popup__image" alt="фотогалерея" />
        <button className="popup__close-button fade-out">
          <img
            onClick={props.onClose}
            src={closeIconPath}
            className="popup__button-image"
            alt="кнопка закрытия формы"
          />
        </button>
        <figcaption className="popup__figcaption"></figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;

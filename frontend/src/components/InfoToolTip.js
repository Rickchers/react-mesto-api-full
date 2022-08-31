import closeIcon from "../images/Close_Icon.svg";
import okIcon from "../images/ok_icon.svg";
import failIcon from "../images/fail_icon.svg";


function InfoToolTip({
  isOpen,
  title,
  onClose,
  isRegister
}) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_form-type">
        <img
          className="popup__status-icon"
          src={isRegister ? okIcon : failIcon}        
        />

        <h2 className="popup__tooltip-title">
          {isRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        
        </h2>   

        <button className="popup__close-button fade-out">
          <img
            onClick={onClose}
            src={closeIcon}
            className="popup__button-image"
            alt="кнопка закрытия формы"
          />
        </button>
      </div>
    </div>
  );
}


export default InfoToolTip;

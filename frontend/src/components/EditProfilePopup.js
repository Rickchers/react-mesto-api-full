import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);
    
    function handleSubmit(e){
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser(name, description);
    }

    function handleChangeName(e) {
        
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        
        setDescription(e.target.value);
    }
    

    return (
        <PopupWithForm
            buttonText='Сохранить'
            title="Редактировать профиль"
            name="editInfo"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <fieldset className="popup__fieldset">

                <section className="form__section">
                    <input
                        required 
                        onChange={handleChangeName} 
                        type="text"
                        id="username"
                        value={name || ''}
                        placeholder=""
                        className="popup__input"
                        name="name"
                        minLength="2"
                        maxLength="40"
                    />
                    <span className="form__input-error"></span>
                </section>

                <section className="form__section">
                    <input
                        required
                        onChange={handleChangeDescription}
                        type="text"
                        id="userjob"
                        value={description || ''}
                        placeholder=""
                        className="popup__input"
                        name="about"
                        minLength="2"
                        maxLength="200"
                    />
                    <span className="form__input-error"></span>
                </section>

            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
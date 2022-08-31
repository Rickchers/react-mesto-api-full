import React, { useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import trashImagePath from '../images/Trash.svg';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = props.card.owner._id === currentUser._id;
    

    const cardDeleteButtonClassName = (
        `card__button-image ${isOwn ? 'card__button-image_visible' : 'card__button-image_hidden'}`
    );
    
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeButtonClassName = (
        `card__heart ${isLiked ? 'card__heart_active' : 'card__heart'}`
    ); 
     
    
    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }
    

    return (       

        <article className="card">
            <img
                onClick={handleClick}
                src={props.card.link}
                className="card__image"
                alt=""
            />
            <div className="card__title-container">
                <h2 className="card__title">{props.card.name}</h2>
                <div className="card__title-wrapper">
                    <button
                    onClick={handleLikeClick}    
                    className={cardLikeButtonClassName}
                    aria-label="кнопка добавить в понравившиеся">
                    </button>
                    <p className="card__likes">{props.card.likes.length}</p>
                </div>
            </div>
            <button
                onClick={handleDeleteClick}
                type="button"
                className="card__remove-button fade-out">
                <img className={cardDeleteButtonClassName}
                    src={trashImagePath}
                    alt="кнопка удалить карту"
                />
            </button>
        </article>
       
    )
}

export default Card;
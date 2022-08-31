import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoToolTip from "./InfoToolTip";

import Register from "./Register";
import Login from "./Login";

import { useState, useEffect } from "react";
import { Route, Switch, useHistory, withRouter } from "react-router-dom";

import { api } from "../utils/Api.js";

import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/Auth.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const history = useHistory();

  //============================ card =======================================

  const [cards, setCards] = useState([]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i[0] === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.removeCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (loggedIn) {
      api.getCards().then((result) => {
        setCards(result);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  //=========================== end card ====================================

  useEffect(() => {
    if (loggedIn) {
      api.getUserData().then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card.link);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipOpen(false);
  }

  function handleUpdateUser(name, about) {
    api.setUserData(name, about).then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((err) => console.log(err));;
  }

  function handleUpdateAvatar(link) {
    api.setAvatar(link).then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api.postNewCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
  }

  function handleInfoTooltip() {
    setInfoTooltipOpen(true);
  }

  //===================auth========================

  function handleRegister(email, password) {
    auth.register(email, password).then(
      (res) => {
        setIsRegister(true);
        handleInfoTooltip();
        history.push("/sign-in");
      },
      (err) => {
        setIsRegister(false);
        handleInfoTooltip();
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then(() => {
        setLoggedIn(true);
        history.push("/");
      },
      (err) => {
        setIsRegister(false);
        handleInfoTooltip();
      })
      .catch((err) => console.log(err));
  }

  function handleSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
    history.push("/login");
  }

  useEffect(() => {
    tokenCheck();
    //alert('вот оно!!!');
  }, []);

  function tokenCheck() {
    const token = localStorage.getItem("token");
    //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzBjNmNhZDQyMjVmZGI2MDRhNjVjYTUiLCJpYXQiOjE2NjE5MzU0MTQsImV4cCI6MTY2MjU0MDIxNH0.TK4wUpHkYR76K25Qxdl3rYL3JM810Vfcha6cnZQyoNA";
    if (token) {
      auth.getContent(token).then((res) => {

        //console.log(res.email);
        if (res) {
          setLoggedIn(true);
          setUserEmail(res.email);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
        
      });
    }
  }

  //==================end auth=====================

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header onSignOut={handleSignOut} userEmail={userEmail} />
        <Switch>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>

          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onEditAvatar={handleEditAvatarClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
        </Switch>
        {loggedIn && <Footer />}

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <InfoToolTip
          isOpen={isInfoTooltipOpen}
          isRegister={isRegister}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);

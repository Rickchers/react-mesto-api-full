import logoPath from "../images/mesto.svg";
import {Link, Switch, Route} from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={logoPath} className="header__logo" alt="логотип Mesto Russia" />
      <div className="header__menu-wrapper">
        <Switch>
          <Route exact path="/">
              <p className="header__user-email">{props.userEmail}</p>
              <Link className="header__menu-link_inactive" onClick={props.onSignOut} to="/sign-in">Выйти</Link>
          </Route>
          
          <Route path="/sign-up">
            <Link className="header__menu-link" to="/sign-in">Войти</Link>
          </Route>

          <Route path="/sign-in">
            <Link className="header__menu-link" to="/sign-up">Регистрация</Link>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;

import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import SideMenu from '../SideMenu/SideMenu';
import { Link } from 'react-router-dom';

import './Header.css';


function Header({ loggedIn, fromMainPage = false }) {
  const [ SideMenuIsOpened, setSideMenuIsOpened ] = useState(false);

  const onMenuBtnClick = () => {
    setSideMenuIsOpened(!SideMenuIsOpened);
  }


  const onCloseMenuSideMenu = () => {
    setSideMenuIsOpened(false);
  }

  return (
    <>
      <SideMenu isOpened={SideMenuIsOpened} onClose={onCloseMenuSideMenu} />
      { loggedIn ?
        (
          <header className={`header__container ${fromMainPage && 'header_bgc_blue'}`}>
            <div className="header">
                <Logo />
              <div className="header__film-container">
                  <Link to="/movies" className='header__films-btn'>Фильмы</Link>
                  <Link to="/saved-movies" className='header__saved-films-btn'>Сохраненные фильмы</Link>
              </div>
              <Link to="/profile" ><button className="header__acc-btn" type="button"/></Link>
              <button className="header__menu-btn" onClick={onMenuBtnClick} type="button" />
            </div>
          </header>
        ) :
        (
          <header className={`header header__notlog ${fromMainPage && 'header_bgc_blue'}`}>
            <Logo />
            <div className="header__entry-buttons">
              <Link to="/signup"><button className="header__sign-up" type="button">Регистрация</button></Link>
              <Link to="/signin"><button className="header__sign-in" type="button">Войти</button></Link>
            </div>
          </header>
        )
      }
    </>
  );
}

export default Header;

import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import SideMenu from '../SideMenu/SideMenu';
import { Link, useLocation, } from 'react-router-dom';

import './Header.css';


function Header({ loggedIn, fromMainPage = false }) {
  const [ SideMenuIsOpened, setSideMenuIsOpened ] = useState(false);

  const onMenuBtnClick = () => {
    setSideMenuIsOpened(!SideMenuIsOpened);
  }


  const onCloseMenuSideMenu = () => {
    setSideMenuIsOpened(false);
  }

  const { pathname } = useLocation();

  return (
    <>
      <SideMenu isOpened={SideMenuIsOpened} onClose={onCloseMenuSideMenu} />
      { loggedIn ?
        (
          <header className={`header__container ${pathname === '/' && 'header_bgc_blue'}`}>
            <div className="header">
                <Logo />
               <div className='header__navigation'>
              <div className="header__film-container">
                  <Link to="/movies" className='header__films-btn hover-link'>Фильмы</Link>
                  <Link to="/saved-movies" className='header__saved-films-btn hover-link'>Сохраненные фильмы</Link>
              </div>
              <Link to="/profile" ><button className={`header__acc-btn ${pathname === '/' && 'header__acc-btn_blue'} hover-button`} type="button"/></Link>
              </div>
              </div>
              <button className="header__menu-btn hover-button" onClick={onMenuBtnClick} type="button" />
            
          </header>
        ) :
        (
          <header className={`header header__notlog ${pathname === '/' && 'header_bgc_blue'}`}>
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

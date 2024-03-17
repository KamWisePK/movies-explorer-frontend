import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import SideMenu from '../SideMenu/SideMenu';
import { NavLink, useLocation, } from 'react-router-dom';

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
                  <NavLink to="/movies" className='header__films-btn hover-link'>Фильмы</NavLink>
                  <NavLink to="/saved-movies" className='header__saved-films-btn hover-link'>Сохраненные фильмы</NavLink>
              </div>
              <NavLink to="/profile" ><button className={`header__acc-btn ${pathname === '/' && 'header__acc-btn_blue'} hover-button`} type="button"/></NavLink>
              </div>
              </div>
              <button className="header__menu-btn hover-button" onClick={onMenuBtnClick} type="button" />
            
          </header>
        ) :
        (
          <header className={`header header__notlog ${pathname === '/' && 'header_bgc_blue'}`}>
            <Logo />
            <div className="header__entry-buttons">
              <NavLink to="/signup"><button className="header__sign-up" type="button">Регистрация</button></NavLink>
              <NavLink to="/signin"><button className="header__sign-in" type="button">Войти</button></NavLink>
            </div>
          </header>
        )
      }
    </>
  );
}

export default Header;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Header/Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';


function Header() {
  const location = useLocation();

  const [Vkl, setVkl] = useState(false);
  
  return (
    <header className={`header ${location.pathname === "/" ? 'header_bgColorBlue' : ""} ${!Vkl ? 'header_smallerPadding' : ''}`}> 
     
      <Logo />

     <Navigation navHide={Vkl}/>

     <ul className={`header__regContainer ${Vkl ? 'show' : ''}`}>
              <li className="header__regContainer-item">
                <Link to={'/signup'}className="header__regContainer-link hover-link">
                  Регистрация
                </Link>
              </li>
              <li className="header__regContainer-item">
                <Link
                  to={'/signin'}
                  className="header__regContainer-link header__regContainer-link_login hover-button"
                >
                  Войти
                </Link>
              </li>
            </ul>
     
      <button className={`header__hamburgerButton hover-button ${Vkl ? 'hide' : ''}`} ></button>
     
    </header>
  );
}

export default Header;

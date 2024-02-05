import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Header/Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';


function Header() {
  const location = useLocation();
 {/*Так как решение временное, специально выбраны кривые названия, что бы бросались в глаза*/}
  const [Vkl, setVkl] = useState(false);
  
  const DemonstrationButtonToggle = () => {
    setVkl(!Vkl);
  };

  return (
    <header className={`header ${location.pathname === "/" ? 'header_bgColor_blue' : ""} ${!Vkl ? 'header_smallerPadding' : ''}`}> 
      {/*Временное решение для переключения состояния Header пока нет регистрации */}
      <button onClick={DemonstrationButtonToggle} className='temp__HeaderChange '>
         {Vkl ? 'LogIN' : 'LogOut'}
      </button>
      <Logo />

     <Navigation navHide={Vkl}/>
     
      <div className={`header__reg_container ${Vkl ? 'show' : ''}`}>
        <Link className='header__regLink hover__link' to={'/signup'}>
          Регистрация
        </Link>
        <Link className='header__loginLink hover__button' to={'/signin'}>
          <button className='header__button'>Войти</button>
        </Link>
      </div>
      <button className={`header__hamburgerButton hover__button ${Vkl ? 'hide' : ''}`} ></button>
     
    </header>
  );
}

export default Header;

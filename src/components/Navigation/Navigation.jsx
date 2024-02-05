import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import profileImg from '../../images/acc_enter_image.svg';

function Navigation({navHide}) {


  return (
    <nav className={`navigation navigation_header ${navHide ? 'hide' : ''}`}>
      <div className='navigation__links navigation__links_header'>
        <Link className='navigation__link hover__link' to={'/movies'}>
          Фильмы
        </Link>
        <Link className='navigation__link hover__link' to={'/saved-movies'}>
          Сохранённые фильмы
        </Link>
      </div>
      <Link className='navigation__acc_container hover__link' to={'/profile'}>
        <p className='navigation__acc_text'>Аккаунт</p>
        <div className='navigation__acc_img_container'>
          <img className='navigation__acc_img' alt='Иконка входа в аккаунт' src={profileImg} />
        </div>
      </Link>
    </nav>
  );
}

export default Navigation;

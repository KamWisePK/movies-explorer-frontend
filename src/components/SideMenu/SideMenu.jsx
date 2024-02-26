import React from 'react';
import { Link } from 'react-router-dom';

import './SideMenu.css';

function SideMenu ({ isOpened, onClose }) {
  return (
    <section className='sideMenu'>
      <div className={`sideMenu__overlay ${isOpened && 'sideMenu__overlay_visible'}`}>
        <div className='sideMenu__container'>
          <button className='sideMenu__button_close hover-button' onClick={onClose} type='button' />
          <div className='sideMenu__nav_container'>
            <Link to='/' className='sideMenu__link hover-link'>
              Главная
            </Link>
            <Link to='/movies' className='sideMenu__link  hover-link'>
              Фильмы
            </Link>
            <Link to='/saved-movies' className='sideMenu__link  hover-link'>
              Сохранённые фильмы
            </Link>
          </div>
          <Link to='/profile'>
            <button className='sideMenu__button_account hover-button'></button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SideMenu;

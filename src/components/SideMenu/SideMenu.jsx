import React from 'react';
import { NavLink } from 'react-router-dom';

import './SideMenu.css';

function SideMenu ({ isOpened, onClose }) {
  return (
    <section className='sideMenu'>
      <div className={`sideMenu__overlay ${isOpened && 'sideMenu__overlay_visible'}`}>
        <div className='sideMenu__container'>
          <button className='sideMenu__button_close hover-button' onClick={onClose} type='button' />
          <div className='sideMenu__nav_container'>
            <NavLink to='/' className='sideMenu__link hover-link'>
              Главная
            </NavLink>
            <NavLink to='/movies' className='sideMenu__link  hover-link'>
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className='sideMenu__link  hover-link'>
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink to='/profile' className='sideMenu__link'>
            <button className='sideMenu__button_account hover-button'></button>
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SideMenu;

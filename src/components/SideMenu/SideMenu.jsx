import React from 'react';
import { Link } from 'react-router-dom';

import './SideMenu.css';

const SideMenu = () => {
  return (
    <section className='sideMenu'>
      <div className='sideMenu__overlay'>
        <div className='sideMenu__container'>
          <button className='sideMenu__button_close hover__button' type='button' />
          <div className='sideMenu__nav_container'>
            <Link to='/' className='sideMenu__link hover__link'>
              Главная
            </Link>
            <Link to='/movies' className='sideMenu__link  hover__link'>
              Фильмы
            </Link>
            <Link to='/saved-movies' className='sideMenu__link  hover__link'>
              Сохранённые фильмы
            </Link>
          </div>
          <Link to='/profile'>
            <button className='sideMenu__button_account hover__button'>Аккаунт</button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SideMenu;

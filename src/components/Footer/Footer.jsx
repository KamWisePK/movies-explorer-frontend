import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__text'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__wrapper'>
          <p className='footer__copyright'>© 2024</p>
          <ul className='footer__list'>
            <li className='footer__list-item'>
              <a className='footer__link ' href='https://practicum.yandex.ru/'>Яндекс.Практикум</a>
            </li>
            <li className='footer__list-item'>
              <a className='footer__link hover-link' href='https://github.com/KamWisePK'>Github</a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

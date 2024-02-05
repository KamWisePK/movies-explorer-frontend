import React from 'react';
import '../Portfolio/Portfolio.css';


function Portfolio() {
  return (
    <section className='portfolio'>
     <div className='portfolio__container'></div>
     <h2 className='portfolio__title'>Портфолио</h2>
     <nav className="portfolio__navigation">
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <a className='portfolio__link hover__link' href='https://kamwisepk.github.io/how-to-learn/' target='_blank'>
            <p className='portfolio__link_text'>Статичный сайт</p>
            <p className='portfolio__link_icon'>↗</p>
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link hover__link' href='https://kamwisepk.github.io/russian-travel/' target='_blank'>
            <p className='portfolio__link_text'>Адаптивный сайт</p>
            <p className='portfolio__link_icon'>↗</p>
          </a>
        </li>
         <li className='portfolio__item'> {/*Удалил сервер после сдачи проета, поэтому только ссылка на гитхаб =(*/}
          <a className='portfolio__link hover__link' href='https://github.com/KamWisePK/react-mesto-api-full-gha' target='_blank'>
            <p className='portfolio__link_text'>Одностраничное приложение</p> 
            <p className='portfolio__link_icon'>↗</p>
          </a>
        </li>
      </ul>
     </nav>
    </section>
  );
}

export default Portfolio;
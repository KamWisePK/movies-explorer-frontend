import React from 'react';
import '../Promo/Promo.css';
import WebPlanet from '../../../images/PromoPlanetOfWeb.svg';


function Promo() {
  return (
    <section className='promo'>
      <div className='promo__wrapper'>
       
        <div className='promo__container'>
          <h1 className='promo__header'>Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className='promo__text'>
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <a className='promo__anchor hover-link' href='#aboutProject'>Узнать больше</a>
        </div>
        <img className='promo__img' src={WebPlanet} alt='изображение земного шара из слов Web' />
      </div>
    </section>
  );
}

export default Promo;

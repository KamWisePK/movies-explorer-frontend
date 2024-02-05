import React from 'react';
import '../AboutMe/AboutMe.css';
import dev_photo from '../../../images/Developer_photo.jpeg';

function AboutMe() {
  return (
    <section className='aboutMe'>
      <div className='aboutMe__container'>
        <h2 className='aboutMe__title'>Студент</h2>
        <h3 className='aboutMe__myName'>Сергей</h3>
        <p className='aboutMe__profession'>Фронтенд-разработчик, 36 лет</p>
        <p className='aboutMe__biography'>
          Я родился и живу в Петропавловске-Камчатском, закончил РГУТиС по специальности прикладная
          информатика в сфере сервиса. Последнее место работы – заместитель директора в
          общеобразовательной школе. В число обязанностей входила поддержка сайта, занимаясь сайтом,
          понял что мне это интересно, но знаний недостаточно. Таким образом, оказался в числе
          студентов Яндекс Практикума.
        </p>
        <a className='aboutMe__link_github hover__link' href='https://github.com/KamWisePK/'>Github</a>
        <img className='aboutMe__photo' src={dev_photo} alt='Фотография разработчика данного сайта' />
      </div>
    </section>
  );
}

export default AboutMe;

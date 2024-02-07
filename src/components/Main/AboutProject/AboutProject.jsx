import React from 'react';
import '../AboutProject/AboutProject.css';

function AboutProject() {
  return (
    <section className='aboutProject'>
      <h2 className='aboutProject__title' id='aboutProject'>О проекте</h2>
      <div className='aboutProject__subtitleContainer'>
        <h3 className='aboutProject__subtitle'>Дипломный проект включал 5 этапов</h3>
        <h3 className='aboutProject__subtitle'>На выполнение диплома ушло 5 недель</h3>
        <p className='aboutProject__subtitle-text aboutProject__subtitle-text_grid-area'>
          Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
          доработки.
        </p>
        <p className='aboutProject__subtitle-text'>
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно
          защититься.
        </p>
      </div>
      <div className='aboutProject__duration-container'>
        <p className='aboutProject__duration'>1 неделя</p>
        <p className='aboutProject__duration'>4 недели</p>
        <p className='aboutProject__duration-text'>Back-end</p>
        <p className='aboutProject__duration-text'>Front-end</p>
      </div>
    </section>
  );
}

export default AboutProject;

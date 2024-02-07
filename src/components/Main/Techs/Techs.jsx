import React from 'react';
import './Techs.css';
import img_html from '../../../images/html.svg';
import img_css from '../../../images/css.svg';
import img_js from '../../../images/js.svg';
import img_react from '../../../images/react.svg';
import img_git from '../../../images/git.svg';
import img_node from '../../../images/node.svg';
import img_mongo from '../../../images/mongo.svg';

function Techs() {
  return (
    <section className='techs'>
      <h2 className='techs__title'> Технологии</h2>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном&nbsp;проекте.
      </p>
      <ul className='techs__list'>
        <li className='techs__list-item'>
          <div className='techs__list-card'>
            <div className='techs__list-cardFront'>
              <span>HTML</span>
            </div>
            <img className='techs__list-cardBack' alt='Логотип HTML' src={img_html} />
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__list-card'>
            <div className='techs__list-cardFront'>
              <span>CSS</span>
            </div>
            <img className='techs__list-cardBack' alt='Логотип CSS' src={img_css} />
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__list-card'>
            <div className='techs__list-cardFront'>
              <span>JS</span>
            </div>
            <img className='techs__list-cardBack' alt='Логотип JavaScript' src={img_js} />
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__list-card'>
            <div className='techs__list-cardFront'>
              <span>React</span>
            </div>
            <img className='techs__list-cardBack' alt='Логотип React' src={img_react} />
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__list-card'>
            <div className='techs__list-cardFront'>
              <span>Git</span>
            </div>
            <img className='techs__list-cardBack' alt='Логотип GitHub' src={img_git} />
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__list-card'>
            <div className='techs__list-cardFront'>
              <span>Express.js</span>
            </div>
            <img className='techs__list-cardBack' alt='Логотип Node.js' src={img_node} />
          </div>
        </li>
        <li className='techs__list-item'>
          <div className='techs__list-card'>
            <div className='techs__list-cardFront'>
              <span>mongoDB</span>
            </div>
            <img className='techs__list-cardBack' alt='Логотип Mongo.db' src={img_mongo} />
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Techs;

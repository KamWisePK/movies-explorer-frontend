import React from 'react';
import './Techs.css';
import img_html from '../../../images/html.png';
import img_css from '../../../images/css.png';
import img_js from '../../../images/js.png';
import img_react from '../../../images/react.png';
import img_git from '../../../images/git.png';
import img_node from '../../../images/node.png';
import img_mongo from '../../../images/mongo.png';

function Techs() {
  return (
    <section className='techs'>
      <h2 className='techs__title'> Технологии</h2>
      <h3 className='techs__subtitle'>7 технологий</h3>
      <p className='techs__text'>
        На курсе веб-разработки мы освоили технологии, которые применили в дипломном&nbsp;проекте.
      </p>
      <ul className='techs__list'>
        <li className='techs__list_item'>
          <div className='techs__list_card'>
            <div className='techs__list_card_front'>
              <span>HTML</span>
            </div>
            <img className='techs__list_card_back' alt='Логотип HTML' src={img_html} />
          </div>
        </li>
        <li className='techs__list_item'>
          <div className='techs__list_card'>
            <div className='techs__list_card_front'>
              <span>CSS</span>
            </div>
            <img className='techs__list_card_back' alt='Логотип CSS' src={img_css} />
          </div>
        </li>
        <li className='techs__list_item'>
          <div className='techs__list_card'>
            <div className='techs__list_card_front'>
              <span>JS</span>
            </div>
            <img className='techs__list_card_back' alt='Логотип JavaScript' src={img_js} />
          </div>
        </li>
        <li className='techs__list_item'>
          <div className='techs__list_card'>
            <div className='techs__list_card_front'>
              <span>React</span>
            </div>
            <img className='techs__list_card_back' alt='Логотип React' src={img_react} />
          </div>
        </li>
        <li className='techs__list_item'>
          <div className='techs__list_card'>
            <div className='techs__list_card_front'>
              <span>Git</span>
            </div>
            <img className='techs__list_card_back' alt='Логотип GitHub' src={img_git} />
          </div>
        </li>
        <li className='techs__list_item'>
          <div className='techs__list_card'>
            <div className='techs__list_card_front'>
              <span>Express.js</span>
            </div>
            <img className='techs__list_card_back' alt='Логотип Node.js' src={img_node} />
          </div>
        </li>
        <li className='techs__list_item'>
          <div className='techs__list_card'>
            <div className='techs__list_card_front'>
              <span>mongoDB</span>
            </div>
            <img className='techs__list_card_back' alt='Логотип Mongo.db' src={img_mongo} />
          </div>
        </li>
      </ul>
    </section>
  );
}

export default Techs;

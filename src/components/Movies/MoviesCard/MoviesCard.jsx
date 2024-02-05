import React, { useState } from 'react';
import './MoviesCard.css';
import CardMovie_img from '../../../images/CardMovieImg.svg';

function MoviesCard({isSavedMovies}) {
  const [liked, setLike] = useState(false);
  
  const likeMovie = () => {
    setLike(!liked);
  };

let buttonStateClass = '';
let buttonText = '';
if (isSavedMovies) {
buttonStateClass = 'movieCard__button_disLike'
buttonText = '';}
else {
  buttonStateClass = liked ? 'movieCard__button_liked' : ''
  buttonText = !liked ? 'Сохранить' :  '';
}
 
  return (
    <li className='movieCard'>
      <div className='movieCard__container'>
        <h2 className='movieCard__title'>В погоне за Бэнкси</h2>
        <p className='movieCard__duration'>0ч42м</p>
      </div>
      <img className='movieCard__img' alt='Кадр или постер к фильму' src={CardMovie_img}/>
      <button type='submit' className={`movieCard__button ${buttonStateClass} hover__button`} onClick={likeMovie}>
        {buttonText}
        </button>
    </li>
  );
}

export default MoviesCard;

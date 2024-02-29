import React, { useState } from 'react';

import './MoviesCard.css';

import { saveMovie, deleteMovie } from '../../../utils/MainApi';
import { CurrentUserContext } from '../../Context/CurrentUserContext';

function MoviesCard({
  fromSavedPage,
  country,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  nameRU,
  nameEN,
  thumbnail,
  movieId,
  savedMovies,
  cardsUpdate,
  setCardsUpdate,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  const [isSavedState, setIsSavedState] = React.useState(
    savedMovies.some((movie) => {
      return movie.movieId === movieId && movie.owner === currentUser._id;
    })
  );
  const [currentMovieId, setCurrentMovieId] = React.useState(
    savedMovies.find((movie) => {
      return movie.movieId === movieId && movie.owner === currentUser._id;
    }) || ''
  );

  const hours = Math.trunc(duration / 60);
  const minutes = duration % 60;
  const hoursString = hours > 0 ? `${hours} ч` : '';
  const minutesString = minutes > 0 ? `${minutes} мин` : '';

  const hadleRemoveBtn = () => {
    console.log(currentMovieId)
    deleteMovie(localStorage.getItem('jwt'), currentMovieId)
      .then(() => {
        setIsSavedState(false);
        setCurrentMovieId('');
        // if (cardsUpdate) {
        setCardsUpdate(cardsUpdate + 1);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSaveBtn = () => {
    if (isSavedState) {
      hadleRemoveBtn();
    } else {
      saveMovie(localStorage.getItem('jwt'), {
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailerLink: trailerLink,
        nameRU: nameRU,
        nameEN: nameEN,
        thumbnail: thumbnail,
        movieId: movieId,
      })
        .then((movie) => {
          setIsSavedState(true);
          console.log(movie);
          
          setCurrentMovieId(movie._id);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  React.useEffect(() => {
    const isSaved = savedMovies.some((movie) => {
      return movie.movieId === movieId && movie.owner === currentUser._id;
    });

    const currentMovie =
      savedMovies.find((movie) => {
        return movie.movieId === movieId && movie.owner === currentUser._id;
      }) || '';

    setIsSavedState(isSaved);
    setCurrentMovieId(currentMovie._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies]);

  return (
    <li className='movieCard'>
      <div className='movieCard__container'>
        <h2 className='movieCard__title'>{nameRU}</h2>
        <p className='movieCard__duration'>{`${hoursString} ${minutesString}`}</p>
      </div>
      <a href={trailerLink} >
        <img className='movieCard__img' alt='Кадр или постер к фильму' src={image} />
      </a>
      {
          fromSavedPage ?
            (<button
              className="movieCard__button movieCard__button_disLike hover-button"
              type="button"
              onClick={hadleRemoveBtn}
              />
            ) :
            (
              <button
                className={`movieCard__button movieCard__button_liked ${isSavedState && 'movieCard__button_disLike'} hover-button`}
                type="button"
                onClick={handleSaveBtn}
              />
            )
        }
   
    </li>
  );
}

export default MoviesCard;

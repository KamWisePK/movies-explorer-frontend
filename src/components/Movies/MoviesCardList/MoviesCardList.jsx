import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Preloader from '../../Preloader/Preloader';

function MoviesCardList({
  cards,
  savedMovies,
  isSavedFilms,
  isLoading,
  isReqError,
  isNotFound,
  handleLikeMovie,
  onDeleteMovie,
}) {
  const [shownMovies, setShownMovies] = useState(0);
  const { pathname } = useLocation();

  function getSavedMovies(savedMovies, movie) {
    return savedMovies.find((savedMovie) => savedMovie.movieId === movie.id);
  };

  function handlerResize() {
    const display = window.innerWidth;
    if (display > 1200) {
      setShownMovies(12);
    } else if (display > 900) {
      setShownMovies(9);
    } else if (display > 767) {
      setShownMovies(8);
    } else {
      setShownMovies(5);
    }
  };

  useEffect(() => {
    handlerResize();
  }, [])

  function handleMore() {
   const display = window.innerWidth;
    if (display > 1200) {
      setShownMovies(shownMovies + 4);
    } else if (display > 900) {
      setShownMovies(shownMovies + 3);
    } else if (display > 768) {
      setShownMovies(shownMovies + 2);
    } else {
      setShownMovies(shownMovies + 2);
    }
  }

  return (
    <section className="cards">
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && (<span className="cards__info">Ничего не найдено</span>)}
      {isReqError && !isLoading && (
        <span className="cards__info">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз</span>
      )}
      {!isLoading && !isReqError && !isNotFound && (
        <>
        {pathname === "/saved-movies" ? (
          <>
            <ul className="moviesCardList__list">
              {cards.map((movie) => (
                <MoviesCard
                  key={isSavedFilms ? movie._id : movie.id}
                  cards={cards}
                  movie={movie}
                  liked={getSavedMovies(savedMovies, movie)}
                  handleLikeMovie={handleLikeMovie}
                  isSavedFilms={isSavedFilms}
                  savedMovies={savedMovies}
                  onDeleteMovie={onDeleteMovie}
                />
                ))}
            </ul>
          </>
          ) : (
          <>
            <ul className="moviesCardList__list">
              {cards.slice(0, shownMovies).map((movie) => (
                <MoviesCard
                  key={isSavedFilms ? movie._id : movie.id}
                  cards={cards}
                  movie={movie}
                  liked={getSavedMovies(savedMovies, movie)}
                  handleLikeMovie={handleLikeMovie}
                  isSavedFilms={isSavedFilms}
                  savedMovies={savedMovies}
                  onDeleteMovie={onDeleteMovie}
                  />
              ))}
            </ul>
            
              {cards.length > shownMovies ? (<button className='moviesCardList__button hover-button' onClick={handleMore}>Ещё</button>) : ('')}
            
          </>
            )}
        </>
      )}
    </section>
  )
}

export default MoviesCardList;

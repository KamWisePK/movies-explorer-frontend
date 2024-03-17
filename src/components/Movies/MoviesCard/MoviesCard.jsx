import { useLocation } from "react-router-dom";

import './MoviesCard.css';


function MoviesCard({ movie, isSavedFilms, savedMovies, liked, handleLikeMovie, onDeleteMovie }) {
  const location = useLocation();

  function onDelete() {
    onDeleteMovie(movie);
  };

function handleLikeToggle() {
  if (liked) {
    onDeleteMovie(savedMovies.filter((obj) => obj.movieId === movie.id)[0]);
  } else {
    handleLikeMovie(movie);
  }
};

function getMovieDuration(mins) {
  return `${Math.floor(mins / 60)}ч ${mins % 60}м`;
};

  return (
    <li className='movieCard'>
      <div className='movieCard__container'>
        <h2 className='movieCard__title'>{movie.nameRU}</h2>
        <p className='movieCard__duration'>{getMovieDuration(movie.duration)}</p>
      </div>
      <a href={movie.trailerLink} >
        <img className='movieCard__img' alt='Кадр или постер к фильму' src={ isSavedFilms ? movie.image: `https://api.nomoreparties.co/${movie.image.url}`} />
      </a>
      {isSavedFilms && location.pathname === "/saved-movies" ? (
            <button
              className="movieCard__button movieCard__button_disLike hover-button"
              type="button"
              onClick={onDelete}
              />
            ) :
            (
              <button
                className={`movieCard__button movieCard__button_notLiked ${liked && 'movieCard__button_liked'} hover-button`}
                type="button"
                onClick={handleLikeToggle}
              />
            )
        }
   
    </li>
  );
}

export default MoviesCard;

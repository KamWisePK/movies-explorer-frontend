import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({isSavedMovies}) {
 
  return (
    <section className='moviesCardList'>
        <ul className='moviesCardList__list'>
            <MoviesCard isSavedMovies={isSavedMovies}/>
            <MoviesCard isSavedMovies={isSavedMovies}/>
            <MoviesCard isSavedMovies={isSavedMovies}/>
            <MoviesCard isSavedMovies={isSavedMovies}/>
            <MoviesCard isSavedMovies={isSavedMovies}/>
            
            
        </ul>
        {!isSavedMovies && (<button type='submit' className='moviesCardList__button hover-button'>Ещё
      </button>)}
    </section>
  );
}

export default MoviesCardList;

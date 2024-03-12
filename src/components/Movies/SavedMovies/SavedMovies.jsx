import React from 'react';

import './SavedMovies.css';

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../../Preloader/Preloader';

import { useState, useEffect } from "react";

function SavedMovies({ savedMovies, isLoading, onDeleteMovie }) {
  const [isNotFound, setIsNotFound] = useState(false);
  const [savedMoviesSearch, setsavedMoviesSearch] = useState('');
  const [filteredMovies, setFilteredMovies] = useState(savedMovies);
  const [moviesWithSelector, setmoviesWithSelector] = useState(false);

  function handleShortMoviesFilter() {
    setmoviesWithSelector(!moviesWithSelector);
  };

  function handleGetMovies(search) {
    setsavedMoviesSearch(search);
  };

  function filterDuration(movies) {
    return movies.filter((movie) => movie.duration <= 40);
  };

  function filterMovies(movies, search) {
    const moviesSearch = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userSearch = search.toLowerCase().trim();
    return (
      movieRu.indexOf(userSearch) !== -1 || movieEn.indexOf(userSearch) !== -1
    )
    })
    return moviesSearch;
  };

  useEffect(() => {
    if (filteredMovies.length === 0) {
      setIsNotFound(true);
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  useEffect(() => {
    const moviesCardsList = filterMovies(savedMovies, savedMoviesSearch);
    setFilteredMovies(
      moviesWithSelector ? filterDuration(moviesCardsList) : moviesCardsList
    )
  }, [savedMovies, moviesWithSelector, savedMoviesSearch]);
  
  return (
    <main className="movies">
      {isLoading && <Preloader />}
      <SearchForm handleGetMovies={handleGetMovies} onFilterMovies={handleShortMoviesFilter}/>
      <MoviesCardList isSavedFilms={true} savedMovies={savedMovies} onDeleteMovie={onDeleteMovie} cards={filteredMovies} isNotFound={isNotFound}/>
    </main>
  )
}

export default SavedMovies;

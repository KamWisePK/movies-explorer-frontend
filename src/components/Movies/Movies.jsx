import { useState, useEffect } from 'react';

import './Movies.css';

import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';


import moviesApi from '../../utils/MoviesApi';

import '../Hover/Hover.css';

export default function  Movies({ savedMovies, handleLikeMovie, onDeleteMovie }) {
  const [moviesWithSelector, setmoviesWithSelector] = useState(false);
  const [isReqError, setisReqError] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialCardsMovies, setInitialCardsMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);

  
  function filterDuration(movies) {
    return movies.filter((movie) => movie.duration <= 40);
  };
  
  function handleShortMoviesFilter() {
    setmoviesWithSelector(!moviesWithSelector);
    if (!moviesWithSelector) {
      if (filterDuration(initialCardsMovies).length === 0) {
        setFilteredMovies(filterDuration(initialCardsMovies));
      } else {
        setFilteredMovies(filterDuration(initialCardsMovies));
      }
    } else {
      setFilteredMovies(initialCardsMovies);
    }
    localStorage.setItem("moviesSelector", !moviesWithSelector);
  };

  function filterMovies(movies, query) {
    const moviesQuery = movies.filter((movie) => {
      const movieRu = String(movie.nameRU).toLowerCase().trim();
      const movieEn = String(movie.nameEN).toLowerCase().trim();
      const userQuery = query.toLowerCase().trim();
    return (
      movieRu.indexOf(userQuery) !== -1 || movieEn.indexOf(userQuery) !== -1
    )
    })
    return moviesQuery;
  };

  function updateFilteredMoviesList(movies, query, short) {
    const moviesCardsList = filterMovies(movies, query, short);
    setInitialCardsMovies(moviesCardsList);
    setFilteredMovies(short ? filterDuration(moviesCardsList) : moviesCardsList);
    localStorage.setItem("movies", JSON.stringify(moviesCardsList));
    localStorage.setItem("allMovies", JSON.stringify(movies));
  };

  useEffect(() => {
    if (localStorage.getItem("moviesSelector") === "true") {
      setmoviesWithSelector(true);
    } else {
      setmoviesWithSelector(false);
    }
  }, []);

  function handleGetMovies(query) {
    localStorage.setItem("moviesInputSearch", query);
    localStorage.setItem("moviesSelector", moviesWithSelector);

    if (localStorage.getItem("allMovies")) {
      const movies = JSON.parse(localStorage.getItem("allMovies"));
      updateFilteredMoviesList(movies, query, moviesWithSelector);
    } else {
      setIsLoading(true);
      moviesApi.getMovies()
        .then((movieContent) => {
          updateFilteredMoviesList(movieContent, query, moviesWithSelector);
          setisReqError(false);
        })
        .catch((err) => {
          setisReqError(true);
          console.log(`Ошибка при поиске фильмов ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        })
    }
  };

  useEffect(() => {
    if (localStorage.getItem("moviesInputSearch")) {
      if (filteredMovies.length === 0) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
      }
    } else {
      setIsNotFound(false);
    }
  }, [filteredMovies]);

  useEffect(() => {
    if (localStorage.getItem("movies")) {
      const movies = JSON.parse(localStorage.getItem("movies"));
      setInitialCardsMovies(movies);
      if (localStorage.getItem("moviesSelector") === "true") {
        setFilteredMovies(filterDuration(movies));
      } else {
        setFilteredMovies(movies);
      }
    }
  }, []);

  return (
    <main className="movies">
      <SearchForm handleGetMovies={handleGetMovies} moviesWithSelector={moviesWithSelector} onFilterMovies={handleShortMoviesFilter}/>
      <MoviesCardList cards={filteredMovies} isReqError={isReqError} isNotFound={isNotFound} isLoading={isLoading} isSavedFilms={false} savedMovies={savedMovies} handleLikeMovie={handleLikeMovie} onDeleteMovie={onDeleteMovie}/>
    </main>
  )
}



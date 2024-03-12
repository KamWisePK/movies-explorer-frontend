import { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

import './SearchForm.css';

export default function SearchForm({ handleGetMovies, moviesWithSelector, onFilterMovies }) {
  const [inputSearch, setInputSearch] = useState('');
  const [textError, setTextError] = useState(false);
  const { pathname } = useLocation();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (inputSearch.trim().length === 0) {
      setTextError(true);
    } else {
      setTextError(false);
      handleGetMovies(inputSearch);
    }
  }

  function handleInputChange(evt) {
    setInputSearch(evt.target.value);
  }

  useEffect(() => {
    if (
      pathname === "/movies" &&
      localStorage.getItem("moviesInputSearch")
    ) {
      const localQuery = localStorage.getItem("moviesInputSearch");
      setInputSearch(localQuery);
    }
  }, [pathname])


  return (
    <section className='searchForm'>
      <form className='searchForm__form' onSubmit={handleSubmit}>
        <label className='searchForm__label' htmlFor='searchFormInput'></label>
        <input
          className='searchForm__input'
          id='searchFormInput'
          type='text'
          placeholder='Фильм'
          value={inputSearch || ""} onChange={handleInputChange}
        ></input>
        <button type='submit' className='searchForm__button hover-button'>
          Поиск
        </button>
        <label className='filterCheckbox' for='ShortMovies'>
      <input
        className='filterCheckbox__input'
        type='checkbox'
        id='ShortMovies'
        checked={moviesWithSelector} onChange={onFilterMovies}
      />
      <span className='filterCheckbox__inner'>Короткометражки</span>
    </label>
        {textError && (<div className="search-form__error">Нужно ввести ключевое слово</div>)}
      
        
      </form>
    </section>
  );
}



import React from 'react';
import FilterCheckbox from '../../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm() {
  return (
    <section className='searchForm'>
      <form className='searchForm__form'>
        <label className='searchForm__label' htmlFor='searchFormInput'></label>
        <input
          className='searchForm__input'
          id='searchFormInput'
          type='text'
          placeholder='Фильм'
          required
        ></input>
        <button type='submit' className='searchForm__button hover-button' >
          Поиск
        </button>
        <FilterCheckbox />
      </form>
    </section>
  );
}

export default SearchForm;

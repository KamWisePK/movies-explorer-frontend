import React from 'react';
import FilterCheckbox from '../../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

function SearchForm({ request, setRequest, onSubmit, shorts, setShorts }) {
  const [error, setError] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (request === '') {
      setError('Нужно ввести ключевое слово');
    } else {
      onSubmit();
    }
  };

  const handleRequestChange = (event) => {
    const { value } = event.target;

    setRequest(value);

    if (String(value).length !== 0) {
      setError('');
    }
  };

  return (
    <section className='searchForm'>
      <form className='searchForm__form' onSubmit={handleSubmit}>
        <label className='searchForm__label' htmlFor='searchFormInput'></label>
        <input
          className='searchForm__input'
          id='searchFormInput'
          type='text'
          placeholder='Фильм'
          value={request || ''}
          onChange={handleRequestChange}
        ></input>
        <button type='submit' className='searchForm__button hover-button'>
          Поиск
        </button>
        {
        error &&
        <span className='search-form__error'>{error}</span>
      }
        <FilterCheckbox shorts={shorts} setShorts={setShorts} />
      </form>
    </section>
  );
}

export default SearchForm;

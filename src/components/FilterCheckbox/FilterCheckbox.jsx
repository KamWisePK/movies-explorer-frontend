import React from 'react';

import './FilterCheckbox.css';

function FilterCheckbox({ shorts, setShorts }) {
  const handleChange = () => {
    setShorts(!shorts);
  };

  return (
    <label className='filterCheckbox' for='ShortMovies'>
      <input
        className='filterCheckbox__input'
        type='checkbox'
        id='ShortMovies'
        checked={shorts}
        onChange={handleChange}
      />
      <span className='filterCheckbox__inner'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;

import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <label className='filterCheckbox' for='ShortMovies'>
      <input className='filterCheckbox__input' type='checkbox' id='ShortMovies' />
      <span className='filterCheckbox__inner'>Короткометражки</span>
    </label>
  );
}

export default FilterCheckbox;

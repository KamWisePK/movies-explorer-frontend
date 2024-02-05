import './Movies.css';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';

import '../Hover/Hover.css';

function Movies() {
  return (
    <section className='movies'>
      <SearchForm />
      <MoviesCardList isSavedMovies={false}/>
     
    </section>
  );
}

export default Movies;

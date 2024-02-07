import React from 'react';

import { Route, Routes, useLocation } from 'react-router-dom';

import './App.css';

import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Profile from '../Profile/Profile';
import ErrorPage from '../ErrorPage/ErrorPage';
import SideMenu from '../SideMenu/SideMenu';


function App() {
  const { pathname } = useLocation();
  const pathsWithHeader = ['/', '/movies', '/saved-movies', '/profile'].includes(pathname);
  const pathsWithFooter = ['/', '/movies', '/saved-movies'].includes(pathname);
  return (
    <div className='app'>
      {pathsWithHeader && <Header />}
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/*' element={<ErrorPage />} />
        <Route path='/sideMenu' element={<SideMenu />} /> {/* пока Разместил боковое меню на отдельном роуте для проверки верстки, на последнем этапе после реализации регистрации буду приводить в человеческий вид  */}
      </Routes>
      {pathsWithFooter && <Footer />}

      
    </div>
  );
}

export default App;

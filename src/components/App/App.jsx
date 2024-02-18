import React from 'react';
import { Route, Routes, useNavigate, Navigate, useLocation } from 'react-router-dom';

import { CurrentUserContext } from '../Context/CurrentUserContext';

import { register, authorize, getUserInfo, updateUserInfo } from '../../utils/MainApi';

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

function App() {
  const { pathname } = useLocation();
  
  const pathsWithFooter = ['/', '/movies', '/saved-movies'].includes(pathname);

  const [currentUser, setCurrentUser] = React.useState({});

  const [loggedIn, setLoggedIn] = React.useState(localStorage.getItem('loggedIn') === 'true');

  const [registerError, setRegisterError] = React.useState('');
  const [loginError, setLoginError] = React.useState('');
  const [updateUserError, setUpdateUserError] = React.useState('');
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const [firstSubmit, setFirstSubmit] = React.useState(true);

  const navigate = useNavigate();

  function handleRegister({ email, name, password }) {
    register(email, password, name)
      .then(() => {
     
        handleLogin({ email, password });
        navigate('/movies');
      })
      .catch((error) => {
        setRegisterError(error);
        console.log(error);
      });
  }

  function handleLogin({ email, password }) {
    console.log('123')
    authorize(email, password)
      .then((data) => {
        if (!data) throw new Error('Неверные имя пользователя или пароль');
        console.log(data)
       
          setLoggedIn(true);
          
          localStorage.setItem('jwt', data.token);
          
          navigate('/movies');
        
      })
      .catch((error) => {
        setLoginError(error);
        console.log(error);
        console.log('sdsdsdsd');
      });
  }

  function handleProfileUpdate(userData) {
    if (userData.name === currentUser.name && userData.email === currentUser.email) {
      setUpdateSuccess(false);
      setUpdateUserError('Введите другое имя или email');
    } else {
      setUpdateUserError('');
      updateUserInfo(localStorage.getItem('jwt'), userData)
        .then((data) => {
          setCurrentUser(data);
          setUpdateSuccess(true);
        })
        .catch((error) => {
          setUpdateSuccess(false);
          setUpdateUserError(error);
          console.log(error);
        });
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('shorts');
    localStorage.removeItem('cards');
    localStorage.removeItem('request');
    localStorage.removeItem('fCards');
    localStorage.removeItem('loggedIn');
    setLoggedIn(false);
    setCurrentUser({});
    setFirstSubmit(true);
    navigate('/');
  };

  React.useEffect(() => {
    if (loggedIn) {
      getUserInfo(localStorage.getItem('jwt'))
        .then((data) => {
          setCurrentUser(data);
          setLoggedIn(true);
          localStorage.setItem('loggedIn', loggedIn);
        })
        .catch(() => {
          handleLogout();
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);

  React.useEffect(() => {
    if (localStorage.getItem('jwt')) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} fromMainPage={true} />} />
          {loggedIn ? (
            <Route
              path='/movies'
              element={
                <Movies
                  loggedIn={loggedIn}
                  firstSubmit={firstSubmit}
                  setFirstSubmit={setFirstSubmit}
                />
              }
            />
          ) : (
            <Route path='movies' element={<Navigate to='/' replace />} />
          )}
          {loggedIn ? (
            <Route path='/saved-movies' element={<SavedMovies loggedIn={loggedIn} />} />
          ) : (
            <Route path='/saved-movies' element={<Navigate to='/' replace />} />
          )}
          {!loggedIn ? (
            <Route
              path='/signin'
              element={<Login onLogin={handleLogin} loginError={loginError} />}
            />
          ) : (
            <Route path='/signin' element={<Navigate to='/' replace />} />
          )}
          {!loggedIn ? (
            <Route
              path='/signup'
              element={<Register onRegister={handleRegister} registerError={registerError} />}
            />
          ) : (
            <Route path='/signup' element={<Navigate to='/' replace />} />
          )}
          {loggedIn ? (
            <Route
              path='/profile'
              element={
                <Profile
                  onLogout={handleLogout}
                  onProfileUpdate={handleProfileUpdate}
                  updateUserError={updateUserError}
                  updateSuccess={updateSuccess}
                />
              }
            />
          ) : (
            <Route path='/profile' element={<Navigate to='/' replace />} />
          )}
          <Route path='/*' element={<ErrorPage />} />
        </Routes>
        {pathsWithFooter && <Footer />}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

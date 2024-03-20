import { useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Footer from '../Footer/Footer';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ErrorPage from '../ErrorPage/ErrorPage';

import mainApi from '../../utils/MainApi';

import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [profileUpdateInfo, setProfileUpdateInfo] = useState('');

  const [savedMovies, setSavedMovies] = useState([]);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .uploadUserContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem('allMovies');
            setIsLoggedIn(true);
          }
          navigate(pathname);
        })
        .catch((err) => {
          console.log(`Ошибка сервера ${err}`);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInfo()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(`Ошибка сервера ${err}`);
        });
      mainApi
        .getMovies()
        .then((movieContent) => {
          setSavedMovies(movieContent.reverse());
        })
        .catch((err) => {
          console.log(`Ошибка сервера ${err}`);
        });
    }
  }, [isLoggedIn]);

  function handleUpdateUser(newUserInfo) {
    setIsLoading(true);
    mainApi
      .updateUserInfo(newUserInfo)
      .then((data) => {
        setProfileUpdateInfo("Данные успешно изменены")
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
        setProfileUpdateInfo("Email занят другим пользователем")
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAuthorization(data) {
    mainApi
      .login(data)
      .then((res) => {
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        console.log('errorApp.js');
      });
  }

  function handleRegistration(data) {
    mainApi
      .register(data)
      .then(() => {
        console.log('errorApp.js');
        handleAuthorization(data);
      })
      .catch((err) => {
        console.log('errorApp.js');
      });
  }

  function handleAddLike(movie) {
    mainApi
      .addMovies(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log('errorApp.js');
      });
  }

  function handleDeleteLike(movie) {
    mainApi
      .deleteMovies(movie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== movie._id));
      })
      .catch((err) => {
        console.log('errorApp.js');
      });
  }

  function onSignOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    localStorage.removeItem('movies');
    localStorage.removeItem('moviesInputSearch');
    localStorage.removeItem('moviesSelector');
    localStorage.removeItem('allMovies');
    localStorage.clear();
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='app'>
        {pathname === '/' ||
        pathname === '/movies' ||
        pathname === '/saved-movies' ||
        pathname === '/profile' ? (
          <Header loggedIn={isLoggedIn} isLoading={isLoading} />
        ) : (
          ''
        )}
        <Routes>
          <Route
            exact
            path='/'
            element={
              <>
                <Main />
              </>
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                component={Movies}
                handleLikeMovie={handleAddLike}
                onDeleteMovie={handleDeleteLike}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                component={SavedMovies}
                onDeleteMovie={handleDeleteLike}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                loggedIn={isLoggedIn}
                component={Profile}
                isLoading={isLoading}
                onUpdateUser={handleUpdateUser}
                onSignOut={onSignOut}
                profileUpdateInfo={profileUpdateInfo}
                setProfileUpdateInfo={setProfileUpdateInfo}
              />
            }
          />
          <Route path='/signup' element={isLoggedIn ? (<Navigate to='/' />) : (<Register onRegister={handleRegistration} />)} />
          <Route
            path='/signin'
            element={isLoggedIn ? (<Navigate to='/' />) : (<Login onLogin={handleAuthorization} />)}
          />
          <Route
            path='*'
            element={
              <>
                <ErrorPage />
              </>
            }
          />
        </Routes>
        {pathname === '/' || pathname === '/movies' || pathname === '/saved-movies' ? (
          <Footer />
        ) : (
          ''
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

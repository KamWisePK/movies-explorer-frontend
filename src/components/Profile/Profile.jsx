import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState, useCallback } from 'react';

import './Profile.css';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Profile({ onUpdateUser, onSignOut, profileUpdateInfo,setProfileUpdateInfo }) {
  const currentUser = useContext(CurrentUserContext);
  const [userData, setUserData] = useState({
    email: '',
    name: '',
  });

  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Email не может быть пустым');

  const [formValid, setFormValid] = useState(false);

  const [isEditing, setEditing] = useState(false);

  const [sameValues, setSameValues] = useState('');

  const resetUserData = useCallback(
    (newUserData = {}, newNameError = false, newEmailError = false) => {
      setUserData(newUserData);
      setNameError(newNameError)
      setEmailError(newEmailError)
    },
    [setUserData,setNameError,setEmailError]
  );

  useEffect(() => {
    if (currentUser) {
      resetUserData(currentUser);
    }
  }, [currentUser, resetUserData]);

  useEffect(() => {
    if (currentUser.name === userData.name && currentUser.email === userData.email) {
      setSameValues(
        'Для подтверждения изменения данных, хотя бы одно из значений должно отличаться от текущих'
      );
      setFormValid(false);
    } else if (nameError || emailError) {
      setSameValues('');
      setFormValid(false);
    } else {
      setSameValues('');
      setFormValid(true);
    }
  }, [nameError, emailError, sameValues, currentUser, userData]);



  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
    }
  };

  function editFormClick() {
    setEditing(!isEditing);
  }

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setUserData({
      ...userData,
      [name]: value,
    });

    switch (name) {
      case 'email':
        const reEmail =
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (String(value).length === 0) {
          setEmailError('Email не может быть пустым');
        } else if (!value.match(reEmail)) {
          setEmailError('Необходимо указать e-mail в формате name@domain.zone');
        } else {
          setEmailError('');
        }
        break;
      case 'name':
        const reName = /^[a-яёa-z -]{2,30}$/i;
        if (String(value).length === 0) {
          setNameError('Имя не может быть пустым');
        } else if (String(value).length === 1) {
          setNameError('Имя должно быть не короче 2 символов');
        } else if (!value.match(reName)) {
          setNameError('Имя должно содержать только латиницу, кириллицу, пробел и дефис');
        } else {
          setNameError('');
        }
        break;
    }
  };
  

  

const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(userData);
    setTimeout(() => (setProfileUpdateInfo('')), 2000);
        
  };



  
  // const handleSubmit = (evt) => {
  //   evt.preventDefault();
  //   let spanElement = document.getElementById('profile__userChangeConfirmation');
  //   onUpdateUser(userData);
  //   console.log(profileUpdateInfo);
  //   spanElement.textContent = profileUpdateInfo;
  //   console.log(profileUpdateInfo);
  //   setTimeout(() => (spanElement.textContent = ''), 2000);
  // };



  
  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
      <form className='profile__form' onSubmit={handleSubmit}>
        <fieldset className='profile__container'>
          <label className='profile__label' for='name'>
            Имя
          </label>
          <input
            required
            value={isEditing ? userData.name : currentUser.name}
            onChange={handleChange}
            onBlur={blurHandler}
            name='name'
            className={`profile__input ${isEditing ? 'profile__input_yellow' : ''}`}
            type='text'
            id='name'
            disabled={!isEditing}
          />
        </fieldset>

        <fieldset className='profile__container'>
          <label className='profile__label' for='email'>
            E-mail
          </label>
          <input
            required
            value={isEditing ? userData.email : currentUser.email}
            onChange={handleChange}
            onBlur={blurHandler}
            name='email'
            className={`profile__input ${isEditing ? 'profile__input_yellow' : ''}`}
            type='email'
            id='email'
            disabled={!isEditing}
          />
        </fieldset>
        {nameDirty && nameError && <span className='profile__error'>{nameError}</span>}
        {emailDirty && emailError && <span className='profile__error'>{emailError}</span>}
        {isEditing && sameValues && <span className='profile__error'>{sameValues}</span>}
        <button
        id='submitButton'
          disabled={!formValid}
          onClick={editFormClick}
          className={`profile__submitButton hover-button ${!isEditing ? 'hidden' : ''}`}
        >
          Сохранить
        </button>
      </form>
      {!isEditing && <span id='profile__userChangeConfirmation' className='profile__userChangeConfirmation'>{profileUpdateInfo}</span>}
      <div className={`profile__buttons-container ${isEditing ? 'hidden' : ''}`}>
        <button onClick={editFormClick} className='profile__editButton hover-button'>
          Редактировать
        </button>
        <NavLink to='/'>
          <button onClick={() => onSignOut()} className='profile__exitButton hover-button'>
            Выйти из аккаунта
          </button>
        </NavLink>
      </div>
    </section>
  );
}

export default Profile;

import React from 'react';
import { useState, useEffect,useContext } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

import Header from '../Header/Header';

import { CurrentUserContext } from '../Context/CurrentUserContext';

function Profile({ onLogout, onProfileUpdate, updateUserError, updateSuccess }) {
  const currentUser = useContext(CurrentUserContext);

  const [userData, setUserData] = useState({
    name: currentUser.name,
    email: currentUser.email,
  });

  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      emailError ||
      nameError ||
      (currentUser.name === userData.name && currentUser.email === userData.email)
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, nameError, currentUser.name, currentUser.email, userData.name, userData.email]);

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
          setEmailError('Некорректный email');
        } else {
          setEmailError('');
        }
        break;
      case 'name':
        const reName = /^[a-яёa-z -]{2,30}$/i;
        if (String(value).length === 0) {
          setNameError('Имя не может быть пустым');
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

    onProfileUpdate(userData);
  };

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

  return (
    <>
    <Header
    loggedIn={true}
  />
    <section className='profile'>
       
      <h1 className='profile__title'>{`Привет, ${currentUser.name}!`}</h1>
      <form className='profile__form' onSubmit={handleSubmit}>
        <fieldset className='profile__container'>
          <label className='profile__label' for='name'>
            Имя
          </label>
          <input
            required
            value={userData.name}
            onChange={handleChange}
            onBlur={blurHandler}
            name='name'
            className='profile__input'
            type='text'
            id='name'
            placeholder='Введите ваше имя'
          ></input>
        </fieldset>
        {nameDirty && nameError && <span className='profile__error'>{nameError}</span>}
        <fieldset className='profile__container'>
          <label className='profile__label' for='email'>
            E-mail
          </label>
          <input
            required
            value={userData.email}
            onChange={handleChange}
            onBlur={blurHandler}
            name='email'
            className='profile__input'
            type='email'
            id='email'
            placeholder='Введите ваш E-mail'
          ></input>
        </fieldset>
        {emailDirty && emailError && <span className='profile__error'>{emailError}</span>}
        {updateUserError && <span className='profile__error'>{updateUserError}</span>}
        {updateSuccess && <span>Информация о пользователе успешно обновлена</span>}

        <button
          disabled={!formValid}
          className='profile__editButton hover-button'
        >
          Редактировать
        </button>
      </form>
      <button onClick={onLogout} className='profile__exitButton hover-button'>Выйти из аккаунта</button>
    </section>
    </>
  );
}

export default Profile;

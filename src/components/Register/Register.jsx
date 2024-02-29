import React from 'react';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);

  const [nameError, setNameError] = useState('Имя не может быть пустым');
  const [emailError, setEmailError] = useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = useState('Пароль не может быть пустым');

  const [formValid, setFormValid] = useState(false);

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
        } else if (String(value).length === 1) {
          setNameError('Имя должно быть не короче 2 символов');
        } else if (!value.match(reName)) {
          setNameError('Имя должно содержать только латиницу, кириллицу, пробел и дефис');
        } else {
          setNameError('');
        }
        break;
      case 'password':
        if (String(value).length === 0) {
          setPasswordError('Пароль не может быть пустым');
        } else {
          setPasswordError('');
        }
        break;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(userData);
  };

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'name':
        setNameDirty(true);
        break;
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  useEffect(() => {
    if (nameError || emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError, passwordError]);

  return (
    <section className='register'>
      <Logo />
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register__form' onSubmit={handleSubmit}>
        <fieldset className='register__container'>
          <label className='register__label' htmlFor='name'>
            Имя
          </label>
          <input
            required
            value={userData.name}
            onChange={handleChange}
            onBlur={blurHandler}
            name='name'
            className='register__input'
            type='text'
            id='name'
            placeholder='Введите ваше имя'
          ></input>
        </fieldset>
        {nameDirty && nameError && <span className='register__error'>{nameError}</span>}
        <fieldset className='register__container'>
          <label className='register__label' htmlFor='email'>
            E-mail
          </label>
          <input
            required
            value={userData.email}
            onChange={handleChange}
            onBlur={blurHandler}
            name='email'
            className='register__input'
            type='email'
            id='email'
            placeholder='Введите ваш E-mail'
          ></input>
        </fieldset>
        {emailDirty && emailError && <span className='register__error'>{emailError}</span>}
        <fieldset className='register__container'>
          <label className='register__label' htmlFor='password'>
            Пароль
          </label>
          <input
            required
            value={userData.password}
            onChange={handleChange}
            onBlur={blurHandler}
            name='password'
            className='register__input'
            type='password'
            id='password'
            placeholder='Введите ваш пароль'
          ></input>
        </fieldset>
        {passwordDirty && passwordError && <span className='register__error'>{passwordError}</span>}
        <button disabled={!formValid} className='register__submitButton hover-button'>
          Зарегистрироваться
        </button>
      </form>
      <p className='register__text'>
        Уже зарегистрированы?&nbsp;
        <Link className='register__link' to='/signin'>
          Войти
        </Link>
      </p>
    </section>
  );
}

export default Register;

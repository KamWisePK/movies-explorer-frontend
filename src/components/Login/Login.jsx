import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../Logo/Logo';

import './Login.css';

function Login({ onLogin, loginError }) {
  const [userData, setUserData] = React.useState({
    email: '',
    password: '',
  });

  const [emailDirty, setEmailDirty] = React.useState(false);
  const [passwordDirty, setPasswordDirty] = React.useState(false);

  const [emailError, setEmailError] = React.useState('Email не может быть пустым');
  const [passwordError, setPasswordError] = React.useState('Пароль не может быть пустым');

  const [formValid, setFormValid] = React.useState(false);

  React.useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [emailError, passwordError]);

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
   // evt.preventDefault();
console.log(true)
    onLogin(userData);
  };

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
      case 'password':
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <section className='login'>
      <Logo />
      <h1 className='login__title'>Рады видеть!</h1>
      <form className='login__form' onSubmit={handleSubmit}>
        <fieldset className='login__container'>
          <label className='login__label' for='email'>
            E-mail
          </label>
          <input
            required
            value={userData.email}
            onChange={handleChange}
            onBlur={blurHandler}
            name='email'
            className='login__input'
            type='email'
            id='email'
            placeholder='Введите ваш E-mail'
          ></input>
        </fieldset>
        {emailDirty && emailError && <span className='login__error'>{emailError}</span>}
        <fieldset className='login__container'>
          <label className='login__label' for='password'>
            Пароль
          </label>
          <input
            required
            value={userData.password}
            onChange={handleChange}
            onBlur={blurHandler}
            name='password'
            className='login__input'
            type='password'
            id='password'
            placeholder='Введите ваш пароль'
          ></input>
        </fieldset>
        {passwordDirty && passwordError && <span className='login__error'>{passwordError}</span>}
        <input type='submit' disabled={!formValid} className='login__submitButton hover-button' value='Войти' />
          
        
      </form>
      <p className='login__text'>
        Еще не зарегистрированы?&nbsp;
        <Link className='login__link' to='/signup'>
          Регистрация
        </Link>
      </p>
    </section>
  );
}

export default Login;

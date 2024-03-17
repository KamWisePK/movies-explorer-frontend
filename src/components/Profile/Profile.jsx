import { NavLink } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

import './Profile.css';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Profile({ onUpdateUser, onSignOut }) {
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
        } else if (value === currentUser.email) {
          setEmailError('Новый E-mail должен отличаться от текущего');
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
        } else if (value === currentUser.name) {
          setNameError('Новое имя должно отличаться от текущего');
        } else {
          setNameError('');
        }
        break;
    }
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onUpdateUser(userData);
    let spanElement = document.getElementById('profile__userChangeConfirmation');
    spanElement.textContent = 'Данные успешно изменены';
    setTimeout(() => (spanElement.textContent = ''), 2000);
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

  useEffect(() => {
    if (nameError || emailError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [nameError, emailError]);

  const isValueSameAsWas =
    !formValid || (currentUser.name === userData.name && currentUser.email === userData.email);

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
            value={userData.name}
            onChange={handleChange}
            onBlur={blurHandler}
            name='name'
            className={`profile__input ${isEditing ? 'profile__input_yellow' : ''}`}
            type='text'
            id='name'
            placeholder={isEditing ? 'Введите новое имя' : currentUser.name}
            disabled={!isEditing}
          ></input>
        </fieldset>

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
            className={`profile__input ${isEditing ? 'profile__input_yellow' : ''}`}
            type='email'
            id='email'
            placeholder={isEditing ? 'Введите новый E-mail' : currentUser.email}
            disabled={!isEditing}
          ></input>
        </fieldset>
        {nameDirty && nameError && <span className='profile__error'>{nameError}</span>}
        {emailDirty && emailError && <span className='profile__error'>{emailError}</span>}

        <button
          disabled={isValueSameAsWas}
          onClick={editFormClick}
          className={`profile__submitButton hover-button ${!isEditing ? 'hidden' : ''}`}
        >
          Сохранить
        </button>
      </form>
      <span id='profile__userChangeConfirmation' className='profile__userChangeConfirmation'></span>

      <button
        onClick={editFormClick}
        className={`profile__cancelEditionButton hover-button ${!isEditing ? 'hidden' : ''}`}
      >
        Отменить редактирование
      </button>
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

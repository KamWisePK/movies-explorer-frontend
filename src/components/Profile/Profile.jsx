import { NavLink } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import useForm from '../../utils/useForm';

import './Profile.css';

import  CurrentUserContext  from '../contexts/CurrentUserContext';

function Profile({ onUpdateUser, onSignOut  }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, isValid, resetForm } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();

    onUpdateUser({
      name: values.name,
      email: values.email,
    });
  };

  useEffect(() => {
    currentUser ? resetForm(currentUser) : resetForm();
  }, [currentUser, resetForm]);

  const isValueSameAsWas = (!isValid || (currentUser.name === values.name && currentUser.email === values.email));

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
            value={values.name || ''} 
            onChange={handleChange}
            name='name'
            className='profile__input'
            type='text'
            id='name'
            placeholder='Введите ваше имя'
          ></input>
        </fieldset>
        
        <fieldset className='profile__container'>
          <label className='profile__label' for='email'>
            E-mail
          </label>
          <input
            required
            value={values.email || ''} 
            onChange={handleChange}
            name='email'
            className='profile__input'
            type='email'
            id='email'
            placeholder='Введите ваш E-mail'
          ></input>
        </fieldset>
        
        <button
          disabled={isValueSameAsWas}
          className='profile__editButton hover-button'
        >
          Редактировать
        </button>
      </form>
      <NavLink to="/"><button onClick={() => onSignOut()} className='profile__exitButton hover-button'>Выйти из аккаунта</button></NavLink>
    </section>
    
  );
}

export default Profile;

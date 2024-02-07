import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          value.length < validations[validation]
            ? setMinLengthError(true)
            : setMinLengthError(false);
          break;
        case 'isEmpty':
          value ? setEmpty(false) : setEmpty(true);
          break;
        case 'isEmail':
          const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          email.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty || minLengthError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, minLengthError]);

  return {
    isEmpty,
    minLengthError,
    inputValid,
    emailError,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};

function Profile() {
  const name = useInput('', { isEmpty: true, minLength: 3 });
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className='profile'>
      <h1 className='profile__title'>Привет, Виталий!</h1>
      <form className='profile__form' onSubmit={handleSubmit} noValidate>
        <fieldset className='profile__container'>
          <label className='profile__label' for='name'>
            Имя
          </label>
          <input
            onChange={(e) => name.onChange(e)}
            onBlur={(e) => name.onBlur(e)}
            value={name.value}
            name='name'
            className='profile__input'
            type='text'
            id='name'
            placeholder='Введите ваше имя'
          ></input>
        </fieldset>
        <span className='profile__error'>
          {name.isDirty && name.isEmpty && 'Заполните это поле'}
          {name.isDirty &&
            !name.isEmpty &&
            name.minLengthError &&
            'Имя не может быть короче 3 символов'}{' '}
          &nbsp;
        </span>
        <fieldset className='profile__container'>
          <label className='profile__label' for='email'>
            E-mail
          </label>
          <input
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
            value={email.value}
            name='email'
            className='profile__input'
            type='email'
            id='email'
            placeholder='Введите ваш E-mail'
          ></input>
        </fieldset>
        <span className='profile__error'>
          {email.isDirty && email.isEmpty && 'Заполните это поле'}
          {email.isDirty &&
            !email.isEmpty &&
            email.minLengthError &&
            'E-mail не может быть короче 3 символов'}
          {email.isDirty && !email.isEmpty && email.emailError && 'Неккоректный E-mail'} &nbsp;
        </span>

        <button
          disabled={!name.inputValid || !email.inputValid}
          className='profile__editButton hover-button'
        >
          Редактировать
        </button>
      </form>
      <button className='profile__exitButton hover-button'>Выйти из аккаунта</button>
    </section>
  );
}

export default Profile;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

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
            const email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            email.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
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
    emailError
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

function Register() {
  
  const name = useInput('', { isEmpty: true, minLength: 3 });
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 5 });

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className='register'>
      <Logo />
      <h1 className='register__title'>Добро пожаловать!</h1>
      <form className='register__form' onSubmit={handleSubmit} noValidate>
        <fieldset className='register__container'>
          <label className='register__label' for='name'>
            Имя
          </label>
          <input
            onChange={(e) => name.onChange(e)}
            onBlur={(e) => name.onBlur(e)}
            value={name.value}
            name='name'
            className='register__input'
            type='text'
            id='name'
            placeholder='Введите ваше имя'
          ></input>
        </fieldset>
        <span className='register__error'>
          {name.isDirty && name.isEmpty && 'Заполните это поле'}
          {name.isDirty &&
            !name.isEmpty &&
            name.minLengthError &&
            'Имя не может быть короче 3 символов'} &nbsp;
        </span>
        <fieldset className='register__container'>
          <label className='register__label' for='email'>
            E-mail
          </label>
          <input
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
            value={email.value}
            name='email'
            className='register__input'
            type='email'
            id='email'
            placeholder='Введите ваш E-mail'
          ></input>
        </fieldset>
        <span className='register__error'>
          {email.isDirty && email.isEmpty && 'Заполните это поле'}
          {email.isDirty &&
            !email.isEmpty &&
            email.minLengthError &&
            'E-mail не может быть короче 3 символов'}
            {email.isDirty && !email.isEmpty && email.emailError && 'Неккоректный E-mail'} &nbsp;
        </span>
        <fieldset className='register__container'>
          <label className='register__label' for='password'>
            Пароль
          </label>
          <input
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
            value={password.value}
            name='password'
            className='register__input'
            type='password'
            id='password'
            placeholder='Введите ваш пароль'
          ></input>
        </fieldset>
        <span className='register__error'>
          {password.isDirty && password.isEmpty && 'Заполните это поле'}
          {password.isDirty &&
            !password.isEmpty &&
            password.minLengthError &&
            'Пароль должен содержать миниум 5 символов'} &nbsp;
        </span>
        <button
          disabled={!name.inputValid || !email.inputValid || !password.inputValid}
          className='register__submitButton hover__button'
        >
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

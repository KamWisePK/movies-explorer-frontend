import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';

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

function Login() {
  
  
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 5 });

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <section className='login'>
      <Logo />
      <h1 className='login__title'>Рады видеть!</h1>
      <form className='login__form' onSubmit={handleSubmit} noValidate>
        <fieldset className='login__container'>
          <label className='login__label' for='email'>
            E-mail
          </label>
          <input
            onChange={(e) => email.onChange(e)}
            onBlur={(e) => email.onBlur(e)}
            value={email.value}
            name='email'
            className='login__input'
            type='email'
            id='email'
            placeholder='Введите ваш E-mail'
          ></input>
        </fieldset>
        <span className='login__error'>
          {email.isDirty && email.isEmpty && 'Заполните это поле'}
          {email.isDirty &&
            !email.isEmpty &&
            email.minLengthError &&
            'E-mail не может быть короче 3 символов'}
            {email.isDirty && !email.isEmpty && email.emailError && 'Неккоректный E-mail'} &nbsp;
        </span>
        <fieldset className='login__container'>
          <label className='login__label' for='password'>
            Пароль
          </label>
          <input
            onChange={(e) => password.onChange(e)}
            onBlur={(e) => password.onBlur(e)}
            value={password.value}
            name='password'
            className='login__input'
            type='password'
            id='password'
            placeholder='Введите ваш пароль'
          ></input>
        </fieldset>
        <span className='login__error'>
          {password.isDirty && password.isEmpty && 'Заполните это поле'}
          {password.isDirty &&
            !password.isEmpty &&
            password.minLengthError &&
            'Пароль должен содержать миниум 5 символов'} &nbsp;
        </span>
        <button
          disabled={!email.inputValid || !password.inputValid}
          className='login__submitButton hover-button'
        >
          Войти
        </button>
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

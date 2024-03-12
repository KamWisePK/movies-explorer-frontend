
import Logo from '../Logo/Logo';

import '../Login/Auth.css';

import useForm from '../../utils/useForm';


export default function Register({ onRegister }) {

  const { values, errors, handleChange, isValid } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(values);
  };

  return (
    <main className='auth'>
     <Logo />
      <div className='auth__container'>
        <h1 className='auth__title'>Добро пожаловать!</h1>
        <form className='auth__form form' onSubmit={handleSubmit}>
          <label className='auth__label' htmlFor='name'>Имя</label>
          <input type="text" className='auth__input' name='name' id='name' required minLength={2} value={values.name || ''} pattern={"^[A-Za-z][A-Za-z0-9_]{1,29}$"} onChange={handleChange} />
          <span className='auth__error'>{errors.name}</span>
          <label className='auth__label' htmlFor='email'>E-mail</label>
          <input type="email" className='auth__input' name='email' id='email' required value={values.email || ''} pattern={"[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}"} onChange={handleChange} />
          <span className='auth__error'>{errors.email}</span>
          <label className='auth__label' htmlFor='password'>Пароль</label>
          <input type="password" className='auth__input' name='password' id='password' required minLength={3} value={values.password || ''} onChange={handleChange} />
          <span className='auth__error'>{errors.password}</span>
          <button type='submit' className='auth__button-register' disabled={!isValid}>Зарегистрироваться</button>
        </form>
        <p className='auth__subtitle'>Уже зарегистрированы?<a href="/signin" className='auth__link'>Войти</a></p>
      </div>
    </main>
  )
}
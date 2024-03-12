import './Auth.css';
import { NavLink } from 'react-router-dom';
import useForm from '../../utils/useForm';
import headerLogo from '../../images/logo.svg';

export default function Login({ onLogin }) {

  const { values, errors, handleChange, isValid } = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values);
  };

  return (
    <main className='auth'>
      <NavLink to='/'><img src={headerLogo} className="auth__logo" alt="лого" /></NavLink>
      <div className='auth__container'>
        <h1 className='auth__title'>Рады видеть!</h1>
        <form className='auth__form form' onSubmit={handleSubmit}>
          <label className='auth__label' htmlFor='email'>E-mail</label>
          <input type="email" className='auth__input' name='email' id='email' required value={values.email || ''} pattern={"[a-zA-Z0-9_.]+@[a-zA-Z0-9_]+\\.[a-z]{2,}"} onChange={handleChange}/>
          <span className='auth__error'>{errors.email}</span>
          <label className='auth__label' htmlFor='password'>Пароль</label>
          <input type="password" className='auth__input' name='password' id='password' required minLength={3} value={values.password || ''} onChange={handleChange}/>
          <span className='auth__error'>{errors.password}</span>
          <button type='submit' className='auth__button-login' disabled={!isValid}>Войти</button>
        </form>
        <p className='auth__subtitle'>Еще не зарегистрированы?<a href="/signup" className='auth__link'>Регистрация</a></p>
      </div>
    </main>
  )
}
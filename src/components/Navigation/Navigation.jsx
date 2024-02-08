import { Link, useLocation } from 'react-router-dom'; 
import './Navigation.css';
import profileImg from '../../images/acc_enter_image.svg';

function Navigation({navHide}) {
  const location = useLocation();

  return (
    <nav className={`navigation navigation_header ${navHide ? 'hide' : ''}`}>
      <div className='navigation__links navigation__links_header'>
        <Link className='navigation__link hover-link' to={'/movies'}>
          Фильмы
        </Link>
        <Link className='navigation__link hover-link' to={'/saved-movies'}>
          Сохранённые фильмы
        </Link>
      </div>
      <Link className={`navigation__acc-container hover-link ${location.pathname === "/" ? 'hide' : ""} `}  to={'/profile'}>
        <p className='navigation__acc-text'>Аккаунт</p>
        <div className={`navigation__acc-imgContainer ${location.pathname === '/' ? 'navigation__acc-imgContainer_bgColorBlue' : ''}`}>
          <img className='navigation__acc-img'  alt='Иконка входа в аккаунт' src={profileImg} />
        </div>
      </Link>
    </nav>
  );
}

export default Navigation;

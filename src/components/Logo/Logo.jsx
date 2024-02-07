import { Link } from 'react-router-dom';
import './Logo.css';
import LogoImg from '../../images/logo.svg';


function Logo() {
  return (
    <Link className='logo hover-button' to={'/'}>
      <img className='logo__img' alt='Логотип сайта' src={LogoImg} />
    </Link>
  );
}

export default Logo;

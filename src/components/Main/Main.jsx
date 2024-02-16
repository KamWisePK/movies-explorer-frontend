import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Promo from './Promo/Promo';
import AboutProject from './AboutProject/AboutProject';
import Techs from './Techs/Techs';
import AboutMe from './AboutMe/AboutMe';
import Portfolio from './Portfolio/Portfolio';
import '../Hover/Hover.css';

function Main({loggedIn, fromMainPage}) {
  return (
    <>
    <Header
          loggedIn={loggedIn}
          fromMainPage={fromMainPage}
        />
      <main className='page'>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
    </>
  );
}

export default Main;

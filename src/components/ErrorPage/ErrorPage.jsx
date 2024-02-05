import './ErrorPage.css'
function ErrorPage() {
  

    return (
      <section className="errorPage">
        <h1 className="errorPage__title">404</h1>
        <h2 className="errorPage__subtitle">Страница не найдена</h2>
        <button className="errorPage__button hover__button">Назад</button>
      </section>
    );
  }
  
  export default ErrorPage;
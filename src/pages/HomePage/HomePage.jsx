//src/pages/HomePage.jsx
import style from '../Base.module.css';
const HomePage = () => {
  return (
    <div className={style.container}>
      <h1>HomePage</h1>
      <a href="/signup">Try tracker</a>
      <a href="/signin">Sign In</a>
    </div>
  );
};

export default HomePage;

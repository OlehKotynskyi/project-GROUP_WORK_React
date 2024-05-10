//src/pages/HomePage.jsx
import { SharedLayout } from '../../components/SharedLayout/SharedLayout.jsx';

import style from '../Base.module.css';
const HomePage = () => {
  return (
    <SharedLayout>
      <div className={style.container}>
        <h1>HomePage</h1>

        <a href="/signup">Try tracker</a>
        <a href="/signin">Sign In</a>
      </div>
    </SharedLayout>
  );
};

export default HomePage;

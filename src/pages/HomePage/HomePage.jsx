//src/pages/HomePage.jsx
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
// import UserSettingsModal from '../../components/UserSettingsModal/UserSettingsModal';

import style from '../Base.module.css';
import css from './HomePage.module.css'

function HomePage() {
  return (
    <div className={`${style.container} ${css.homePageContainer}`}>
      <WelcomeSection />
      <AdvantagesSection />
      {/* <UserSettingsModal/> */}
    </div>
  );
}

export default HomePage;

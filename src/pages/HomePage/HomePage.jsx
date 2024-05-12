//src/pages/HomePage.jsx
import WelcomeSection from '../../components/WelcomeSection/WelcomeSection';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection';
import UserSettingsForm from '../../components/UserSettingsForm/UserSettingsForm'

import style from '../Base.module.css';
import css from './HomePage.module.css'

function HomePage() {
  return (
    <div className={`${style.container} ${css.homePageContainer}`}>
      <WelcomeSection />
      <AdvantagesSection />
      <UserSettingsForm/>
    </div>
  );
}

export default HomePage;

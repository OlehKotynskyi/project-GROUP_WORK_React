import SignUp from 'components/SignUp/SingUp';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';

import style from '../Base.module.css';
import css from './SignPage.module.css';

function SignUpPage() {
  return (
    <div className={`${css.SignUpPageContainer} ${style.container}`}>
      <SignUp />
      <AdvantagesSection />
    </div>
  );
}

export default SignUpPage;

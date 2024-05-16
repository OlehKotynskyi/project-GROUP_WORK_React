//src/pages/SignUpPage.jsx
import SignUp from 'components/SignUp/SingUp';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';

import style from '../Base.module.css';
import css from './SignPage.module.css';

function SignUpPage() {
  return (
    <div className={`${css.SignUpPageContainer} ${style.container}`}>
      {/* <section className={css.section}> */}

      <SignUp />
      {/* </section> */}

      <AdvantagesSection />
    </div>
  );
}

export default SignUpPage;

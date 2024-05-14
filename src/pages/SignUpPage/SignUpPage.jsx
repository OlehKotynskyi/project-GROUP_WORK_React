//src/pages/SignUpPage.jsx
import SignUp from 'components/SignUp/SingUp';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';
import Logo from 'components/Logo/Logo';
import style from '../Base.module.css';
import css from './SignPage.module.css';

function SignUpPage() {
  return (
    <div className={`${css.SignUpPageContainer} ${style.container}`}>
      <section className={css.section}>
        <Logo className={css.logo} />

        <h1 className={css.title}>Sign Up</h1>
        <SignUp />
      </section>

      <AdvantagesSection />
    </div>
  );
}

export default SignUpPage;

import {Link} from 'react-router-dom';
import Logo from '../Logo/Logo'

import css from './WelcomeSection.module.css';

export default function WelcomeSection() {
  return (
    <>
      <section className={css.section}>
        <Logo className={css.logo} />
        <p className={css.caption}>Record daily water intake and track</p>
        <h1 className={css.title}>Water consumption tracker</h1>
        <div className={css.wrap}>
          <div className={css.wrapTry}>
            <Link to="/signup" className= {css.wrapLink}>
              Try tracker
            </Link>
          </div>
          <div className={css.wrapSign}>
            <Link to="/signin" className={css.wrapLink}>
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

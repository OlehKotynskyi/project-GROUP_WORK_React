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
            <a href="/signup" className={css.wrapLink}>
              Try tracker
            </a>
          </div>
          <div className={css.wrapSign}>
            <a href="/signin" className={css.wrapLink}>
              Sign in
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

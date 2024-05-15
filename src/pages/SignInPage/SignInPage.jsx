//src/pages/SignInPage.jsx
import React, { useState, useEffect } from 'react';
import SignIn from 'components/SignIn/SignIn';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';
import style from '../Base.module.css';
import css from './SignInPage.module.css';
function SignInPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1440);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`${style.container} ${css.signIncontainer}`}>
      <SignIn />
      {isDesktop && <AdvantagesSection />}
    </div>
  );
}

export default SignInPage;

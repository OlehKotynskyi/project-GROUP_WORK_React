import React, { useState, useEffect } from 'react';
import SignUp from 'components/SignUp/SingUp';
import AdvantagesSection from 'components/AdvantagesSection/AdvantagesSection';

import style from '../Base.module.css';
import css from './SignPage.module.css';

function SignUpPage() {
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
    <div className={`${css.SignUpPageContainer} ${style.container}`}>
      <SignUp />
      {isDesktop && <AdvantagesSection />}
    </div>
  );
}

export default SignUpPage;

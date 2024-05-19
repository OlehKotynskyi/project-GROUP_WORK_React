import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from '../../redux/auth/operations';
import Logo from 'components/Logo/Logo';
import sprite from '../../img/svg/sprite.svg';
import css from './SignIn.module.css';

const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email field is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .required('Password field is required'),
});

const getAccessToken = () => {
  const persistAuth = localStorage.getItem('persist:auth');
  if (persistAuth) {
    try {
      const parsedAuth = JSON.parse(persistAuth);
      const accessToken = JSON.parse(parsedAuth.accessToken);
      return accessToken;
    } catch (error) {
      console.error('Failed to parse access token', error);
      return null;
    }
  }
  return null;
};

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(userSchema) });

  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   if (token) {
  //     navigate('/tracker');
  //   }
  // }, [navigate]);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      navigate('/tracker');
    }
  }, [navigate]);

  const onSubmit = async data => {
    const resultAction = await dispatch(signIn(data));
    if (signIn.fulfilled.match(resultAction)) {
      const { accessToken } = resultAction.payload;
      localStorage.setItem('accessToken', accessToken);
      navigate('/tracker');
    } else {
      console.error('Sign in failed', resultAction.payload);
    }
    reset();
  };

  const togglePasswordVisibility = () => {
    setShowPass(!showPass);
  };

  return (
    <section className={css.section}>
      <div className={css.wrapSection}>
        <Logo />
        <h1 className={css.title}>Sign In</h1>
        <form action="" onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div className={`${css.inputContainer} ${css.emailContainer}`}>
            <label htmlFor="email" className={css.label}>
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              {...register('email')}
              className={`${css.input} ${errors.email && css.inputError}`}
            />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>
          <div className={`${css.inputContainer} ${css.inputPassword}`}>
            <label htmlFor="password" className={css.label}>
              Password
            </label>
            <div className={css.passwordContainer}>
              <input
                type={showPass ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                {...register('password')}
                className={`${css.input} ${errors.password && css.inputError}`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className={css.visibilityBtn}
              >
                <svg className={css.icon} width="20" height="20">
                  {showPass ? (
                    <use xlinkHref={`${sprite}#icon-eye`}></use>
                  ) : (
                    <use xlinkHref={`${sprite}#icon-eye-off`}></use>
                  )}
                </svg>
              </button>
            </div>
            {errors.password && (
              <p className={css.error}>{errors.password.message}</p>
            )}
          </div>

          <button type="submit" className={css.submitBtn}>
            Sign In
          </button>
          <p className={css.redirect}>
            Don’t have an account?{' '}
            <NavLink to="/signup" className={css.nav}>
              Sign Up
            </NavLink>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignIn;

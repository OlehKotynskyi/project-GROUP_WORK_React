import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import toast from 'react-hot-toast';
import { Loader } from 'components/Loader/Loader';
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

const SignIn = () => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const [isloding, setIsLoding] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(userSchema) });

  const onSubmit = async data => {
    setIsLoding(true);
    dispatch(signIn(data))
      .unwrap()
      .then(() => {
        toast.success('Login successful');
        reset();
      })
      .catch(error => {
        toast.error('Login failed');
      })
      .finally(() => {
        setIsLoding(false);
      });
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

          {isloding && <Loader />}
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

// import { useDispatch } from 'react-redux';
import Logo from 'components/Logo/Logo';
import { useForm } from 'react-hook-form';
import { useState, React } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sprite from '../../img/svg/sprite.svg';

import css from './SingUp.module.css';

const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email address')
    .required('Email field is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')

    .required('Password field is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password field is required'),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });
  const onSubmit = (data, evt) => {
    console.log(data);
    evt.target.reset();
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const passwordResetVisibility = () => {
    if (!showPasswordReset) {
      setShowPassword(true);
    }
    setShowPasswordReset(!showPasswordReset);
  };

  return (
    <section className={css.section}>
      <Logo className={css.logo} />
      <h1 className={css.title}>Sign Up</h1>
      <form className={css.contact} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputContainer}>
          <label className={css.email}>Email</label>
          <input
            className={css.input}
            type="text"
            {...register('email')}
            placeholder="Enter your email"
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
        <div className={css.inputContainer}>
          <label className={css.email}>Password</label>
          <div className={css.passwordConteiner}>
            <input
              className={`${css.input} ${css.error && css.errorInput}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password', { required: true })}
            />
            <button
              type="button"
              className={css.eyeBtn}
              onClick={passwordVisibility}
            >
              <svg className={css.icon} width="20" height="20">
                <use
                  xlinkHref={`${sprite}#${
                    showPassword ? 'icon-eye' : 'icon-eye-off'
                  }`}
                ></use>
              </svg>
            </button>
          </div>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={css.inputContainer}>
          <label className={css.email}>Repeat Password</label>

          <div className={css.passwordConteiner}>
            <input
              className={css.input}
              type={showPasswordReset ? 'text' : 'password'}
              placeholder="Repeat password"
              {...register('repeatPassword')}
            />
            <button
              type="button"
              className={css.eyeBtn}
              onClick={passwordResetVisibility}
            >
              <svg className={css.icon} width="20" height="20">
                <use
                  xlinkHref={`${sprite}#${
                    showPasswordReset ? 'icon-eye' : 'icon-eye-off'
                  }`}
                ></use>
              </svg>
            </button>
          </div>
          {errors.repeatPassword && (
            <p className={css.error}>{errors.repeatPassword.message}</p>
          )}
        </div>

        <button className={css.singUpBtn} type="submit">
          Sign Up
        </button>
        <p className={css.text}>
          Already have account?{' '}
          <NavLink to="/signin" className={css.navLink}>
            Sign In
          </NavLink>
        </p>
      </form>
    </section>
  );
};

export default SignUp;

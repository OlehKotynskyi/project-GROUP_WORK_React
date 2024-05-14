// import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState, React } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import sprite from '../../img/svg/sprite.svg';
import eyeOff from '../../img/svg/eye-off.svg';
import eye from '../../img/svg/eye.svg';
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
  const onSubmit = data => console.log(data);

  const [showPassword, setShowPassword] = useState(false);
  // const [showPasswordReset, setShowPasswordReset] = useState(false);

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const passwordResetVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section>
      <form className={css.contact} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.input}>
          <label className={css.email}>Email</label>
          <input
            type="text"
            {...register('email')}
            placeholder="Enter your email"
          />
          {errors.email && (
            <p style={{ color: 'red' }}>{errors.email.message}</p>
          )}
        </div>
        <div className={css.input}>
          <label className={css.email}>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            {...register('password', { required: true })}
          />
          <button type="button" onClick={passwordVisibility}>
            {showPassword ? (
              <svg className={css.icon} width="20" height="20">
                <use xlinkHref={`${sprite}#icon-eye.svg`}></use>
              </svg>
            ) : (
              <svg className={css.icon} width="20" height="20">
                <use xlinkHref={`${sprite}#icon-eye-off.svg`}></use>
              </svg>
              // eyeOff
            )}

            {/* <img
              // className={}
              width="20"
              height="20"
              src={showPassword ? eye : eyeOff}
              alt="Toggle password visibility"
            /> */}
          </button>

          {errors.password && (
            <p style={{ color: 'red' }}>{errors.password.message}</p>
          )}
        </div>
        <div className={css.input}>
          <label className={css.email}>Repeat Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat password"
            {...register('repeatPassword')}
          />
          <button type="button" onClick={passwordResetVisibility}>
            <img
              // className={}
              width="20"
              height="20"
              src={showPassword ? eye : eyeOff}
              alt="Toggle  repeat password visibility"
            />
          </button>
          {errors.repeatPassword && (
            <p style={{ color: 'red' }}>{errors.repeatPassword.message}</p>
          )}
        </div>

        <button className={css.wrapTry} type="submit">
          Sign Up
        </button>

        <NavLink to="/signin">Already have account? Sign In</NavLink>
      </form>
    </section>
  );
};

export default SignUp;

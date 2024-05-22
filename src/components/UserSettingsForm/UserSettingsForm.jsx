import React, { useId, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { selectUser } from '../../redux/auth/selectors';
import { currentUser, updateUserInfo } from '../../redux/auth/operations';

import sprite from '../../img/svg/sprite.svg';
import avatar from '../../img/avatars/avatar.jpg';

import css from './UserSettingsForm.module.css';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(50, 'Too long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .min(2, 'Too short!')
    .required('Required'),
  weight: Yup.number()
    .required('Required')
    .positive('Weight must be a positive number'),
  time: Yup.number().required('Required').min(0, 'Time time must be 0 or more'),
  water: Yup.number()
    .required('Required')
    .positive('Water consumption must be a positive number'),
  gender: Yup.string().oneOf(['woman', 'man']).required('Required'),
});

export default function UserSettingsForm() {
  const user = useSelector(selectUser);
  console.log(user);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      weight: user.weight || 0,
      time: user.activeSportTime || 0,
      water: user.dailyWaterNorma || 0,
      gender: user.gender || 'woman',
    },
  });

  useEffect(() => {
    dispatch(currentUser());
    console.log(currentUser)
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('weight', user.weight);
      setValue('time', user.activeSportTime);
      setValue('water', user.dailyWaterNorma);
      setValue('gender', user.gender);
    }
  }, [user, setValue]);

  const nameId = useId();
  const emailId = useId();
  const [file, setFile] = useState(null);

  const onFileChange = e => {
    setFile(e.target.files[0]);
  };

  const calculate = () => {
    if (user.gender === 'woman') {
      return (user.weight * 0.03 + user.activeSportTime * 0.04).toFixed(1);
    } else if (user.gender === 'man') {
      return (user.weight * 0.04 + user.activeSportTime * 0.06).toFixed(1);
    }
    return 0;
  };

  const submit = async data => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('weight', data.weight);
    formData.append('time', data.time);
    formData.append('water', data.water);
    formData.append('gender', data.gender);
    if (file) {
      formData.append('avatar', file);
    }

    try {
      await dispatch(updateUserInfo(formData)).unwrap();
      alert('Updated successfully');
    } catch (error) {
      alert(`Error ${error.message}`);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(submit)}>
      <div className={css.imageWrap}>
        <img
          src={file ? URL.createObjectURL(file) : avatar}
          alt="user avatar"
          className={css.avatarImg}
        />

        <label className={css.buttonUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className={css.imgInput}
            {...register('avatar')}
          />
          <svg className={css.iconUpload} width="18" height="18">
            <use xlinkHref={`${sprite}#icon-upload`}></use>
          </svg>
          <p>Upload a photo</p>
        </label>
      </div>
      <div className={css.partWrap}>
        <div
          className={`${css.inputContainerGender} ${
            errors.name ? css.hasError : ''
          }`}
        >
          <h2 className={css.inputTitleBold}>Your gender identity</h2>
          <div className={css.genderInputWrap}>
            <label className={css.radio}>
              <input
                type="radio"
                name="gender"
                value="woman"
                className={css.genderInput}
                {...register('gender')}
              />
              <span className={css.iconWrap}>
                <svg className={css.iconRadio} width="20" height="20">
                  <use
                    xlinkHref={
                      user.gender === 'woman'
                        ? `${sprite}#icon-radio-active`
                        : `${sprite}#icon-radio`
                    }
                  ></use>
                </svg>
              </span>
              Woman
            </label>
            <label className={css.radio}>
              <input
                type="radio"
                name="gender"
                value="man"
                className={css.genderInput}
                {...register('gender')}
              />
              <span className={css.iconWrap}>
                <svg className={css.iconRadio} width="20" height="20">
                  <use
                    xlinkHref={
                      user.gender === 'man'
                        ? `${sprite}#icon-radio-active`
                        : `${sprite}#icon-radio`
                    }
                  ></use>
                </svg>
              </span>
              Man
            </label>
          </div>
          {errors.gender && (
            <p className={css.error}>{errors.gender.message}</p>
          )}
        </div>
      </div>

      <div className={css.block}>
        <div className={css.blockWrap}>
          <div className={css.partWrap}>
            <div
              className={`${css.inputContainer} ${
                errors.name ? css.hasError : ''
              }`}
            >
              <label htmlFor={nameId} className={css.inputTitleBold}>
                Your name
              </label>
              <input
                type="text"
                name="name"
                id={nameId}
                className={`${css.inputField} ${errors.name && css.inputError}`}
                defaultValue={user.name}
                {...register('name')}
              />
              {errors.name && (
                <p className={css.error}>{errors.name.message}</p>
              )}
            </div>
            <div
              className={`${css.inputContainer} ${
                errors.name ? css.hasError : ''
              }`}
            >
              <label htmlFor={emailId} className={css.inputTitleBold}>
                Email
              </label>
              <input
                type="email"
                name="email"
                id={emailId}
                className={css.inputField}
                value={user.email}
                {...register('email')}
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className={css.partWrap}>
            <h2 className={`${css.inputTitleBold} ${css.dailyTitle}`}>
              My daily norma
            </h2>
            <div className={css.normaForm}>
              <div className={css.normaFormWoman}>
                <h3 className={css.inputTitle}>For woman:</h3>
                <p className={css.accentText}>V=(M*0,03) + (T*0,4)</p>
              </div>
              <div className={css.normaFormMan}>
                <h3 className={css.inputTitle}>For man:</h3>
                <p className={css.accentText}>V=(M*0,04) + (T*0,6)</p>
              </div>
            </div>

            <div className={css.border}>
              <p className={css.borderText}>
                <span className={css.accentText}>*</span> V is the volume of the
                water norm in liters per day, M is your body weight, T is the
                time of active sports, or another type of activity commensurate
                in terms of loads (in the absence of these, you must set 0)
              </p>
            </div>
            <div className={css.activeTime}>
              <svg className={css.iconExclamation} width="18" height="18">
                <use xlinkHref={`${sprite}#icon-exclamation-mark`}></use>
              </svg>
              <p>Active time in hours</p>
            </div>
          </div>
        </div>

        <div className={css.blockWrap}>
          <div className={css.partWrap}>
            <div
              className={`${css.inputContainer} ${
                errors.name ? css.hasError : ''
              }`}
            >
              <label className={css.inputTitle}>
                Your weight in kilograms:
              </label>
              <input
                type="number"
                name="weight"
                className={css.inputField}
                value={user.weight}
                {...register('weight')}
              />
              {errors.weight && (
                <p className={css.error}>{errors.weight.message}</p>
              )}
            </div>
            <div
              className={`${css.inputContainer} ${
                errors.name ? css.hasError : ''
              }`}
            >
              <label className={css.inputTitle}>
                The time of active participation in sports:
              </label>
              <input
                type="number"
                name="time"
                className={css.inputField}
                value={user.activeSportTime}
                {...register('time')}
              />
              {errors.time && (
                <p className={css.error}>{errors.time.message}</p>
              )}
            </div>
          </div>

          <div className={`${css.partWrap} ${css.requiredAmountWrap}`}>
            <div className={css.requiredAmount}>
              <h3 className={css.inputTitle}>
                The required amount of water in liters per day:
              </h3>
              <p className={`${css.accentText} ${css.accentLiter}`}>
                {calculate()} L
              </p>
            </div>

            <div
              className={`${css.inputContainer} ${
                errors.name ? css.hasError : ''
              }`}
            >
              <label className={css.inputTitleBold}>
                Write down how much water you will drink:
              </label>
              <input
                type="number"
                name="water"
                className={css.inputField}
                value={user.dailyWaterNorma}
                {...register('water')}
              />
              {errors.water && (
                <p className={css.error}>{errors.water.message}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <button type="submit" className={css.submitBtn}>
        Save
      </button>
    </form>
  );
}

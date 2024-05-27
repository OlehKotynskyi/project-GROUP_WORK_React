import React, { useId, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { selectUser, selectUserAvatar } from '../../redux/auth/selectors';
import { currentUser, updateUserInfo } from '../../redux/auth/operations';

import sprite from '../../img/svg/sprite.svg';

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
    .positive('Weight must be a positive number')
    .max(200, 'Weight must be less than or equal to 200'),
  activeSportTime: Yup.number()
    .required('Required')
    .min(0, 'Time must be 0 or more')
    .max(24, 'Time must be less than or equal to 24'),
  dailyWaterNorma: Yup.number()
    .required('Required')
    .positive('Water consumption must be a positive number')
    .max(10000, 'Water consumption must be less than or equal to 10000'),
  gender: Yup.string().oneOf(['female', 'male']),
});

export default function UserSettingsForm() {
  const avatarURL = useSelector(selectUserAvatar);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name || '',
      email: user.email || '',
      weight: user.weight || 0,
      activeSportTime: user.activeSportTime || 0,
      dailyWaterNorma: user.dailyWaterNorma || 0,
      gender: user.gender || 'female',

    },
  });

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('weight', user.weight);
      setValue('activeSportTime', user.activeSportTime);
      setValue('dailyWaterNorma', user.dailyWaterNorma);
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
    if (watch('gender') === 'female') {
      return (watch('weight') * 0.03 + watch('activeSportTime') * 0.04).toFixed(1);
    } else if (watch('gender') === 'male') {
      return (watch('weight') * 0.04 + watch('activeSportTime') * 0.06).toFixed(1);
    }
    return 0;
  };

  const submit = async userData => {
    const formData = new FormData();
    formData.append('name', userData.name);
    formData.append('email', userData.email);
    formData.append('weight', userData.weight);
    formData.append('activeSportTime', userData.activeSportTime);
    formData.append('dailyWaterNorma', userData.dailyWaterNorma);
    formData.append('gender', userData.gender);
    if (file) {
      formData.append('avatarURL', file);
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
          src={file ? URL.createObjectURL(file) : avatarURL}
          alt="user avatar"
          className={css.avatarImg}
        />

        <label className={css.buttonUpload}>
          <input
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className={css.imgInput}
            {...register('avatarURL')}
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
            errors.gender ? css.hasError : ''
          }`}
        >
          <h2 className={css.inputTitleBold}>Your gender identity</h2>
          <div className={css.genderInputWrap}>
            <label className={css.radio}>
              <input
                type="radio"
                name="gender"
                value="female"
                className={css.genderInput}
                {...register('gender')}
                defaultChecked={watch('gender') === 'female'}
              />
              <span className={css.iconWrap}>
                <svg className={css.iconRadio} width="20" height="20">
                  <use
                    xlinkHref={
                      watch('gender') === 'female'
                        ? `${sprite}#icon-radio-active`
                        : `${sprite}#icon-radio`
                    }
                  ></use>
                </svg>
              </span>
              woman
            </label>
            <label className={css.radio}>
              <input
                type="radio"
                name="gender"
                value="male"
                className={css.genderInput}
                {...register('gender')}
                defaultChecked={watch('gender') === 'male'}
              />
              <span className={css.iconWrap}>
                <svg className={css.iconRadio} width="20" height="20">
                  <use
                    xlinkHref={
                      watch('gender') === 'male'
                        ? `${sprite}#icon-radio-active`
                        : `${sprite}#icon-radio`
                    }
                  ></use>
                </svg>
              </span>
              man
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
                value={watch('name')}
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
                value={watch('email')}
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
                value={watch('weight')}
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
                name="activeSportTime"
                className={css.inputField}
                value={watch('activeSportTime')}
                {...register('activeSportTime')}
              />
              {errors.activeSportTime && (
                <p className={css.error}>{errors.activeSportTime.message}</p>
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
                name="dailyWaterNorma"
                className={css.inputField}
                value={watch('dailyWaterNorma')}
                {...register('dailyWaterNorma')}
              />
              {errors.dailyWaterNorma && (
                <p className={css.error}>{errors.dailyWaterNorma.message}</p>
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
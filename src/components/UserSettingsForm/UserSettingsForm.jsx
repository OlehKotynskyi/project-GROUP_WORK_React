import React, { useId, useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Toaster, toast } from 'react-hot-toast';
import { selectUser, selectUserAvatar } from '../../redux/auth/selectors';
import { currentUser, updateUserInfo } from '../../redux/auth/operations';

import sprite from '../../img/svg/sprite.svg';
import css from './UserSettingsForm.module.css';

const schema = Yup.object().shape({
  name: Yup.string().min(2, 'Too short!').max(50, 'Too long!'),
  email: Yup.string().email('Invalid email').min(2, 'Too short!'),
  weight: Yup.number()
    .positive('Weight must be a positive number')
    .max(200, 'Weight must be less than or equal to 200'),
  activeSportTime: Yup.number()
    .min(0, 'Time must be 0 or more')
    .max(1000, 'Time must be less than or equal to 1000'),
  dailyWaterNorma: Yup.number()
    .positive('Water consumption must be a positive number')
    .max(10000, 'Water consumption must be less than or equal to 10000'),
  gender: Yup.string().oneOf(['woman', 'man']),
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
      name: '',
      email: '',
      weight: 0,
      activeSportTime: 0,
      dailyWaterNorma: 0,
      gender: 'woman',
    },
  });

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setValue('name', user.name || '');
      setValue('email', user.email || '');
      setValue('weight', user.weight || 0);
      setValue('activeSportTime', user.activeSportTime || 0);
      setValue('dailyWaterNorma', user.dailyWaterNorma || 0);
      setValue('gender', user.gender || 'woman');
    }
  }, [user, setValue]);

  const nameId = useId();
  const emailId = useId();
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const onFileChange = e => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const calculate = () => {
    const weight = parseFloat(watch('weight')) || 0;
    const activeSportTime = parseFloat(watch('activeSportTime')) || 0;
    if (watch('gender') === 'woman') {
      return (weight * 0.03 + activeSportTime * 0.04).toFixed(1);
    } else if (watch('gender') === 'man') {
      return (weight * 0.04 + activeSportTime * 0.06).toFixed(1);
    }
    return 0;
  };

  const submit = async userData => {
    const formData = new FormData();

    for (const key in userData) {
      if (userData.hasOwnProperty(key)) {
        formData.append(key, userData[key]);
      }
    }

    if (file) {
      formData.append('avatar', file);
    }

    try {
      await dispatch(updateUserInfo(formData)).unwrap();
      toast.success('Updated successfully', {
        position: 'top-center',
        style: { background: 'green', color: 'white' },
      });
    } catch (error) {
      toast.error(`Error: ${error.message}`, {
        position: 'top-center',
        style: { background: 'red', color: 'white' },
      });
    }
  };

  return (
    <>
      <form
        className={css.form}
        onSubmit={handleSubmit(submit)}
        encType="multipart/form-data"
      >
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
              ref={fileInputRef}
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
                  value="woman"
                  className={css.genderInput}
                  {...register('gender')}
                />
                <span className={css.iconWrap}>
                  <svg className={css.iconRadio} width="20" height="20">
                    <use
                      xlinkHref={
                        watch('gender') === 'woman'
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
                  value="man"
                  className={css.genderInput}
                  {...register('gender')}
                />
                <span className={css.iconWrap}>
                  <svg className={css.iconRadio} width="20" height="20">
                    <use
                      xlinkHref={
                        watch('gender') === 'man'
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
                  className={`${css.inputField} ${
                    errors.name && css.inputError
                  }`}
                  {...register('name')}
                />
                {errors.name && (
                  <p className={css.error}>{errors.name.message}</p>
                )}
              </div>
              <div
                className={`${css.inputContainer} ${
                  errors.email ? css.hasError : ''
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
                  <span className={css.accentText}>*</span> V is the volume of
                  the water norm in liters per day, M is your body weight, T is
                  the time of active sports, or another type of activity
                  commensurate in terms of loads (in the absence of these, you
                  must set 0)
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
                  errors.weight ? css.hasError : ''
                }`}
              >
                <label className={css.inputTitle}>
                  Your weight in kilograms:
                </label>
                <input
                  type="number"
                  name="weight"
                  className={css.inputField}
                  {...register('weight')}
                />
                {errors.weight && (
                  <p className={css.error}>{errors.weight.message}</p>
                )}
              </div>
              <div
                className={`${css.inputContainer} ${
                  errors.activeSportTime ? css.hasError : ''
                }`}
              >
                <label className={css.inputTitle}>
                  The time of active participation in sports:
                </label>
                <input
                  type="number"
                  name="activeSportTime"
                  className={css.inputField}
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
                  errors.dailyWaterNorma ? css.hasError : ''
                }`}
              >
                <label className={css.inputTitleBold}>
                  Write down how much water you will drink:
                </label>
                <input
                  type="number"
                  name="dailyWaterNorma"
                  className={css.inputField}
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
      <Toaster />
    </>
  );
}

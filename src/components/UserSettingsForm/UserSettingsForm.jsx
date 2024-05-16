import { useId, useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

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
  sport: Yup.number()
    .required('Required')
    .min(0, 'Sport time must be 0 or more'),
  water: Yup.number()
    .required('Required')
    .positive('Water consumption must be a positive number'),
  gender: Yup.string().oneOf(['woman', 'man']).required('Required'),
});

export default function UserSettingsForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  // console.log(register);
  // console.log(handleSubmit);
  // console.log(control);
  // console.log(errors);

  const nameId = useId();
  const emailId = useId();
  const [file, setFile] = useState(null);
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState(0);
  const [time, setTime] = useState(0);
  const [amount, setAmount] = useState(0);

  const onFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleChangeGender = e => {
    setGender(e.target.value);
  };

  const onWeightChange = e => {
    const value = e.target.value ? Number(e.target.value) : '';
    setWeight(value);
  };

  const onTimeChange = e => {
    const value = e.target.value ? Number(e.target.value) : '';
    setTime(value);
  };

  const onAmountChange = e => {
    const value = e.target.value ? Number(e.target.value) : '';
    setAmount(value);
  };

  const calculate = () => {
    if (gender === 'woman') {
      return (weight * 0.03 + time * 0.04).toFixed(1);
    } else if (gender === 'man') {
      return (weight * 0.04 + time * 0.06).toFixed(1);
    }
    return 0;
  };

  const submit = data => {
    console.log(data);
  };

  return (
    <form className={css.form} onSubmit={submit}>
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
          />
          <svg className={css.iconUpload} width="18" height="18">
            <use xlinkHref={`${sprite}#icon-upload`}></use>
          </svg>
          <p>Upload a photo</p>
        </label>
      </div>

      <div>
        <h2 className={css.inputTitleBold}>Your gender identity</h2>
        <div className={css.genderInputWrap}>
          <label className={css.radio}>
            <input
              type="radio"
              name="gender"
              value="woman"
              className={css.genderInput}
              checked={gender === 'woman'}
              onChange={handleChangeGender}
            />
            <span className={css.iconWrap}>
              <svg className={css.iconRadio} width="20" height="20">
                <use
                  xlinkHref={
                    gender === 'woman'
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
              checked={gender === 'man'}
              onChange={handleChangeGender}
            />
            <span className={css.iconWrap}>
              <svg className={css.iconRadio} width="20" height="20">
                <use
                  xlinkHref={
                    gender === 'man'
                      ? `${sprite}#icon-radio-active`
                      : `${sprite}#icon-radio`
                  }
                ></use>
              </svg>
            </span>
            Man
          </label>
        </div>
      </div>

      <div className={css.block}>
        <div className={css.blockWrap}>
          <div className={css.partWrap}>
            <div>
              <label
                htmlFor={nameId}
                className={`${css.inputTitleBold}  ${css.inputTitleSmall}`}
              >
                Your name
              </label>
              <input
                type="text"
                name="name"
                id={nameId}
                className={css.inputField}
              />
            </div>
            <div>
              <label
                htmlFor={emailId}
                className={`${css.inputTitleBold}  ${css.inputTitleSmall}`}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id={emailId}
                className={css.inputField}
              />
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
            <div>
              <label className={css.inputTitle}>
                Your weight in kilograms:
              </label>
              <input
                value={weight}
                type="number"
                name="weight"
                className={css.inputField}
                onChange={onWeightChange}
              />
            </div>
            <div>
              <label className={css.inputTitle}>
                The time of active participation in sports:
              </label>
              <input
                value={time}
                type="number"
                name="sport"
                className={css.inputField}
                onChange={onTimeChange}
              />
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

            <div>
              <label
                className={` ${css.inputTitleBold}  ${css.inputTitleSmall}`}
              >
                Write down how much water you will drink:
              </label>
              <input
                value={amount}
                type="number"
                name="water"
                className={css.inputField}
                onChange={onAmountChange}
              />
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

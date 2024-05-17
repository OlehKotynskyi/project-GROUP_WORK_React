import React, { useState } from 'react';
import { useId } from 'react';
import sprite from '../../img/svg/sprite.svg';
import avatar from '../../img/avatars/avatar.jpg';

import css from './UserSettingsForm.module.css';

export default function UserSettingsForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weight: 0,
    sport: 0,
    water: 0,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const nameId = useId();
  const emailId = useId();

  return (
    <form className={css.form}>
      <h1 className={css.modalTitle}>Setting</h1>

      <div className={css.imageWrap}>
        <img src={avatar} alt="user avatar" />

        <div className={css.uploadImage}>
          <button type="button" className={css.button}>
            <svg className={css.icon} width="18" height="18">
              <use xlinkHref={`${sprite}#icon-upload`}></use>
            </svg>
          </button>
          <p>Upload a photo</p>
        </div>
      </div>

      <div>
        <h2 className={css.inputTitleBold}>Your gender identity</h2>
        <div className={css.genderInputWrap}>
          <label>
            <input
              type="radio"
              name="gender"
              value="woman"
              className={css.genderInput}
              onChange={handleChange}
            />
            Woman
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="man"
              className={css.genderInput}
              onChange={handleChange}
            />
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
                value={formData.name}
                onChange={handleChange}
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
                value={formData.email}
                onChange={handleChange}
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
            <p>Active time in hours</p>
          </div>
        </div>

        <div className={css.blockWrap}>
          <div className={css.partWrap}>
            <div>
              <label className={css.inputTitle}>
                Your weight in kilograms:
              </label>
              <input
                type="number"
                name="weight"
                className={css.inputField}
                value={formData.weight}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className={css.inputTitle}>
                The time of active participation in sports:
              </label>
              <input
                type="number"
                name="sport"
                className={css.inputField}
                value={formData.sport}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={`${css.partWrap} ${css.requiredAmountWrap}`}>
            <div className={css.requiredAmount}>
              <h3 className={css.inputTitle}>
                The required amount of water in liters per day:
              </h3>
              <p className={`${css.accentText} ${css.accentLiter}`}>10 L</p>
            </div>

            <div>
              <label
                className={` ${css.inputTitleBold}  ${css.inputTitleSmall}`}
              >
                Write down how much water you will drink:
              </label>
              <input
                type="number"
                name="water"
                className={css.inputField}
                value={formData.water}
                onChange={handleChange}
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

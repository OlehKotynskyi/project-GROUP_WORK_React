import { useId } from 'react';
import * as Yup from 'yup';

import css from './UserSettingsForm.module.css';

export default function UserSettingsForm() {
  const nameId = useId();
  const emailId = useId();

  const UserSettingsSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too short!')
      .max(50, 'Too long!')
      .required('Required'),
    gender: Yup.string().oneOf(['woman', 'man']).required('Required'),
  });

  return (
    //  <Formik
    //    initialValues={{}}
    //    onSubmit={() => {}}
    //    validationSchema={UserSettingsSchema}
    //  >
    <form className={css.form}>
      <div>
        <img />
        <svg />
        <p>Upload a photo</p>
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
            />
            Woman
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="man"
              className={css.genderInput}
            />
            Man
          </label>
        </div>
      </div>

      <div className={`${css.partWrap} ${css.firstPart}`}>
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
        <h2 className={css.inputTitleBold}>My daily norma</h2>
        <div className={css.normaForm}>
          <div>
            <h3 className={css.inputTitle}>For woman:</h3>
            <p className={css.accentText}>V=(M*0,03) + (T*0,4)</p>
          </div>
          <div>
            <h3 className={css.inputTitle}>For man:</h3>
            <p className={css.accentText}>V=(M*0,04) + (T*0,6)</p>
          </div>
        </div>

        <div className={css.border}>
          <p className={css.borderText}>
            <span className={css.accentText}>*</span> V is the volume of the
            water norm in liters per day, M is your body weight, T is the time
            of active sports, or another type of activity commensurate in terms
            of loads (in the absence of these, you must set 0)
          </p>
        </div>
        <p>Active time in hours</p>
      </div>

      <div className={css.partWrap}>
        <div>
          <label className={css.inputTitle}>Your weight in kilograms:</label>
          <input type="number" name="weight" className={css.inputField} />
        </div>
        <div>
          <label className={css.inputTitle}>
            The time of active participation in sports:
          </label>
          <input type="number" name="sport" className={css.inputField} />
        </div>
      </div>

      <div className={css.partWrap}>
        <div>
          <h3 className={css.inputTitle}>
            The required amount of water in liters per day:
          </h3>
          <p className={css.accentText}></p>
        </div>

        <div>
          <label className={` ${css.inputTitleBold}  ${css.inputTitleSmall}`}>
            Write down how much water you will drink:
          </label>
          <input type="number" name="water" className={css.inputField} />
        </div>
      </div>

      <button type="submit">Save</button>
    </form>
  );
}

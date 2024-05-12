import { useId } from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';

import css from './UserSettingsModal.module.css';

export default function UserSettingsModal() {
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
    <Formik
      initialValues={{}}
      onSubmit={() => {}}
      validationSchema={UserSettingsSchema}
    >
      <Form className={css.form}>
        <div>
          <img />
          <svg />
          <p>Upload a photo</p>
        </div>

        <div>
          <h2>Your gender identity</h2>
          <label>
            <Field type="radio" name="gender" value="woman" />
            Woman
          </label>
          <label>
            <Field type="radio" name="gender" value="man" />
            Man
          </label>
        </div>

        <div>
          <label htmlFor={nameId}>Your name</label>
          <Field type="text" name="name" id={nameId} />

          <label htmlFor={emailId}>Email</label>
          <Field type="email" name="email" id={emailId} />
        </div>

        <h2>My daily norma</h2>
        <div>
          <p>For woman:</p>
          <p>V=(M*0,03) + (T*0,4)</p>
        </div>

        <div>
          <p>For man:</p>
          <p>V=(M*0,04) + (T*0,6)</p>
        </div>

        <p>
          <span>*</span> V is the volume of the water norm in liters per day, M
          is your body weight, T is the time of active sports, or another type
          of activity commensurate in terms of loads (in the absence of these,
          you must set 0)
        </p>
        <p>Active time in hours</p>

        <div>
          <label>Your weight in kilograms:</label>
          <Field type="number" name="weight" />

          <label>The time of active participation in sports:</label>
          <Field type="number" name="sport" />

          <label>The required amount of water in liters per day:</label>
          <Field type="number" name="litr" />

          <label>Write down how much water you will drink:</label>
          <Field type="number" name="water" />
        </div>

        <button type="submit">Save</button>
      </Form>
    </Formik>
  );
}

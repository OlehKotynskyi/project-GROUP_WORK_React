import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';

import style from '../../pages/Base.module.css'
import css from './UserSettingsModal.module.css';

export default function UserSettingsModal() {
  return (
    <section className={css.section}>
      <div className={style.container}>
        <h1>Setting</h1>
        <UserSettingsForm />
      </div>
    </section>
  );
}   

import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';

import style from '../../pages/Base.module.css';
import sprite from '../../img/svg/sprite.svg';
import css from './UserSettingsModal.module.css';

export default function UserSettingsModal({ onClose }) {
  return (
    <section className={css.section}>
      <div className={style.container}>
        <h1>Setting</h1>
        <button type="button" onClick={onClose}>
          <svg>
            <use xlinkHref={`${sprite}#icon-exsit`}></use>
          </svg>
        </button>
        <UserSettingsForm onClose={onClose} />
      </div>
    </section>
  );
}   

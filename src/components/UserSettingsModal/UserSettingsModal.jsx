import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';

import sprite from '../../img/svg/sprite.svg';


import style from '../../pages/Base.module.css'
import css from './UserSettingsModal.module.css';

export default function UserSettingsModal({onClose}) {
  return (
    <div className={style.container}>
        <div className={css.modal}>
          <button className={css.button} onClick={onClose}>
            <svg className={css.icon} width="14" height="14">
              <use xlinkHref={`${sprite}#icon-exsit`}></use>
            </svg>
          </button>

          <UserSettingsForm />
        </div>
    </div>
  );
}   


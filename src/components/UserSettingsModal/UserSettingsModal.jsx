import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';

import ReactModal from 'react-modal';

import sprite from '../../img/svg/sprite.svg';


import style from '../../pages/Base.module.css'
import css from './UserSettingsModal.module.css';

export default function UserSettingsModal() {
  let isMainModalOpen = true
  const onAfterOpen = () => {
    console.log('opened modal')
  }
  const onClose = () => {
    isMainModalOpen= false
  }
  return (
    <div className={style.container}>
      <ReactModal
        isOpen={isMainModalOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onClose}
        className={css.modal}
        overlayClassName={css.backdrop}
        contentLabel="Example Modal"
      >
        <div>
          <button className={css.button} onClick={onClose}>
            <svg className={css.icon} width="14" height="14">
              <use xlinkHref={`${sprite}#icon-exsit`}></use>
            </svg>
          </button>

          <UserSettingsForm />
        </div>
      </ReactModal>
    </div>
  );
}   


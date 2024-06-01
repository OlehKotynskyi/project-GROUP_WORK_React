// src/components/Modal.jsx
import ReactModal from 'react-modal';

//import sprite from "../../img/svg/sprite.svg";
import css from './Modal.module.css';

export const Modal = ({ isMainModalOpen, children, onClose, onAfterOpen }) => {
  return (
    <div>
      <ReactModal
        isOpen={isMainModalOpen}
        onAfterOpen={onAfterOpen}
        onRequestClose={onClose}
        className={css.modal}
        overlayClassName={css.backdrop}
        contentLabel="Example Modal"
      >
        <div>
          {/*<button className={css.button} onClick={onClose}>
            <svg className={css.icon} width="14" height="14">
              <use xlinkHref={`${sprite}#icon-exsit`}></use>
            </svg>
          </button>*/}
          <div>{children}</div>
        </div>
      </ReactModal>
    </div>
  );
};

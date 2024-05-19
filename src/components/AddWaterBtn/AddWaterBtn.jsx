// src/components/AddWaterBtn.jsx
import css from './AddWaterBtn.module.css';
import sprite from '../../img/svg/sprite.svg';
export const AddWaterBtn = ({ openModal, theme }) => {
  if (theme === 'dark') {
    return (
      <>
        <button className={css.btnDark} onClick={() => openModal('add')}>
          <svg className={css.icon} width="16" height="16">
            <use xlinkHref={`${sprite}#icon-plus`}></use>
          </svg>
          Add water
        </button>
      </>
    );
  } else {
    return (
      <>
        <button className={css.btnLite} onClick={() => openModal('add')}>
          <div className={css.btnLiteWrap}>
            <svg className={css.icon} width="18" height="18">
              <use xlinkHref={`${sprite}#icon-plus`}></use>
            </svg>
          </div>
          <p>Add water</p>
        </button>
      </>
    );
  }
};

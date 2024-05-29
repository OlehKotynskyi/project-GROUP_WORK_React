// src/components/WaterItem.jsx
import sprite from '../../img/svg/sprite.svg';
import css from './WaterItem.module.css';

export const WaterItem = ({ time, amount, openModal }) => {
  const [hours, minutes] = time.split(':');

  return (
    <div className={css.waterItemContainer}>
      <div className={css.svgContainer}>
        <svg className={css.svgWaterGlass}>
          <use xlinkHref={`${sprite}#icon-water-glass-fill`}></use>
        </svg>
      </div>
      <div className={css.infoContainer}>
        <div className={css.infoAmount}>{amount} ml</div>
        <div className={css.infoDate}>{`${hours}:${minutes}`}</div>{' '}
      </div>
      <div className={css.btnContainer}>
        <button className={css.btnEdit} onClick={() => openModal('edit')}>
          <div className={css.btnSvgContainer}>
            <svg className={css.svgEdit} width="14px" height="14px" fill="none">
              <use xlinkHref={`${sprite}#icon-edit`}></use>
            </svg>
          </div>
        </button>
        <button className={css.btnTrash} onClick={() => openModal('delete')}>
          <div className={css.btnSvgContainer}>
            <svg
              className={css.svgTrash}
              width="14px"
              height="14px"
              fill="none"
            >
              <use xlinkHref={`${sprite}#icon-trash`}></use>
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

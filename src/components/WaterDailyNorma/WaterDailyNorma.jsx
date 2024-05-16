// src/components/WaterDailyNorma.jsx
import css from './WaterDailyNorma.module.css'
export const WaterDailyNorma = ({ dailyNorm }) => {
  return (
    <>
      <div className={css.wrap}>
        <p className={css.dailyNorm}>{dailyNorm} L</p>
        <p className={css.text}>My daily norma</p>
      </div>
    </>
  );
};

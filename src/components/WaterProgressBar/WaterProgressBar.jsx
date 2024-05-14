// src/components/WaterProgressBar.jsx
import { Slider } from '@mui/material';
import css from './WaterProgressBar.module.css';

export const WaterProgressBar = ({ currentAmount, dailyNorm }) => {
  // const percentage = (currentAmount / dailyNorm) * 100;
  const percentage = 500;

  return (
    <>
      <div className={css.wrapper}>
        <p className={css.text}>Today</p>
        <Slider
          sx={{
            height: '6px',
            color: 'var(--background)',
            border: 'none',
            padding: '0px',
            pointerEvents: 'none',

            '& .MuiSlider-thumb': {
              color: 'var(--main-white)',
              border: ' 1px solid var(--accent)',
              width: '12px',
              height: '12px',
            },
            '& .MuiSlider-track': {
              color: 'var(--accent)',
            },
            '& .MuiSlider-root': {
              padding: '0px',
            },
            '& .MuiSlider-rail ': {
              opacity: '100%',
            },
          }}
          value={percentage}
          min={0}
          max={dailyNorm}
        />
        <ul className={css.percentageList}>
          <li className={css.percentageItem}>
            <p>0%</p>
          </li>
          <li className={css.percentageItem}>
            <p>50%</p>
          </li>
          <li className={css.percentageItem}>
            <p>100%</p>
          </li>
        </ul>
      </div>
    </>
  );
};

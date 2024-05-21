// src/components/WaterProgressBar.jsx
import { Slider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchWaters } from '../../redux/water/operations';
import { selectWaters } from '../../redux/water/selectors';
import { selectDailyWaterNorma } from '../../redux/auth/selectors';
import css from './WaterProgressBar.module.css';

export const WaterProgressBar = () => {
  const dispatch = useDispatch();
  const waters = useSelector(selectWaters);
  const dailyNorm = useSelector(selectDailyWaterNorma);

  useEffect(() => {
    dispatch(fetchWaters());
  }, [dispatch]);

  console.log("Fetched Waters:", waters);

  const currentAmount = waters.reduce((total, water) => total + water.amountDose, 0);
  const percentage = dailyNorm ? Math.min((currentAmount / dailyNorm) * 100, 100) : 0;

  const shouldDisplayPercentage = value => {
    return [10, 20, 30, 60, 70, 80].includes(value);
  };
  const screenWidth = document.documentElement.scrollWidth;
  const top = screenWidth <= 768 ? 32 : 36;
  const fontSize = screenWidth <= 768 ? '8px' : '10px';

  return (
    <>
      <div className={css.wrapper}>
        <p className={css.text}>Today</p>
        <Slider
          sx={{
            height: '6px',
            color: 'var(--background)',
            border: 'none',
            padding: '0px 0px 0px 0px',
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
              margin: '0px',
              lineHeight: '0',
            },
            '& .MuiSlider-rail ': {
              opacity: '100%',
            },
            '& .MuiSlider-valueLabel': {
              background: 'transparent',
              top: { top },
              color: 'var(--accent)',
              fontSize: { fontSize },
              lineHeight: '1',
              fontFamily: 'inherit',
              fontWeight: 'inherit',
            },
          }}
          aria-label="percentage"
          step={10}
          valueLabelDisplay="on"
          valueLabelFormat={value =>
            shouldDisplayPercentage(value) ? `${value}%` : ''
          }
          value={percentage}
          min={0}
          max={100}
        />

        <ul className={css.percentageList}>
          <li className={css.percentageItem}>
            <p>0%</p>
          </li>
          <li className={css.percentageItem}>
            {percentage === 50 ? (
              <p className={css.percentageCurrent}>50%</p>
            ) : (
              <p>50%</p>
            )}
          </li>
          <li className={css.percentageItem}>
            {percentage === 100 ? (
              <p className={css.percentageCurrent}>100%</p>
            ) : (
              <p>100%</p>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};
// src/components/WaterMainInfo.jsx
import { useSelector } from 'react-redux';
import { WaterDailyNorma } from '../WaterDailyNorma/WaterDailyNorma.jsx';
import { WaterProgressBar } from '../WaterProgressBar/WaterProgressBar.jsx';
import Logo from '../Logo/Logo';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn.jsx';
import css from './WaterMainInfo.module.css';
import thermos1x from '../../img/thermos/thermos_desk@1x.png';
import thermos2x from '../../img/thermos/thermos_desk@2x.png';
import { selectDailyWaterNorma } from '../../redux/auth/selectors.js';

export const WaterMainInfo = ({ openModal }) => {
  const dailyNorm = useSelector(selectDailyWaterNorma);

  return (    
      <section className={css.section}>
        <Logo className={css.logo} />
        <img
          className={css.img}
          src={thermos1x}
          srcSet={`${thermos1x} 1x, ${thermos2x} 2x`}
          alt="thermos"
        />

        <div className={css.wrapper}>
          <div className={css.dailyNorm}>
            <div>
              <WaterDailyNorma dailyNorm={dailyNorm/1000} />
            </div>
          </div>
          <div className={css.waterBar}>
            <div>
              <WaterProgressBar dailyNorm={dailyNorm} />
            </div>
          </div>
          <div className={css.btn}>
            <div>
              <AddWaterBtn openModal={openModal} theme={'dark'} />
            </div>
          </div>
        </div>
      </section>
    
  );
};

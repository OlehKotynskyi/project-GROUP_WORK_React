// src/components/WaterMainInfo.jsx
import { WaterDailyNorma } from '../WaterDailyNorma/WaterDailyNorma.jsx';
import { WaterProgressBar } from '../WaterProgressBar/WaterProgressBar.jsx';
import Logo from '../Logo/Logo';
import {AddWaterBtn} from '../AddWaterBtn/AddWaterBtn.jsx'
import css from './WaterMainInfo.module.css';
import thermos1x from '../../img/thermos/thermos_desk@1x.png';
import thermos2x from '../../img/thermos/thermos_desk@2x.png';

export const WaterMainInfo = () => {
  // Assuming dailyNorm is passed as props from parent component
  const dailyNorm = 1500; // Example value, replace with actual value
  return (
    <>
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
            <WaterDailyNorma dailyNorm={dailyNorm} />
          </div>
          <div className={css.waterBar}>
            <WaterProgressBar currentAmount={1500} dailyNorm={dailyNorm} />
          </div>
          <div>
            <AddWaterBtn />
          </div>
        </div>

      </section>
    </>
  );
};

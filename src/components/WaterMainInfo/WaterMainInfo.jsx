import { useSelector } from 'react-redux';
import { WaterDailyNorma } from '../WaterDailyNorma/WaterDailyNorma.jsx';
import { WaterProgressBar } from '../WaterProgressBar/WaterProgressBar.jsx';
import Logo from '../Logo/Logo';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn.jsx';
import { motion } from 'framer-motion';
import css from './WaterMainInfo.module.css';
import thermos1x from '../../img/thermos/thermos_desk@1x.png';
import thermos2x from '../../img/thermos/thermos_desk@2x.png';
import { selectDailyWaterNorma } from '../../redux/auth/selectors.js';

export const WaterMainInfo = ({ openModal, selectedDate, currentDay }) => {
  const dailyNorm = useSelector(selectDailyWaterNorma);

  const dropInVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: {
      type: 'spring',
      stiffness: 950,
      damping: 17,
      mass: 1,
      duration: 0.5,
      delay: 0.4,
    },
  };

  return (
    <section className={css.section}>
      <Logo className={css.logo} />
      <motion.img
        className={css.img}
        src={thermos1x}
        srcSet={`${thermos1x} 1x, ${thermos2x} 2x`}
        alt="thermos"
        initial={{
          opacity: 0,
          scale: 0.1,
          rotate: 80,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
          x: '-50%',
          y: '-50%',
        }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 130,
          damping: 23,
          mass: 2.5,
          delay: 0.7,
        }}
      />

      <motion.div
        className={css.wrapper}
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.2 }}
      >
        <motion.div className={css.dailyNorm} variants={dropInVariants}>
          <div>
            <WaterDailyNorma dailyNorm={dailyNorm / 1000} />
          </div>
        </motion.div>
        <motion.div className={css.waterBar} variants={dropInVariants}>
          <div>
            <WaterProgressBar
              dailyNorm={dailyNorm}
              selectedDate={selectedDate}
              currentDay={currentDay}
            />
          </div>
        </motion.div>
        <motion.div className={css.btn} variants={dropInVariants}>
          <div>
            <AddWaterBtn openModal={openModal} theme={'dark'} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { WaterItem } from '../WaterItem/WaterItem';

import { selectWaters } from '../../redux/water/selectors';
import { fetchWaters } from '../../redux/water/operations';
import css from './WaterList.module.css';

export const WaterList = ({
  openModal,
  selectWater,
  selectedDate,
  currentDay,
}) => {
  const sectionRef = useRef(null);
  const waterData = useSelector(selectWaters);
  const dispatch = useDispatch();

  useEffect(() => {
    const dateToFetch = !selectedDate ? currentDay : selectedDate;
    if (dateToFetch) {
      dispatch(fetchWaters(dateToFetch));
    }
  }, [dispatch, currentDay, selectedDate]);

  const handleScroll = event => {
    const delta = Math.sign(event.deltaY);
    const scrollAmount = 40;
    sectionRef.current.scrollLeft += delta * scrollAmount;
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      className={css.sectionWaterList}
      ref={sectionRef}
      onWheel={handleScroll}
    >
      <ul className={css.waterList}>
        {waterData && waterData.length > 0 ? (
          waterData.map((item, index) => (
            <motion.li
              className={css.waterItem}
              key={item._id}
              onClick={() => selectWater(item)}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <WaterItem
                time={item.timeDose}
                amount={item.amountDose}
                openModal={openModal}
              />
            </motion.li>
          ))
        ) : (
          <li className={css.noDataText}>
            Oops it seems you haven't drunk water yet...
          </li>
        )}
      </ul>
    </section>
  );
};

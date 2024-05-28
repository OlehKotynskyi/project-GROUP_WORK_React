import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WaterItem } from '../WaterItem/WaterItem';
import { useDispatch } from 'react-redux';

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

  return (
    <section
      className={css.sectionWaterList}
      ref={sectionRef}
      onWheel={handleScroll}
    >
      <ul className={css.waterList}>
        {waterData && waterData.length > 0 ? (
          waterData.map(item => (
            <li
              className={css.waterItem}
              key={item._id}
              onClick={() => selectWater(item)}
            >
              <WaterItem
                time={item.timeDose}
                amount={item.amountDose}
                openModal={openModal}
              />
            </li>
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

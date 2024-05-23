import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { WaterItem } from '../WaterItem/WaterItem';
import { useDispatch } from 'react-redux';

import { selectWaters } from '../../redux/water/selectors';
import { fetchWaters } from '../../redux/water/operations';
import css from './WaterList.module.css';

export const WaterList = ({ openModal, selectWater, date }) => {
  const sectionRef = useRef(null);
  const waterData = useSelector(selectWaters);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWaters());
  }, [dispatch]);

  const filteredData = waterData
    ? waterData.filter(item => {
        const itemDate = new Date(`${item.dateDose}T${item.timeDose}`);
        return itemDate.toDateString() === date.toDateString();
      })
    : [];

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
        {filteredData &&
          filteredData.map(item => (
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
          ))}
      </ul>
    </section>
  );
};

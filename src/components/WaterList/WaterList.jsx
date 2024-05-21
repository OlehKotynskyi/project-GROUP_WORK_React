// src/components/WaterList/WaterList.jsx
import React, { useRef, useEffect } from 'react';
import { useSelector } from "react-redux";
import { WaterItem } from '../WaterItem/WaterItem';
import { useDispatch } from 'react-redux';

import { selectWaters } from '../../redux/water/selectors';
import { fetchWaters } from '../../redux/water/operations';
import css from './WaterList.module.css'

export const WaterList = ({ openModal }) => {
  const sectionRef = useRef(null);

  const handleScroll = (event) => {
    const delta = Math.sign(event.deltaY);
    const scrollAmount = 40;

    sectionRef.current.scrollLeft += delta * scrollAmount;
  }

  const waterData = useSelector(selectWaters);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWaters());
  }, [dispatch]);

  return (
    <section className={css.sectionWaterList} ref={sectionRef} onWheel={handleScroll}>
        <ul className={css.waterList}>
          {waterData && waterData.map((item, index) => (
            <li className={css.waterItem} key={index}>
              <WaterItem time={item.timeDose} amount={item.amountDose} openModal={openModal} />
            </li>
          ))}
      </ul>
    </section>
  );
};

// src/components/WaterList/WaterList.jsx
import React, { useRef } from 'react';
import { useSelector } from "react-redux";
import { WaterItem } from '../WaterItem/WaterItem';

import { selectWaters } from '../../redux/water/selectors';
import css from './WaterList.module.css'

export const WaterList = ({ openModal }) => {
  const sectionRef = useRef(null);

  const handleScroll = (event) => {
    const delta = Math.sign(event.deltaY);
    const scrollAmount = 40;

    sectionRef.current.scrollLeft += delta * scrollAmount;
  }

  const waterData = useSelector(selectWaters);

  return (
    <section className={css.sectionWaterList} ref={sectionRef} onWheel={handleScroll}>
      <ul>
        {waterData && waterData.map((item, index) => (
          <li key={index}>
            <WaterItem time={item.time} amount={item.amount} openModal={openModal} />
          </li>
        ))}
      </ul>
      
      
    </section>
  );
};

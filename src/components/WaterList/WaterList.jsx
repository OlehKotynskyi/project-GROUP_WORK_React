// src/components/WaterList/WaterList.jsx
import React, { useRef } from 'react';
import { WaterItem } from '../WaterItem/WaterItem';
import css from './WaterList.module.css'

export const WaterList = ({ waterData, openModal }) => {
  const sectionRef = useRef(null);

  const handleScroll = (event) => {
    const delta = Math.sign(event.deltaY);
    const scrollAmount = 40;

    sectionRef.current.scrollLeft += delta * scrollAmount;
  }
  return (
    <section className={css.sectionWaterList} ref={sectionRef} onWheel={handleScroll}>
        <ul className={css.waterList}>
          <li className={css.waterItem}>
            <WaterItem openModal={openModal}/>
          </li>
          <li className={css.waterItem}>
            <WaterItem openModal={openModal}/>
          </li>
          <li className={css.waterItem}>
            <WaterItem openModal={openModal}/>
          </li><li className={css.waterItem}>
            <WaterItem openModal={openModal}/>
          </li><li className={css.waterItem}>
            <WaterItem openModal={openModal}/>
          </li><li className={css.waterItem}>
            <WaterItem openModal={openModal}/>
          </li>
        </ul>
      {/* <ul>
        {waterData.map((item, index) => (
          <li key={index}>
            <WaterItem date={item.date} amount={item.amount} openModal={openModal} />
          </li>
        ))}
      </ul> */}
      
      
    </section>
  );
};

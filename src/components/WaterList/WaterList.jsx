// src/components/WaterList/WaterList.jsx
import React from 'react';
// import { WaterItem } from '../WaterItem/WaterItem';
import css from './WaterList.module.css'
import { WaterItem } from 'components/WaterItem/WaterItem';

export const WaterList = ({ waterData, openModal }) => {
  return (
    <section className={css.sectionWaterList}>
      <ul className={css.waterList}>
        <li className={css.waterItem}>
          <WaterItem openModal={openModal}/>
        </li>
        <li className={css.waterItem}>
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

// src/components/WaterList/WaterList.jsx
import React from 'react';
// import { WaterItem } from '../WaterItem/WaterItem';
import css from './WaterList.module.css'

export const WaterList = ({ waterData, openModal }) => {
  return (
    <section className={css.sectionWaterlist}>
      <h3>Water Consumption List</h3>
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

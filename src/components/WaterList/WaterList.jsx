// src/components/WaterList/WaterList.jsx
import React from 'react';
import { WaterItem } from '../WaterItem/WaterItem';

export const WaterList = ({ waterData, openModal }) => {
  return (
    <div>
      <h3>Water Consumption List</h3>
      <ul>
        {waterData.map((item, index) => (
          <li key={index}>
            <WaterItem date={item.date} amount={item.amount} openModal={openModal} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// src/components/DailyInfo.jsx
import { useState } from 'react';
import { ChooseDate } from '../ChooseDate/ChooseDate';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn';
import { WaterList } from '../WaterList/WaterList';
import css from './DailyInfo.module.css'

export const DailyInfo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <section className={css.dateInfo}>
      <div className={css.headerDailyInfo}>
        <p className={css.date}>Today</p>
      {/* <ChooseDate onChange={handleDateChange} /> */}
        <AddWaterBtn />
      </div>      
      <WaterList date={selectedDate} />
    </section>
  );
};

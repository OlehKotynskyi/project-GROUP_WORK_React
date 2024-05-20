// src/components/WaterDetailedInfo.jsx
import { useState } from 'react';
import { UserPanel } from '../UserPanel/UserPanel';
import { DailyInfo } from '../DailyInfo/DailyInfo';
import { MonthInfo } from '../MonthInfo/MonthInfo';
import css from './WaterDetailedInfo.module.css'

export const WaterDetailedInfo = ({ openModal }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
     };
  return (

    <section className={css.sectionDetailed}>
      <div className={css.contentContainer}>
        <UserPanel username="John Doe" openModal={openModal} />
        <DailyInfo openModal={openModal} selectedDate={selectedDate}/>
      </div>      
      <MonthInfo selectedDate={selectedDate} onDateChange={handleDateChange} />      
    </section>


  );
};

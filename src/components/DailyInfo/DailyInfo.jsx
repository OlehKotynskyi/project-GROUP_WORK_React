// src/components/DailyInfo.jsx
import { useState } from 'react';
import { ChooseDate } from '../ChooseDate/ChooseDate';
import { AddWaterBtnDetailInfo } from '../AddWaterBtnDetailInfo/AddWaterBtnDetailInfo';
import { WaterList } from '../WaterList/WaterList';
import css from './DailyInfo.module.css'
import { Slider } from 'components/Slider/Slider';

export const DailyInfo = ({openModal}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (

    <section className={css.dateInfo}>
      <div className={css.headerDailyInfo}>
        <p className={css.date}>Today</p>
      <ChooseDate onChange={handleDateChange} />
        <AddWaterBtnDetailInfo openModal={openModal}/>
      </div>      
      <WaterList date={selectedDate} openModal={openModal}/>
      <Slider />
    </section>

  );
};

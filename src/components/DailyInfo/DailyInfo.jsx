import { useState } from 'react';
import { AddWaterBtnDetailInfo } from '../AddWaterBtnDetailInfo/AddWaterBtnDetailInfo';
import { WaterList } from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

export const DailyInfo = ({ openModal }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  return (
    <section className={css.dateInfo}>
      <div className={css.headerDailyInfo}>
        <p className={css.date}>Today</p>
        <AddWaterBtnDetailInfo openModal={openModal} />
      </div>
      <WaterList date={selectedDate} openModal={openModal} />
    </section>
  );
};

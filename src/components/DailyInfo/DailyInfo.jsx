// src/components/DailyInfo.jsx
import { useState } from 'react';
import { ChooseDate } from '../ChooseDate/ChooseDate';
import { AddWaterBtn } from '../AddWaterBtn/AddWaterBtn';
import { WaterList } from '../WaterList/WaterList';

export const DailyInfo = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <div>
      <ChooseDate onChange={handleDateChange} />
      <AddWaterBtn />
      <WaterList date={selectedDate} />
    </div>
  );
};

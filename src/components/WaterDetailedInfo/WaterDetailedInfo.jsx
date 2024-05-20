// src/components/WaterDetailedInfo.jsx
import { useState } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../../redux/auth/operations';
import { selectUser } from '../../redux/auth/selectors';
import { UserPanel } from '../UserPanel/UserPanel';
import { DailyInfo } from '../DailyInfo/DailyInfo';
import { MonthInfo } from '../MonthInfo/MonthInfo';
import css from './WaterDetailedInfo.module.css'

 
export const WaterDetailedInfo = ({ openModal }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [selectedDate, setSelectedDate] = useState(new Date());
  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);
  const handleDateChange = date => {
    setSelectedDate(date);
     };
  return (

    <section className={css.sectionDetailed}>
      <div className={css.contentContainer}>
         <UserPanel username={user.name} openModal={openModal} />
        <DailyInfo openModal={openModal} selectedDate={selectedDate}/>       
      </div>      
      <MonthInfo selectedDate={selectedDate} onDateChange={handleDateChange} />      
    </section>


  );
};

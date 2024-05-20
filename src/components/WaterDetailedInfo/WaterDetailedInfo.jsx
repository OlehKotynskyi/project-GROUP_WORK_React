// src/components/WaterDetailedInfo.jsx
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

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);
  return (

    <section className={css.sectionDetailed}>
      <div className={css.contentContainer}>
        <UserPanel username={user.name} openModal={openModal} />
        <DailyInfo openModal={openModal}/>
      </div>      
      <MonthInfo />      
    </section>


  );
};

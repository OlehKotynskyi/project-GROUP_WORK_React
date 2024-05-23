// src/components/WaterDetailedInfo.jsx
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { UserPanel } from '../UserPanel/UserPanel';
import { DailyInfo } from '../DailyInfo/DailyInfo';
import { MonthInfo } from '../MonthInfo/MonthInfo';
import css from './WaterDetailedInfo.module.css'

 
export const WaterDetailedInfo = ({ openModal, selectWater, selectDate, selectedDate, currentDay, currentMonth}) => {
  const user = useSelector(selectUser);

  return (

    <section className={css.sectionDetailed}>
      <div className={css.contentContainer}>
        <UserPanel username={user.name} openModal={openModal} />
        <DailyInfo openModal={openModal} selectedDate={selectedDate} selectWater={selectWater} currentDay={currentDay} />       
      </div>      
      <MonthInfo selectedDate={selectedDate} selectDate={selectDate} currentMonth={currentMonth} />      
    </section>


  );
};

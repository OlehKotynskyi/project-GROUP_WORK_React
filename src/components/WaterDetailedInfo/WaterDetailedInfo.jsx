// src/components/WaterDetailedInfo.jsx
import { UserPanel } from '../UserPanel/UserPanel';
import { DailyInfo } from '../DailyInfo/DailyInfo';
import { MonthInfo } from '../MonthInfo/MonthInfo';
import css from './WaterDetailedInfo.module.css'

export const WaterDetailedInfo = ({openModal}) => {
  return (

    <section className={css.sectionDetailed}>
      <div className={css.contentContainer}>
        <UserPanel username="John Doe" openModal={openModal} />
        <DailyInfo openModal={openModal}/>
      </div>      
      <MonthInfo />      
    </section>


  );
};

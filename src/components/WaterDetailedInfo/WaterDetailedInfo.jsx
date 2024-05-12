// src/components/WaterDetailedInfo.jsx
import { UserPanel } from '../UserPanel/UserPanel';
import { DailyInfo } from '../DailyInfo/DailyInfo';
import { MonthInfo } from '../MonthInfo/MonthInfo';
import css from './WaterDetailedInfo.module.css'

export const WaterDetailedInfo = () => {
  return (
    <section className={css.sectionDetailed}>
      <UserPanel username="John Doe" />
      <DailyInfo />
      <MonthInfo />
      
    </section>
  );
};

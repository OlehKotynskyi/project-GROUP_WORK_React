// src/components/WaterDetailedInfo.jsx
import { UserPanel } from '../UserPanel/UserPanel';
import { DailyInfo } from '../DailyInfo/DailyInfo';
import { MonthInfo } from '../MonthInfo/MonthInfo';

export const WaterDetailedInfo = () => {
  return (
    <div>
      <h2>Detailed Information</h2>
      <UserPanel username="John Doe" />
      <DailyInfo />
      <MonthInfo />
    </div>
  );
};

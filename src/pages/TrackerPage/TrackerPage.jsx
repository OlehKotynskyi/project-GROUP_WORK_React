// src/pages/TrackerPage/TrackerPage.jsx
import { WaterMainInfo } from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import { WaterDetailedInfo } from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';
import { AddWaterBtn } from '../../components/AddWaterBtn/AddWaterBtn';
import style from '../Base.module.css';
function TrackerPage() {
  return (
    <div className={style.container}>
      <WaterMainInfo />
      <AddWaterBtn />
      <WaterDetailedInfo />
      
    </div>
  );
}

export default TrackerPage;

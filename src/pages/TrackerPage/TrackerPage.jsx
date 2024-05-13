// src/pages/TrackerPage/TrackerPage.jsx
import { WaterMainInfo } from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import { WaterDetailedInfo } from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';
import { AddWaterBtn } from '../../components/AddWaterBtn/AddWaterBtn';
import style from '../Base.module.css';
import css from './TrackerPage.module.css'
function TrackerPage() {
  return (
    <div className={`${style.container} ${css.trackerContainer}`}>
      <div>
        <WaterMainInfo />
        <AddWaterBtn />
      </div>
      <WaterDetailedInfo />
      
    </div>
  );
}

export default TrackerPage;

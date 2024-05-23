import dayjs from 'dayjs';
import { AddWaterBtnDetailInfo } from '../AddWaterBtnDetailInfo/AddWaterBtnDetailInfo';
import { WaterList } from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

export const DailyInfo = ({ openModal, selectedDate, selectWater, currentDay }) => {
  function formatDate(day) {
    const date = dayjs(day);
    return date.format('MMMM, D');
  };
  
  const formattedDate = formatDate(selectedDate);

  return (
    <section className={css.dateInfo}>
      <div className={css.headerDailyInfo}>
        <p className={css.date}>{selectedDate && formattedDate ? formattedDate : "Today"}</p>
        <AddWaterBtnDetailInfo openModal={openModal} />
      </div>
      <WaterList selectedDate={selectedDate} openModal={openModal} selectWater={selectWater} currentDay={currentDay} />
    </section>
  );
};

import { AddWaterBtnDetailInfo } from '../AddWaterBtnDetailInfo/AddWaterBtnDetailInfo';
import { WaterList } from '../WaterList/WaterList';
import css from './DailyInfo.module.css';

export const DailyInfo = ({ openModal, selectedDate}) => {
  const formatDate = date => {
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

   const isToday = date => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  // const handleDateChange = date => {
  //   setSelectedDate(date);
  // };

  return (
    <section className={css.dateInfo}>
      <div className={css.headerDailyInfo}>
        <p className={css.date}>{isToday(selectedDate) ? 'Today' : formatDate(selectedDate)}</p>
        <AddWaterBtnDetailInfo openModal={openModal} />
      </div>
      <WaterList date={selectedDate} openModal={openModal} />
      
    </section>
  );
};

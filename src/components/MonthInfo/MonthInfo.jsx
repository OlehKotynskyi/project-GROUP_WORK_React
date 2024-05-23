// src/components/MonthInfo.jsx
import { Calendar } from '../Calendar/Calendar';

export const MonthInfo = ({ selectedDate, selectDate, currentMonth }) => {
  return (
    <div>
      <Calendar selectedDay={selectedDate} selectDay={selectDate} currentMonth={currentMonth} />
    </div>
  );
};

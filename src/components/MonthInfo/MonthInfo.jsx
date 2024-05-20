// src/components/MonthInfo.jsx
import { Calendar } from '../Calendar/Calendar';

export const MonthInfo = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <Calendar selectedDate={selectedDate} onDateChange={onDateChange} />
    </div>
  );
};

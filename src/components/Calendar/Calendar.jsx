// src/components/Calendar.jsx
import { useState } from 'react';
import { CalendarItem } from '../CalendarItem/CalendarItem';
import { CalendarPagination } from '../CalendarPagination/CalendarPagination';

export const Calendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleChangeMonth = increment => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  // Generate calendar items for selected month
  const calendarItems = [];

  // Logic for generating calendar items goes here

  return (
    <div>
      <CalendarPagination onChangeMonth={handleChangeMonth} />
      {calendarItems.map(item => (
        <CalendarItem
          key={item.date}
          {...item}
          onClick={() => onSelectDate(item.date)}
        />
      ))}
    </div>
  );
};

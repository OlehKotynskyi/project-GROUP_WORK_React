// src/components/ChooseDate/ChooseDate.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

export const ChooseDate = ({ onChange }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
    onChange(date); // Передача нової дати в батьківський компонент через пропс onChange
  };

  return (
    <div>
      <label>Select Date:</label>
      {/* Компонент вибору дати з react-datepicker */}
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="MMMM d, yyyy" // Формат виводу дати
      />
    </div>
  );
};

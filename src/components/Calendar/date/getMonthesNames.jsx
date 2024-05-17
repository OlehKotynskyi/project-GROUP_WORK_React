// src/components/Calendar/date/getMonthesNames.jsx
//import { createDate } from './createDate';

export const getMonthesNames = () => {
  const monthesNames = Array.from({ length: 12 });

  const d = new Date();
  const englishMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  monthesNames.forEach((_, i) => {
    const monthIndex = (d.getMonth() + i) % 12;
    const date = new Date(d.getFullYear(), monthIndex, 1);

    const month = englishMonths[monthIndex];
    const monthShort = month.slice(0, 3);

    monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
  });

  return monthesNames;
};

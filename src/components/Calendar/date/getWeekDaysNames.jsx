// src/components/Calendar/date/getWeekDaysNames.jsx
import { createDate } from './createDate';

export const getWeekDaysNames = (firstWeekDay = 4, locale = 'default') => {
  const weekDaysNames = Array.from({ length: 7 });

  const date = new Date();

  weekDaysNames.forEach((_, i) => {
    const dayNumberInWeek = ((i + firstWeekDay - 1) % 7) + 1;
    const { day, dayShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i),
    });

    weekDaysNames[dayNumberInWeek - 1] = { day, dayShort };
  });

  return weekDaysNames;
};

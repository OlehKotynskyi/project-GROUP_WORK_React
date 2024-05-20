// src/components/Calendar.jsx
// import { useState } from 'react';
// import { CalendarItem } from '../CalendarItem/CalendarItem';
// import { CalendarPagination } from '../CalendarPagination/CalendarPagination';

import { useState, useEffect } from 'react';
import { checkDateIsEqual, checkIsToday } from './date';
import { useCalendar } from './hooks/useCalendar';
import css from './Calendar.module.css';

export const Calendar = ({
  locale = 'default',
  selectedDate,
  firstWeekDayNumber = 2,
  onDateChange
}) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate,
    firstWeekDayNumber,
  });

  const [waterPercentage, setWaterPercentage] = useState(0);

  useEffect(() => {
    const percentage = 0; // Ініціалізуємо значення waterPercentage
    setWaterPercentage(Math.min(100, percentage));
  }, []);
  const handleDateChange = date => {
    onDateChange(date);
  }
  return (
    <div className={css.calendar}>
      <div className={css.calendar__header}>
        <div
          aria-hidden
          className={css.calendar__header__arrow__left}
          onClick={() => functions.onClickArrow('left')}
        ></div>
        <div aria-hidden>
          {state.monthesNames[state.selectedMonth.monthIndex].month}{' '}
          {state.selectedYear}
        </div>
        <div
          aria-hidden
          className={css.calendar__header__arrow__right}
          onClick={() => functions.onClickArrow('right')}
        ></div>
      </div>
      <div className={css.calendar__body}>
        <div className={css.calendar__days}>
          {state.calendarDays.map(day => {
            const isToday = checkIsToday(day.date);
            const isSelectedDay = checkDateIsEqual(
              day.date,
              state.selectedDay.date
            );
            const isAdditionalDay =
              day.monthIndex !== state.selectedMonth.monthIndex;

            return (
              <div
                key={`${day.dayNumber}-${day.monthIndex}`}
                aria-hidden
                onClick={() => {
                  functions.setSelectedDay(day);
                  handleDateChange(day.date);
                  // selectDate(day.date);
                }}
                className={[
                  css.calendar__day,
                  isToday ? css.calendar__today__item : '',
                  isSelectedDay ? css.calendar__selected__item : '',
                  isAdditionalDay ? css.calendar__additional__day : '',
                ].join(' ')}
              >
                <div>{day.dayNumber}</div>
                <div
                  className={`${css.waterPercentage} my-custom-water-percentage`}
                  style={{ width: `${waterPercentage}%` }}
                >
                  {waterPercentage}%
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

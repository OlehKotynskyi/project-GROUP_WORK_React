// src/components/Calendar.jsx
// import { useState } from 'react';
// import { CalendarItem } from '../CalendarItem/CalendarItem';
// import { CalendarPagination } from '../CalendarPagination/CalendarPagination';

import { useState, useEffect } from 'react';
import { checkDateIsEqual, checkIsToday } from './date';
import { useCalendar } from './hooks/useCalendar';
import css from './Calendar.module.css';

const DAILY_WATER_INTAKE = 1500; // Припустима денна норма споживання води в мл

export const Calendar = ({
  locale = 'default',
  selectedDate,
  firstWeekDayNumber = 2,
}) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate,
    firstWeekDayNumber,
  });

  const [waterIntake, setWaterIntake] = useState(0);
  const [waterPercentage, setWaterPercentage] = useState(0);

  useEffect(() => {
    const percentage = ((waterIntake / DAILY_WATER_INTAKE) * 100).toFixed(0);
    setWaterPercentage(Math.min(100, percentage));
  }, [waterIntake]);

  const handleAddWater = () => {
    // Збільшуємо кількість спожитої води
    setWaterIntake(prevIntake => prevIntake + DAILY_WATER_INTAKE);
  };

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
      <button onClick={handleAddWater}></button> {/* Кнопка додавання води */}
    </div>
  );
};

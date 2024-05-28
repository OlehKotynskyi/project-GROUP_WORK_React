// src/components/Calendar.jsx
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWatersMonth } from '../../redux/water/operations';

import { checkDateIsEqual, checkIsToday } from './date';
import { useCalendar } from './hooks/useCalendar';
import css from './Calendar.module.css';

export const Calendar = ({
  locale = 'default',
  selectedDate,
  firstWeekDayNumber = 2,
  onDateChange,
  onMonthChangeProp,
  selectedDay,
  selectDay,
  currentMonth,
}) => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [waterPercentages, setWaterPercentages] = useState({});
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const { functions, state } = useCalendar({
    locale,
    selectedDate,
    firstWeekDayNumber,
  });

  const abortControllerRef = useRef(null);

  useEffect(() => {
    const dateToFetch = selectedMonth || currentMonth;
    if (dateToFetch) {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;

      dispatch(fetchWatersMonth(dateToFetch, { signal: controller.signal }))
        .then(response => {
          if (response.payload) {
            const newWaterPercentages = response.payload.reduce(
              (acc, water) => {
                const dateString = new Date(water.dateDose)
                  .toISOString()
                  .split('T')[0];
                acc[dateString] = (acc[dateString] || 0) + water.percentage;
                return acc;
              },
              {}
            );
            setWaterPercentages(newWaterPercentages);
          }
        })
        .catch(error => {
          if (error.name !== 'AbortError') {
            console.error('Failed to fetch waters for month:', error);
          }
        });
    }
  }, [dispatch, currentMonth, selectedMonth]);

  const handleSelectMonth = useCallback(newSelectedMonth => {
    setSelectedMonth(newSelectedMonth);
  }, []);

  const calendarDaysMemo = useMemo(
    () => state.calendarDays,
    [state.calendarDays]
  );

  return (
    <div className={css.calendar}>
      <div className={css.calendar__header}>
        <div
          aria-hidden
          className={css.calendar__header__arrow__left}
          onClick={() => {
            functions.onClickArrow('left');
            handleSelectMonth(() => {
              const month = state.selectedMonth;
              const monthIndex = month.monthIndex + 2;
              const formattedMonthIndex =
                monthIndex < 10 ? `0${monthIndex}` : month.monthIndex;
              return `${state.selectedYear}-${formattedMonthIndex}`;
            });
          }}
        ></div>
        <div aria-hidden>
          {state.monthesNames[state.selectedMonth.monthIndex].month}{' '}
          {state.selectedYear}
        </div>
        <div
          aria-hidden
          className={css.calendar__header__arrow__right}
          onClick={() => {
            functions.onClickArrow('right');
            handleSelectMonth(() => {
              const month = state.selectedMonth;
              const monthIndex = month.monthIndex + 2;
              const formattedMonthIndex =
                monthIndex < 10 ? `0${monthIndex}` : month.monthIndex;
              return `${state.selectedYear}-${formattedMonthIndex}`;
            });
          }}
        ></div>
      </div>
      <div className={css.calendar__body}>
        <div className={css.calendar__days}>
          {calendarDaysMemo.map((day, index) => {
            const isToday = checkIsToday(day.date);
            const isSelectedDay = checkDateIsEqual(
              day.date,
              state.selectedDay.date
            );
            const isAdditionalDay =
              day.monthIndex !== state.selectedMonth.monthIndex;
            const dateString = `${day.year}-${String(day.monthNumber).padStart(
              2,
              '0'
            )}-${String(day.dayNumber).padStart(2, '0')}`;
            const waterPercentage = waterPercentages[dateString] || 0;

            return (
              <div
                key={`${day.dayNumber}-${day.monthIndex}`}
                aria-hidden
                onClick={() => {
                  const monthIndex = day.monthIndex + 1;
                  const formattedMonthIndex =
                    monthIndex < 10 ? `0${monthIndex}` : day.monthIndex;
                  const selectedDate = `${day.year}-${formattedMonthIndex}-${day.dayNumber}`;

                  functions.setSelectedDay(day);
                  selectDay(selectedDate);
                  setSelectedDayIndex(index);
                }}
                tabIndex="0"
                className={[
                  css.calendar__day,
                  isToday ? css.calendar__today__item : '',
                  isSelectedDay ? css.calendar__selected__item : '',
                  isAdditionalDay ? css.calendar__additional__day : '',
                  index === selectedDayIndex ? css.calendar__day__selected : '',
                  waterPercentage < 100 ? css.calendar__day__incomplete : '', // Додаємо клас для днів з меншим ніж 100% води
                ].join(' ')}
              >
                <div>{day.dayNumber}</div>
                <div
                  className={`${css.waterPercentage} my-custom-water-percentage`}
                  style={{
                    width: `${waterPercentage}%`,
                  }}
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

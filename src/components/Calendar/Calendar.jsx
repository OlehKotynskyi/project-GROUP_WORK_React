// src/components/Calendar.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWaters } from '../../redux/water/operations';
import { selectWaters } from '../../redux/water/selectors';
import { selectDailyWaterNorma } from '../../redux/auth/selectors';
import { checkDateIsEqual, checkIsToday } from './date';
import { useCalendar } from './hooks/useCalendar';
import css from './Calendar.module.css';

export const Calendar = ({
  locale = 'default',
  selectedDate,
  firstWeekDayNumber = 2,
  onDateChange,
}) => {
  const dispatch = useDispatch();
  const waters = useSelector(selectWaters);
  const dailyWaterNorma = useSelector(selectDailyWaterNorma);

  const { functions, state } = useCalendar({
    locale,
    selectedDate,
    firstWeekDayNumber,
  });

  //  const [waterPercentage, setWaterPercentage] = useState(0);
  const [waterForSelectedDate, setWaterForSelectedDate] = useState(0);

  useEffect(() => {
    if (state.selectedDay.date) {
      dispatch(fetchWaters(state.selectedDay.date));
    }
  }, [dispatch, state.selectedDay.date]);

  useEffect(() => {
    if (waters && dailyWaterNorma && checkIsToday(state.selectedDay.date)) {
      const totalAmountForSelectedDate = waters.reduce((total, water) => {
        const waterDate = new Date(water.dateDose);
        if (checkDateIsEqual(waterDate, state.selectedDay.date)) {
          return total + water.amountDose;
        }
        return total;
      }, 0);

      const percentage = Math.min(
        (totalAmountForSelectedDate / dailyWaterNorma) * 100,
        100
      );
      setWaterForSelectedDate(Math.floor(percentage)); // Відсотки без десяткових знаків
    } else {
      setWaterForSelectedDate(0); // Якщо вода не була додана на цю дату, встановлюємо відсоток на 0%
    }
  }, [waters, dailyWaterNorma, state.selectedDay.date]);

  const handleDateChange = date => {
    setWaterForSelectedDate(0);
    onDateChange(date);
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
                  handleDateChange(day.date);
                }}
                className={[
                  css.calendar__day,
                  isToday ? css.calendar__today__item : '',
                  isSelectedDay ? css.calendar__selected__item : '',
                  isAdditionalDay ? css.calendar__additional__day : '',
                ].join(' ')}
              >
                <div>{day.dayNumber}</div>
                {isSelectedDay && (
                  <div
                    className={`${css.waterPercentage} my-custom-water-percentage`}
                    style={{
                      width: `${waterForSelectedDate}%`,
                    }}
                  >
                    {waterForSelectedDate}%
                  </div>
                )}
                {!isSelectedDay && (
                  <div
                    className={`${css.waterPercentage} my-custom-water-percentage`}
                  >
                    0%
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

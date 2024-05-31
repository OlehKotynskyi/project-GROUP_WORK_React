import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatersMonth } from '../../redux/water/operations';
import { selectMonthlyWaters } from '../../redux/water/selectors';
import { checkDateIsEqual, checkIsToday } from './date';
import { useCalendar } from './hooks/useCalendar';
import { setSelectedDate } from '../../redux/water/waterSlice';
import css from './Calendar.module.css';

const calculateWaterPercentages = waters => {
  return waters.reduce((acc, water) => {
    const dateString = new Date(water.dateDose).toISOString().split('T')[0];
    acc[dateString] = (acc[dateString] || 0) + water.percentage;
    return acc;
  }, {});
};

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
  const monthlyWaters = useSelector(selectMonthlyWaters);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [waterPercentages, setWaterPercentages] = useState({});
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);

  const { functions, state } = useCalendar({
    locale,
    selectedDate,
    firstWeekDayNumber,
  });

  const abortControllerRef = useRef(null);

  const updateWaterPercentages = useCallback(waters => {
    setWaterPercentages(calculateWaterPercentages(waters));
  }, []);

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
            updateWaterPercentages(response.payload);
          }
        })
        .catch(error => {
          if (error.name !== 'AbortError') {
            console.error('Failed to fetch waters for month:', error);
          }
        });
    }
  }, [dispatch, currentMonth, selectedMonth, updateWaterPercentages]);

  useEffect(() => {
    if (monthlyWaters) {
      updateWaterPercentages(monthlyWaters);
    }
  }, [monthlyWaters, updateWaterPercentages]);

  const handleSelectMonth = useCallback(newSelectedMonth => {
    setSelectedMonth(newSelectedMonth);
  }, []);

  const handleSelectDate = useCallback(
    (day, index) => {
      const monthIndex = day.monthIndex + 1;
      const formattedMonthIndex =
        monthIndex < 10 ? `0${monthIndex}` : day.monthIndex;
      const selectedDate = `${day.year}-${formattedMonthIndex}-${String(
        day.dayNumber
      ).padStart(2, '0')}`;

      functions.setSelectedDay(day);
      dispatch(setSelectedDate(selectedDate));
      selectDay(selectedDate);
      setSelectedDayIndex(index);
    },
    [functions, dispatch, selectDay]
  );

  const calendarDaysMemo = useMemo(
    () => state.calendarDays,
    [state.calendarDays]
  );

  const getClassNames = (isToday, isSelectedDay, isAdditionalDay, index, selectedDayIndex, waterPercentage) => {
    let classNames = [css.calendar__day];

    switch (true) {
      case isToday:
        classNames.push(css.calendar__today__item);
        break;
      case isSelectedDay:
        classNames.push(css.calendar__selected__item);
        break;
      case isAdditionalDay:
        classNames.push(css.calendar__additional__day);
        break;
      default:
        break;
    }

    if (index === selectedDayIndex) {
      classNames.push(css.calendar__day__selected);
    }
    if (waterPercentage < 100) {
      classNames.push(css.calendar__day__incomplete);
    }

    return classNames.join(' ');
  };

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
              const newMonthIndex =
                month.monthIndex === 0 ? 11 : month.monthIndex - 1;
              const newYear =
                month.monthIndex === 0
                  ? state.selectedYear - 1
                  : state.selectedYear;
              const formattedMonthIndex =
                newMonthIndex < 9 ? `0${newMonthIndex + 1}` : newMonthIndex + 1;
              return `${newYear}-${formattedMonthIndex}`;
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
              const newMonthIndex = (month.monthIndex + 1) % 12;
              const newYear =
                month.monthIndex === 11
                  ? state.selectedYear + 1
                  : state.selectedYear;
              const formattedMonthIndex =
                newMonthIndex < 9 ? `0${newMonthIndex + 1}` : newMonthIndex + 1;
              return `${newYear}-${formattedMonthIndex}`;
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
                onClick={() => handleSelectDate(day, index)}
                tabIndex="0"
                className={getClassNames(
                  isToday,
                  isSelectedDay,
                  isAdditionalDay,
                  index,
                  selectedDayIndex,
                  waterPercentage
                )}
              >
                <div>{day.dayNumber}</div>
                <div className={css.waterPercentageWrap}>
                  <div className={css.waterPercentage}>{waterPercentage}%</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

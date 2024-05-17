// src/components/Calendar/hooks/useCalendarItem.jsx
import { useState, useMemo } from 'react';
import {
  getMonthesNames,
  getWeekDaysNames,
  //  getMonthNumberOfDays,
  createMonth,
  createDate,
} from '../date';

//const DAYS_IN_WEEK = 7;

const getYearsInterval = year => {
  const startYear = Math.floor(year / 10) * 10;
  return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = props => {
  const {
    locale = 'default',
    selectedDate: date,
    firstWeekDayNumber = 2,
  } = props;

  const [mode, setMode] = useState('days');
  const [selectedDay, setSelectedDay] = useState(createDate({ date }));
  const [selectedMonth, setSelectedMonth] = useState(
    createMonth({
      date: new Date(selectedDay.year, selectedDay.monthIndex),
      locale,
    })
  );
  const [selectedYear, setSelectedYear] = useState(selectedDay.year);
  const [selectedYearsInterval, setSelectedYearsInterval] = useState(
    getYearsInterval(selectedDay.year)
  );

  const monthesNames = useMemo(() => getMonthesNames(locale), [locale]);
  const weekDaysNames = useMemo(
    () => getWeekDaysNames(firstWeekDayNumber, locale),
    [firstWeekDayNumber, locale]
  );

  const days = useMemo(() => {
    return selectedMonth.createMonthDays();
  }, [selectedMonth]);

  const calendarDays = useMemo(() => {
    const result = [];
    days.forEach((day, index) => {
      result[index] = day;
    });
    return result;
  }, [days]);

  function onClickArrow(direction) {
    if (mode === 'years' && direction === 'left') {
      setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] - 10));
    }

    if (mode === 'years' && direction === 'right') {
      setSelectedYearsInterval(getYearsInterval(selectedYearsInterval[0] + 10));
    }

    if (mode === 'monthes' && direction === 'left') {
      const year = selectedYear - 1;
      if (!selectedYearsInterval.includes(year)) {
        setSelectedYearsInterval(getYearsInterval(year));
      }
      setSelectedYear(year);
    }

    if (mode === 'monthes' && direction === 'right') {
      const year = selectedYear + 1;
      if (!selectedYearsInterval.includes(year)) {
        setSelectedYearsInterval(getYearsInterval(year));
      }
      setSelectedYear(year);
    }

    if (mode === 'days') {
      const monthIndex =
        direction === 'left'
          ? selectedMonth.monthIndex - 1
          : selectedMonth.monthIndex + 1;
      if (monthIndex === -1) {
        const year = selectedYear - 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) {
          setSelectedYearsInterval(getYearsInterval(year));
        }
        setSelectedMonth(
          createMonth({ date: new Date(selectedYear - 1, 11), locale })
        );
      }

      if (monthIndex === 12) {
        const year = selectedYear + 1;
        setSelectedYear(year);
        if (!selectedYearsInterval.includes(year)) {
          setSelectedYearsInterval(getYearsInterval(year));
        }
        setSelectedMonth(createMonth({ date: new Date(year, 0), locale }));
      }

      setSelectedMonth(
        createMonth({ date: new Date(selectedYear, monthIndex), locale })
      );
    }
  }

  const setSelectedMonthByIndex = monthIndex => {
    setSelectedMonth(
      createMonth({ date: new Date(selectedYear, monthIndex), locale })
    );
  };

  return {
    state: {
      mode,
      calendarDays,
      weekDaysNames,
      monthesNames,
      selectedDay,
      selectedMonth,
      selectedYear,
      selectedYearsInterval,
    },
    functions: {
      onClickArrow,
      setMode,
      setSelectedDay,
      setSelectedMonthByIndex,
      setSelectedYear,
      setSelectedYearsInterval,
    },
  };
};

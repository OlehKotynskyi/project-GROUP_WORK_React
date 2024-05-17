// src/components/Calendar/date/getMonthNumberOfDays.jsx
export const getMonthNumberOfDays = (
  monthIndex,
  yearNumber = new Date().getFullYear()
) => {
  const lastDayOfMonth = new Date(yearNumber, monthIndex + 1, 0);
  return lastDayOfMonth.getDate();
};

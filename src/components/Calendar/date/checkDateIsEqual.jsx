// src/components/Calendar/date/checkDateIsEqual.jsx
export const checkDateIsEqual = (date1, date2) => {
  // Перевіряємо, чи обидві дати визначені
  if (!date1 || !date2) {
    return false;
  }

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

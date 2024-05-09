// src/components/CalendarItem.jsx
export const CalendarItem = ({ date, waterAmount, onClick }) => {
  return (
    <button onClick={onClick}>
      {date.getDate()} - {waterAmount}%
    </button>
  );
};

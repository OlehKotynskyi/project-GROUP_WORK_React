// src/components/CalendarPagination.jsx
export const CalendarPagination = ({ onChangeMonth }) => {
  return (
    <div>
      <button onClick={() => onChangeMonth(-1)}>&lt;</button>
      <button onClick={() => onChangeMonth(1)}>&gt;</button>
    </div>
  );
};

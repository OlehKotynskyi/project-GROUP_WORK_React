// src/components/WaterItem.jsx
export const WaterItem = ({ date, amount, openModal }) => {
  return (
    <div>
      <div>Date: {date}</div>
      <div>Amount: {amount}</div>
      <button onClick={() => openModal("delete")}>Delete</button>
      <button onClick={() => openModal("edit")}>Edit</button>
    </div>
  );
};

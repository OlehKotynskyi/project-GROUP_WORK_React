// src/components/AddWaterBtn.jsx
export const AddWaterBtn = ({openModal}) => {
  return (
    <>
      <button onClick={() => openModal("add")}>Add Water</button>
    </>
  );
};

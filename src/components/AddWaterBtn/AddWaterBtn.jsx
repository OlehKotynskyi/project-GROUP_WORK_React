// src/components/AddWaterBtn.jsx
export const AddWaterBtn = ({openAddWaterModal}) => {
  return (
    <>
      <button onClick={() => openAddWaterModal("add")}>Add Water</button>
    </>
  );
};

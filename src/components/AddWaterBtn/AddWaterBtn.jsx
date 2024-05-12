// src/components/AddWaterBtn.jsx
import { useState } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { AddWaterForm } from '../WaterForm/AddWaterForm.jsx';

export const AddWaterBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddWater = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button onClick={handleAddWater}>Add Water</button>
      {isModalOpen && (
        <Modal title="Add Water" onClose={closeModal}>
          <AddWaterForm onClose={closeModal} />
        </Modal>
      )}
    </>
  );
};

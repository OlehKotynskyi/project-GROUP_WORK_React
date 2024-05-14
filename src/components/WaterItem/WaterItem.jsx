// src/components/WaterItem.jsx
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import { EditWaterForm } from '../WaterForm/EditWaterForm';

export const WaterItem = ({ date, amount, onDelete, onEdit }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
  };

  return (
    <div>
      <div>Date: {date}</div>
      <div>Amount: {amount}</div>
      <button onClick={onDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
      {isEditModalOpen && (
        <Modal title="Edit Water" onClose={closeModal}>
          <EditWaterForm
            date={date}
            amount={amount}
            onClose={closeModal}
            onSave={onEdit}
          />
        </Modal>
      )}
    </div>
  );
};

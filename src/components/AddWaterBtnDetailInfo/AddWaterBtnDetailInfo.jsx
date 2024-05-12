// src/components/AddWaterBtn.jsx
import { useState } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { WaterForm } from '../WaterForm/WaterForm.jsx';
import css from './AddWaterBtnDetailInfo.module.css'

export const AddWaterBtnDetailInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddWater = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className={css.btnAddWater} onClick={handleAddWater}>        
          <svg className={css.iconPlus} width='30px' height='30px' fill="currentColor">
            <use xlinkHref='../../img/svg/plus.svg' ></use>
          </svg>
          <span className={css.addWaterText}>Add Water</span>      
      </button>
      {isModalOpen && (
        <Modal title="Add Water" onClose={closeModal}>
          <WaterForm onClose={closeModal} />
        </Modal>
      )}
    </>
  );
};

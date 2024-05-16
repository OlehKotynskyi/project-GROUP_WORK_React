import { useState } from 'react';
import { Modal } from '../Modal/Modal.jsx';
import { WaterForm } from '../WaterForm/WaterForm.jsx';
import sprite from '../../img/svg/sprite.svg';
import css from './AddWaterBtnDetailInfo.module.css';

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
        <div className={css.addBtnContainer}>
          <svg className={css.iconPlus} width="18px" height="18px">
            <use xlinkHref={`${sprite}#icon-plus`}></use>
          </svg>
        </div>
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
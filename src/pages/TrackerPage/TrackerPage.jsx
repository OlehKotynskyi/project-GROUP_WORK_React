// src/pages/TrackerPage/TrackerPage.jsx
import { useState } from 'react';
import ReactModal from 'react-modal';

import { WaterMainInfo } from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import { WaterDetailedInfo } from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';
import { Modal } from 'components/Modal/Modal';
import { WaterModal } from 'components/WaterModal/WaterModal';
import { DeleteWaterModal } from 'components/DeleteWaterModal/DeleteWaterModal';
import { LogOutModal } from 'components/LogOutModal/LogOutModal';
import { AddWaterForm } from 'components/WaterForm/AddWaterForm';
import { EditWaterForm } from 'components/WaterForm/EditWaterForm';
import UserSettingsModal from 'components/UserSettingsModal/UserSettingsModal.jsx';
import css from './TrackerPage.module.css'

//import css from './TrakerPage.module.css'
import style from '../Base.module.css';
ReactModal.setAppElement('#root');


function TrackerPage() {
  const [modal, setModal] = useState({ isOpen: false, content: null });
  const [selectedWater, setSelectedWater] = useState(null);

  function openModal(content) {
    setModal({ isOpen: true, content });
  }

  function afterOpenModal() {
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setModal({ isOpen: false, content: null });
    document.body.style.overflow = 'scroll';
  }

  return (

    <div className={`${style.container} ${css.trackerContainer}`}>
      <div>
        <WaterMainInfo openModal={openModal}/>
        {modal.isOpen && <Modal isMainModalOpen={modal.isOpen} onClose={closeModal} onAfterOpen={afterOpenModal}>
        {((modal.content === "add") || (modal.content === "edit")) && (
          <WaterModal modal={modal} onClose={closeModal}>
            {modal.content === "add" && <AddWaterForm onClose={closeModal} />}
            {modal.content === "edit" && <EditWaterForm onClose={closeModal} selectedWater={selectedWater} />}
          </WaterModal>
        )}
        {modal.content === "delete" && <DeleteWaterModal onClose={closeModal} />}
        {modal.content === "logout" && <LogOutModal onClose={closeModal} />}
        {modal.content === "settings" && <UserSettingsModal onClose={closeModal} />}
      </Modal>}
      </div>
      <WaterDetailedInfo openModal={openModal} />
    </div>
  );
}

export default TrackerPage;

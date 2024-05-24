// src/pages/TrackerPage/TrackerPage.jsx
import { useState } from 'react';
import ReactModal from 'react-modal';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';


import { WaterMainInfo } from '../../components/WaterMainInfo/WaterMainInfo.jsx';
import { WaterDetailedInfo } from '../../components/WaterDetailedInfo/WaterDetailedInfo.jsx';
import { Modal } from 'components/Modal/Modal';
import { WaterModal } from 'components/WaterModal/WaterModal';
import { DeleteWaterModal } from 'components/DeleteWaterModal/DeleteWaterModal';
import { LogOutModal } from 'components/LogOutModal/LogOutModal';
import { AddWaterForm } from 'components/WaterForm/AddWaterForm';
import { EditWaterForm } from 'components/WaterForm/EditWaterForm';
import UserSettingsModal from 'components/UserSettingsModal/UserSettingsModal.jsx';

import style from '../Base.module.css';
import css from './TrakerPage.module.css';

ReactModal.setAppElement('#root');

function TrackerPage() {
  const [modal, setModal] = useState({ isOpen: false, content: null });
  const [selectedWater, setSelectedWater] = useState(null);
  const [selectedDateDose, setSelectedDateDose] = useState(null);

  const currentDay = dayjs().format('YYYY-MM-DD');
  const currentMonth = dayjs().format('YYYY-MM');

  function openModal(content, water) {
    setModal({ isOpen: true, content });
  }

  function afterOpenModal() {
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setModal({ isOpen: false, content: null });
    document.body.style.overflow = 'scroll';
  }
  
  function hendleSelectWater(water) {
    setSelectedWater(water);
  }

    function handleSelectDate(dateDose) {
    setSelectedDateDose(dateDose);
  }

  return (
    <div className={`${style.container} ${css.trakerPageContainer}`}>
      <Helmet>
        <title>Tracker</title>
      </Helmet>
      <div>
        <WaterMainInfo openModal={openModal} selectedDate={selectedDateDose} currentDay={currentDay}/>
        {modal.isOpen && (
          <Modal
            isMainModalOpen={modal.isOpen}
            onClose={closeModal}
            onAfterOpen={afterOpenModal}
          >
            {(modal.content === 'add' || modal.content === 'edit') && (
              <WaterModal modal={modal} onClose={closeModal}>
                {modal.content === 'add' && (
                  <AddWaterForm onClose={closeModal} />
                )}
                {modal.content === 'edit' && (
                  <EditWaterForm
                    onClose={closeModal}
                    selectedWater={selectedWater}
                  />
                )}
              </WaterModal>
            )}
            {modal.content === 'delete' && (
              <DeleteWaterModal
                onClose={closeModal}
                selectedWater={selectedWater}
              />
            )}
            {modal.content === 'logout' && <LogOutModal onClose={closeModal} />}
            {modal.content === 'settings' && (
              <UserSettingsModal onClose={closeModal} />
            )}
          </Modal>
        )}
      </div>

      <WaterDetailedInfo
        openModal={openModal}
        selectWater={hendleSelectWater}
        selectDate={handleSelectDate}
        selectedDate={selectedDateDose}
        currentDay={currentDay}
        currentMonth={currentMonth}
      />
    </div>
  );
}

export default TrackerPage;

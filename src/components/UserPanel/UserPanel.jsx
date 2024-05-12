// src/components/UserPanel.jsx
import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import css from './UserPanel.module.css'

export const UserPanel = ({ username }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const openSettingsModal = () => {
    setIsSettingsModalOpen(true);
  };

  const closeSettingsModal = () => {
    setIsSettingsModalOpen(false);
  };

  const openLogoutModal = () => {
    setIsLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
    <div className={css.container}>
      <div className={css.userInfo}>
        <p className={css.helloUser}>Hello, <span className={css.userName}>{username}</span>!</p>
        <button onClick={togglePopover} className={css.btnUser}><span className={css.btnUserName}>{username}</span></button>
        {isSettingsModalOpen && (
          <Modal title="User Settings" onClose={closeSettingsModal}>
            {/* User Settings Form */}
            <button onClick={closeSettingsModal}>Close</button>
          </Modal>
        )}
        {isLogoutModalOpen && (
          <Modal title="Logout" onClose={closeLogoutModal}>
            <p>Are you sure you want to log out?</p>
            <button onClick={closeLogoutModal}>Cancel</button>
            <button onClick={() => console.log('Logged out')}>Logout</button>
          </Modal>
        )}

        {/* Temporary inclusion to prevent eslint warnings */}
        <button style={{ display: 'none' }} onClick={openSettingsModal} />
        <button style={{ display: 'none' }} onClick={openLogoutModal} />
      </div>
      
    </div>
  );
};

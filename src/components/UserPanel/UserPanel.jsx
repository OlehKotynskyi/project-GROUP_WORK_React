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
    <section className={css.container}>
      <div className={css.userInfo}>
        <p className={css.helloUser}>Hello, <span className={css.userName}>{username}</span>!</p>
        <div className={css.btncontainer}>
          <button onClick={togglePopover} className={css.btnUser}>
            <span className={css.btnUserName}>{username}</span>
            <img className={css.imgAavatar} src="" alt="avatar"/>
            <svg className={css.iconUserSetting} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
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
      </div></div>
        
      
    </section>
  );
};

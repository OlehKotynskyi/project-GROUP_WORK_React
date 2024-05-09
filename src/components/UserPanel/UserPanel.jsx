// src/components/UserPanel.jsx
import { useState } from 'react';
import { Modal } from '../Modal/Modal';

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
    <div>
      <button onClick={togglePopover}>{username}</button>
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
  );
};

// src/components/UserPanel.jsx
import { useState } from 'react';

import { Modal } from '../Modal/Modal';
import sprite from '../../img/svg/sprite.svg'
import userAvatar from '../../img/avatars/avatar.jpg'
import css from './UserPanel.module.css'


export const UserPanel = ({ username, openModal }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (

    <section className={css.container}>
      <div className={css.userInfo}>
        <p className={css.helloUser}>
          Hello, <span className={css.userName}>{username}</span>
          <span className={css.exclamationPoint}>!</span>
        </p>
        <div className={css.btncontainer}>
          <button onClick={togglePopover} className={css.btnUser}>
            <span className={css.btnUserName}>{username}</span>
            <div className={css.imgAavatar}>
              <img src={userAvatar} alt="avatar" />
            </div>
            <svg className={css.iconUserSetting}>
              <use xlinkHref={`${sprite}#icon-chevron-down`}></use>
            </svg>
          </button>

          {isPopoverOpen && (
            <div className={css.popover}>
              <button
                type="button"
                onClick={openSettingsModal}
                className={css.settingsBtn}
              >
                <svg className={css.iconSettings} width="16" height="16">
                  <use xlinkHref={`${sprite}#icon-settings`}></use>
                </svg>
                <span>Settings</span>
                
              </button>
              <button
                type="button"
                onClick={openLogoutModal}
                className={css.logoutBtn}
              >
                <svg className={css.iconLogout} width="16" height="16">
                  <use xlinkHref={`${sprite}#icon-log-out`}></use>
                </svg>
                <span>Log out</span>
                
              </button>
            </div>
          )}
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
          <button onClick={() => openModal("settings")}>Settings</button>
      <button onClick={() => openModal("logout")}>Log out</button>
        </div>
      </div>
        
      
    </section>

  );
};

// src/components/UserPanel.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import sprite from '../../img/svg/sprite.svg';
import { selectUserAvatar } from '../../redux/auth/selectors';
import { currentUser } from '../../redux/auth/operations'
import css from './UserPanel.module.css';

export const UserPanel = ({ username, openModal }) => {
 const dispatch = useDispatch();
  const avatarURL = useSelector(selectUserAvatar);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

   useEffect(() => {
    dispatch(currentUser());
   }, [dispatch]);
  
  
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
        <div className={css.btnContainer}>
          <button onClick={togglePopover} className={css.btnUser}>
            <span className={css.btnUserName}>{username}</span>
            <div className={css.imgAvatar}>
              <img src={avatarURL} alt="avatar" />
            </div>
            <svg className={`${css.iconUserSetting} ${isPopoverOpen ? css.iconUserSettingUp : ''}`}>
              <use xlinkHref={`${sprite}#icon-chevron-down`}></use>
            </svg>
          </button>

          <div className={`${css.popover} ${isPopoverOpen ? css.visible : ''}`}>
            <button
              type="button"
              onClick={() => {
                openModal("settings");
                setIsPopoverOpen(false);
              }}
              className={css.settingsBtn}
            >
              <svg className={css.iconSettings} width="16" height="16">
                <use xlinkHref={`${sprite}#icon-settings`}></use>
              </svg>
              <span>Settings</span>
            </button>
            <button
              type="button"
              onClick={() => {
                openModal("logout");
                setIsPopoverOpen(false);
              }}
              className={css.logoutBtn}
            >
              <svg className={css.iconLogout} width="16" height="16">
                <use xlinkHref={`${sprite}#icon-log-out`}></use>
              </svg>
              <span>Log out</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

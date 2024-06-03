import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import sprite from '../../img/svg/sprite.svg';
import { selectUserAvatar } from '../../redux/auth/selectors';
import { currentUser } from '../../redux/auth/operations';
import css from './UserPanel.module.css';

export const UserPanel = ({ username, openModal }) => {
  const dispatch = useDispatch();
  const avatarURL = useSelector(selectUserAvatar);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [hovered, setHovered] = useState(false);
  const popoverRef = useRef(null);
  const btnContainerRef = useRef(null);

  useEffect(() => {
    dispatch(currentUser());
  }, [dispatch]);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const handleClickOutside = event => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      btnContainerRef.current &&
      !btnContainerRef.current.contains(event.target)
    ) {
      setIsPopoverOpen(false);
    }
  };

  useEffect(() => {
    if (isPopoverOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopoverOpen]);

  // Перевірка, чи username існує та обробка його відображення
  const isMobile = window.innerWidth < 768;
  const displayUsername = username
    ? isMobile
      ? username.length > 10
        ? `${username.slice(0, 10)}...`
        : username
      : username.length > 15
      ? `${username.slice(0, 15)}...`
      : username
    : '';

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  return (
    <motion.section
      className={css.container}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 250, damping: 15, mass: 0.6 }}
    >
      <div className={css.userInfo}>
        <motion.p
          className={css.helloUser}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Hello,{' '}
          <motion.span
            className={css.userName}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              mass: 0.6,
              duration: 0.5,
              ease: 'easeOut',
              delay: 0.4,
            }}
            onMouseEnter={() => setIsTooltipVisible(true)}
            onMouseLeave={() => setIsTooltipVisible(false)}
          >
            {displayUsername}
          </motion.span>
          <span className={css.exclamationPoint}>!</span>
        </motion.p>
        {isTooltipVisible && username && (
          <motion.div
            className={css.tooltip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {username}
          </motion.div>
        )}
        <div className={css.btnContainer} ref={btnContainerRef}>
          <button className={css.btnUser}>
            <span className={css.btnUserName} onClick={togglePopover}>
              {displayUsername}
            </span>
            <motion.div
              className={css.imgAvatar}
              onClick={() => setSelectedId('avatar')}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              animate={{
                scale: hovered ? 1.2 : 1,
                boxShadow: hovered ? '0 0 15px rgba(0,0,0,0.2)' : 'none',
                rotate: hovered ? [0, -2, 2, 0] : 0,
                borderRadius: '50%',
                zIndex: 10
              }}
              transition={{ type: 'tween', duration: 0.350 }}
              layoutId="avatar"
            >
              <img src={avatarURL} alt="avatar" />
            </motion.div>
            <svg
              className={`${css.iconUserSetting} ${
                isPopoverOpen ? css.iconUserSettingUp : ''
              }`}
              onClick={togglePopover}
            >
              <use xlinkHref={`${sprite}#icon-chevron-down`}></use>
            </svg>
          </button>

          <div
            ref={popoverRef}
            className={`${css.popover} ${isPopoverOpen ? css.visible : ''}`}
          >
            <button
              type="button"
              onClick={() => {
                openModal('settings');
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
                openModal('logout');
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
      <AnimatePresence>
        {selectedId && (
          <motion.div
            className={css.overlay}
            onClick={() => setSelectedId(null)}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={backdropVariants}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={css.expandedAvatar}
              layoutId="avatar"
              onClick={e => e.stopPropagation()}
              variants={avatarVariants}
              initial={{ borderRadius: '50%', width: 320, height:380 }}
              animate={{ borderRadius: '50%', width: 320, height: 380 }}
              exit={{ borderRadius: '50%', width: 38, height: 38 }}
              transition={{ duration: 0.35099 }}
            >
              <img src={avatarURL} alt="avatar enlarged" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

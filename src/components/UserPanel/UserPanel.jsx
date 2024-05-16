// src/components/UserPanel.jsx
import { useState } from 'react';

export const UserPanel = ({ username, openModal }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const togglePopover = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  return (
    <div>
      <button onClick={togglePopover}>{username}</button>
      <button onClick={() => openModal("settings")}>Settings</button>
      <button onClick={() => openModal("logout")}>Log out</button>
    </div>
  );
};

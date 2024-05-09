// src/components/Modal.jsx
import { useEffect } from 'react';

export const Modal = ({ title, children, onClose }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleOutsideClick = event => {
      if (!event.target.closest('.modalContent')) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [onClose]);

  return (
    <div>
      <div>
        <div>
          <h2>{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

import ReactModal from 'react-modal';
import css from './Modal.module.css';

export const Modal = ({ isMainModalOpen, children, onClose }) => {
  return (
    <div>
      <ReactModal
        isOpen={isMainModalOpen}
        onRequestClose={onClose}
        className={css.modal}
        overlayClassName={css.backdrop}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={true}
      >
        {children}
      </ReactModal>
    </div>
  );
};

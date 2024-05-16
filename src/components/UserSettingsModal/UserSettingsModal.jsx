import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';

import { Modal } from '../Modal/Modal';

import css from './UserSettingsModal.module.css';

export default function UserSettingsModal() {
  let isMainModalOpen = true;
  const onAfterOpen = () => {
    console.log('opened modal');
  };
  const onClose = () => {
    isMainModalOpen = false;
  };
  return (
    <div className={css.modalSetting}>
      <h1 className={css.formTitle}>Setting</h1>

      <Modal
        isMainModalOpen={isMainModalOpen}
        onClose={onClose}
        onAfterOpen={onAfterOpen}
      />
      <UserSettingsForm />
    </div>
  );
}

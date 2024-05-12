import UserSettingsModal from '../UserSettingsModal/UserSettingsModal'
import css from './UserSettingsForm.module.css'

export default function UserSettingsForm() {
  return (
    <section className={css.section}>
      <h1>Setting</h1>
      <UserSettingsModal/>
    </section>
  );
}
import { Link } from 'react-router-dom';
import css from './Logo.module.css';

export default function Logo() {
  return (
    <Link className={css.logo} to="/">
      AquaTrack
    </Link>
  );
}

//pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';
import style from '../Base.module.css';
function NotFoundPage() {
  return (
    <div className={style.container}>
      <h1>Sorry! Page not found</h1>
      <Link to="/">Back to home page</Link>
    </div>
  );
}
export default NotFoundPage;

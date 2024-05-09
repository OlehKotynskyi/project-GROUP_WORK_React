// components/SharedLayout.js
import stayle from '../../pages/Base.module.css';
export const SharedLayout = ({ children }) => {
  return (
    <div className={stayle.wrapper}>
      <header>header</header>
      <main>{children}</main>
      <footer>footer</footer>
    </div>
  );
};

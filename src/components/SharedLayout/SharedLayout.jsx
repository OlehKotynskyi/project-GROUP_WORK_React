// components/SharedLayout.js
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import stayle from '../../pages/Base.module.css';
export const SharedLayout = () => {
  return (
    <div className={stayle.wrapper}>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};

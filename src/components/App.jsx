//src/components/App.jsx
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { SharedLayout } from '../components/SharedLayout/SharedLayout';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('../pages/SignInPage/SignInPage'));
const TrackerPage = lazy(() => import('../pages/TrackerPage/TrackerPage'));

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Toaster />
    </>
  );
};

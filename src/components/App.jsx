import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../redux/auth/operations.js';
import { useSelector } from 'react-redux';
import { selectAccessToken } from '../redux/auth/selectors.js';
import { fetchWatersMonth } from '../redux/water/operations';

import { SharedLayout } from '../components/SharedLayout/SharedLayout';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';

import { RestrictedRoute } from './RestrictedRoute';
import { PrivateRoute } from './PrivateRoute';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage/SignUpPage'));
const SignInPage = lazy(() => import('../pages/SignInPage/SignInPage'));
const TrackerPage = lazy(() => import('../pages/TrackerPage/TrackerPage'));

export const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAccessToken);

  useEffect(() => {
    if (!token) return;
    dispatch(refreshUser());
  }, [dispatch, token]);

  const handleMonthChange = month => {
    dispatch(fetchWatersMonth(month));
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/signup"
              element={
                <RestrictedRoute
                  redirectTo="/tracker"
                  component={<SignUpPage />}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <RestrictedRoute
                  redirectTo="/tracker"
                  component={<SignInPage />}
                />
              }
            />
            <Route
              path="/tracker"
              element={
                <PrivateRoute
                  redirectTo="/signin"
                  component={<TrackerPage onMonthChange={handleMonthChange} />}
                />
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster />
    </>
  );
};

//src/components/App.jsx
import { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SharedLayout } from '../components/SharedLayout/SharedLayout.jsx';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage.jsx';
const HomePage = lazy(() => import('../pages/HomePage/HomePage.jsx'));
const SignUpPage = lazy(() => import('../pages/SignUpPage/SignUpPage.jsx'));
const SignInPage = lazy(() => import('../pages/SignInPage/SignInPage.jsx'));
const TrackerPage = lazy(() => import('../pages/TrackerPage/TrackerPage.jsx'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/tracker" element={<TrackerPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

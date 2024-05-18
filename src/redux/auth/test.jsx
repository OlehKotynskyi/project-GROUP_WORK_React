import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  signUp,
  signIn,
  signOut,
  refreshUser,
  updateUserAvatar,
  currentUser,
  updateUserInfo,
  googleAuthenticateUser,
  verifyEmail,
  resendVerificationToken,
} from './operations';

const ExampleComponent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Example usage of signUp
    dispatch(signUp({ email: 'John.doe60@example.com', password: 'password' }));

    // Example usage of signIn
    dispatch(signIn({ email: 'john.doe10@example.com', password: 'password' }));

    // Example usage of logOut
    dispatch(signOut());

    // Example usage of refreshUser
    dispatch(refreshUser());

    // Example usage of updateUserAvatar
    dispatch(updateUserAvatar({ avatarData: 'mockAvatarData' }));

    // Example usage of currentUser
    dispatch(currentUser());

    // Example usage of updateUserInfo
    dispatch(updateUserInfo({ userInfo: 'mockUserInfo' }));

    // Example usage of googleAuthenticateUser
    dispatch(googleAuthenticateUser('mockGoogleToken'));

    // Example usage of verifyEmail
    dispatch(verifyEmail('mockVerificationToken'));

    // Example usage of resendVerificationToken
    dispatch(resendVerificationToken('john.doe10@example.com'));
  }, [dispatch]);

  return <div>Check the console for logs</div>;
};

export default ExampleComponent;

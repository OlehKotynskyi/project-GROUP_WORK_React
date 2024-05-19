import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://project-group-8-backend.onrender.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
};

export const signUp = createAsyncThunk(
  'api/users/signUp',
  async (credentials, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.post('api/users/signUp', credentials, {
        signal: controller.signal,
      });
      console.log('Sign up response:', res.data);
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Sign up error:', error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const signIn = createAsyncThunk(
  'api/users/signIn',
  async (credentials, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.post('api/users/signIn', credentials, {
        signal: controller.signal,
      });
      const { accessToken } = res.data;
      setAuthHeader(accessToken);
      console.log('Sign in response:', res.data);
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Sign in error:', error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const signOut = createAsyncThunk(
  'api/users/signOut',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const accessToken = state.auth.accessToken;
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    if (!accessToken) {
      return thunkAPI.rejectWithValue('No access token available');
    }

    setAuthHeader(accessToken);

    try {
      await axios.post('api/users/signOut', null, {
        signal: controller.signal,
      });
      clearAuthHeader();
      console.log('Logged out successfully');
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Log out error:', error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

const refreshAccessToken = async (refreshToken, signal) => {
  try {
    const response = await axios.post(
      'api/users/refresh',
      { token: refreshToken },
      { signal }
    );
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setAuthHeader(accessToken);
    console.log('New access token:', accessToken);
    console.log('New refresh token:', newRefreshToken);
    return { accessToken, newRefreshToken };
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error.message);
    } else {
      console.error('Unable to refresh access token:', error);
      throw new Error('Unable to refresh access token');
    }
  }
};

export const refreshUser = createAsyncThunk(
  'api/users/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const refreshToken = state.auth.refreshToken;
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    console.log('Refreshing user with refresh token:', refreshToken);
    if (!refreshToken) {
      console.error('No refresh token available');
      return thunkAPI.rejectWithValue('Unable to refresh user');
    }

    try {
      const { accessToken, newRefreshToken } = await refreshAccessToken(
        refreshToken,
        controller.signal
      );
      console.log('User refreshed successfully');
      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('User refresh error:', error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'api/users/avatars',
  async (avatarData, thunkAPI) => {
    console.log('Updating user avatar with data:', avatarData);
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.patch('api/users/avatars', avatarData, {
        signal: controller.signal,
      });
      console.log('Update avatar response:', res.data);
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Update avatar error:', error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const currentUser = createAsyncThunk(
  'api/users/current',
  async (_, thunkAPI) => {
    console.log('Fetching current user');
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.get('api/users/current', {
        signal: controller.signal,
      });
      console.log('Current user response:', res.data);
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        console.error('Fetch current user error:', error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'api/users/updateInfo',
  async (userInfo, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.patch('api/users/update', userInfo, {
        signal: controller.signal,
      });
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const googleAuthenticateUser = createAsyncThunk(
  'api/users/googleAuthenticate',
  async (token, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.post(
        'api/users/google',
        { token },
        { signal: controller.signal }
      );
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'api/users/verifyEmail',
  async (verificationToken, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.get(`api/users/verify/${verificationToken}`, {
        signal: controller.signal,
      });
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const resendVerificationToken = createAsyncThunk(
  'users/resendVerificationToken',
  async (email, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.post(
        'api/users/verify',
        { email },
        { signal: controller.signal }
      );
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

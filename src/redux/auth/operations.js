import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://project-group-8-backend.onrender.com';

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  console.log('Auth header set:', token);
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = '';
  console.log('Auth header cleared');
};

const refreshAccessToken = async refreshToken => {
  try {
    const response = await axios.post('/users/refresh', {
      token: refreshToken,
    });
    const { accessToken, refreshToken: newRefreshToken } = response.data;
    setAuthHeader(accessToken);
    console.log('New access token:', accessToken);
    console.log('New refresh token:', newRefreshToken);
    return { accessToken, newRefreshToken };
  } catch (error) {
    console.error('Unable to refresh access token:', error);
    throw new Error('Unable to refresh access token');
  }
};

export const signUp = createAsyncThunk(
  'users/signUp',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signUp', credentials);
      console.log('Sign up response:', res.data);
      return res.data;
    } catch (error) {
      console.error('Sign up error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'users/signIn',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/users/signIn', credentials);
      const { accessToken, refreshToken } = res.data;
      setAuthHeader(accessToken);
      console.log('Sign in response:', res.data);
      return res.data;
    } catch (error) {
      console.error('Sign in error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk(
  'users/signOut',
  async (_, thunkAPI) => {
    try {
      await axios.post('/users/signOut');
      clearAuthHeader();
      console.log('Logged out successfully');
    } catch (error) {
      console.error('Log out error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  'users/refresh',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const refreshToken = state.auth.refreshToken;
    console.log('Refreshing user with refresh token:', refreshToken);
    if (!refreshToken) {
      console.error('No refresh token available');
      return thunkAPI.rejectWithValue('Unable to refresh user');
    }

    try {
      const { accessToken, newRefreshToken } = await refreshAccessToken(
        refreshToken
      );
      console.log('User refreshed successfully');
      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error('User refresh error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'users/avatars',
    async (avatarData, thunkAPI) => {
      console.log('Updating user avatar with data:', avatarData);
    try {
        const res = await axios.patch('/users/avatars', avatarData);
        console.log('Update avatar response:', res.data);
      return res.data;
    } catch (error) {
        console.error('Update avatar error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  'users/current',
    async (_, thunkAPI) => {
      console.log('Fetching current user');
    try {
        const res = await axios.get('/users/current');
            console.log('Current user response:', res.data);
      return res.data;
    } catch (error) {
         console.error('Fetch current user error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'user/updateInfo',
  async (userInfo, thunkAPI) => {
    try {
      const res = await axios.patch('/users/update', userInfo);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const googleAuthenticateUser = createAsyncThunk(
  'users/googleAuthenticate',
  async (token, thunkAPI) => {
    try {
      const res = await axios.post('/users/google', { token });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationToken, thunkAPI) => {
    try {
      const res = await axios.get(`/verify/${verificationToken}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resendVerificationToken = createAsyncThunk(
  'auth/resendVerificationToken',
  async (email, thunkAPI) => {
    try {
      const res = await axios.post('/verify', { email });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

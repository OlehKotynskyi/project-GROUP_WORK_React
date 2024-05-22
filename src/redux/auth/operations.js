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
  'auth/signUp',
  async (credentials, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.post('api/users/signUp', credentials, {
        signal: controller.signal,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const res = await axios.post('api/users/signIn', credentials, {
        signal: controller.signal,
      });
      const { accessToken } = res.data;
      setAuthHeader(accessToken);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const signOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
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
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const refreshToken = thunkAPI.getState().auth.refreshToken;
    if (!refreshToken) {
      return thunkAPI.rejectWithValue('Unable to refresh user');
    }
    try {
      const response = await axios.post('api/users/refresh', {
        refreshToken: refreshToken,
      });
      const { accessToken, refreshToken: newRefreshToken } = response.data;
      setAuthHeader(accessToken);
      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'auth/avatars',
  async (avatarData, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());
    try {
      const res = await axios.patch('api/users/avatars', avatarData, {
        signal: controller.signal,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const currentUser = createAsyncThunk(
  'auth/current',
  async (_, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());
    try {
      const res = await axios.get('api/users/current', {
        signal: controller.signal,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateInfo',
  async (userInfo, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    try {
      const formData = new FormData();
      Object.keys(userInfo).forEach(key => {
        formData.append(key, userInfo[key]);
      });

      const res = await axios.patch('api/users/update', formData, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const googleAuthenticateUser = createAsyncThunk(
  'auth/googleAuthenticate',
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationToken, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());
    try {
      const res = await axios.get(`api/users/verify/${verificationToken}`, {
        signal: controller.signal,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const resendVerificationToken = createAsyncThunk(
  'auth/resendVerificationToken',
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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

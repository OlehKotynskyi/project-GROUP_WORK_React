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

      thunkAPI.dispatch(signIn(credentials));

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
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

      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
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
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
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
    return { accessToken, newRefreshToken };
  } catch (error) {
    if (axios.isCancel(error)) {
    } else {
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
    if (!refreshToken) {
      return thunkAPI.rejectWithValue('Unable to refresh user');
    }
    try {
      const { accessToken, newRefreshToken } = await refreshAccessToken(
        refreshToken,
        controller.signal
      );
      return { accessToken, refreshToken: newRefreshToken };
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  'api/users/avatars',
  async (avatarData, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());
    try {
      const res = await axios.patch('api/users/avatars', avatarData, {
        signal: controller.signal,
      });
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

export const currentUser = createAsyncThunk(
  'api/users/current',
  async (_, thunkAPI) => {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());
    try {
      const res = await axios.get('api/users/current', {
        signal: controller.signal,
      });
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
      } else {
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
      } else {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const instance = axios.create({
  baseURL: 'https://project-group-8-backend.onrender.com',
});

const setToken = token => {
  if (token) {
    return (instance.defaults.headers.common.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.common.authorization = '';
};

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const { data } = await instance.post('api/users/refresh', {
          refreshToken,
        });
        setToken(data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        return instance(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post('api/users/signUp', credentials);

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setToken(data.accessToken);

      return data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return thunkAPI.rejectWithValue('Request canceled');
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (credentials, thunkAPI) => {
    try {
      const { data } = await instance.post('api/users/signIn', credentials);

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setToken(data.accessToken);

      return data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return thunkAPI.rejectWithValue('Request canceled');
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const signOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  try {
    await instance.post('api/users/signOut');

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setToken(null);

    return;
  } catch (error) {
    if (axios.isCancel(error)) {
      return thunkAPI.rejectWithValue('Request canceled');
    }
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedToken = localStorage.getItem('refreshToken');

    if (persistedToken === null) {
      return thunkAPI.rejectWithValue('Unable to fetch user');
    }

    try {
      const res = await axios.post('api/users/refresh', {
        refreshToken: persistedToken,
      });

      setToken(res.data.accessToken);

      return res.data;
    } catch (e) {
      localStorage.setItem('refreshToken', '');
      return thunkAPI.rejectWithValue(e.message);
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
  'auth/currentUser',
  async (_, thunkAPI) => {
    try {
      const res = await instance.get('api/users/current');
      return res.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        return thunkAPI.rejectWithValue('Request canceled');
      }
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  'auth/updateUserInfo',
  async (userInfo, thunkAPI) => {
    const formData = new FormData();

    Object.entries(userInfo).forEach(([key, value]) => {
      if (key === 'avatar') {
        formData.append(key, value, value.name);
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await instance.post('api/users/update', formData, {
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
    try {
      const res = await instance.post('api/users/google', { token });
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
      const res = await instance.get(`api/users/verify/${verificationToken}`);
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
      const res = await instance.post('api/users/verify', { email });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

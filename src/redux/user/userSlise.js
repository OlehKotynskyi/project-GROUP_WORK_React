import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const userSignUp = createAsyncThunk(
  'users/signUp',
  // 'auth/signUp'
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/users/signUp', { email, password });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://project-group-8-backend.onrender.com';

export const fetchWaters = createAsyncThunk(
  'waters/fetch',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('api/waters/day');
      return response.data.list;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'waters/delete',
  async (_id, thunkAPI) => {
    try {
      const response = await axios.delete(`api/waters/${_id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'waters/add',
  async (water, thunkAPI) => {
    try {
      const response = await axios.post('api/waters/add', water);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const patchWater = createAsyncThunk(
  'waters/edit',
  async ({ amountDose, timeDose, _id }, thunkAPI) => {
    try {
      const response = await axios.patch(`api/waters/${_id}`, {
        amountDose,
        timeDose,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchWatersMonth = createAsyncThunk(
  'waters/fetchMonth',
  async (dateDose, thunkAPI) => {
    try {
      const response = await axios.get('api/waters/month', dateDose);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

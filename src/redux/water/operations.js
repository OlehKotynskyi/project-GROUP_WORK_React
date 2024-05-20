import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://project-group-8-backend.onrender.com/api';

export const fetchWaters = createAsyncThunk(
    'waters/fetch',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/waters/day');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteWater = createAsyncThunk(
    'waters/delete',
    async (waterId, thunkAPI) => {
        try {
            const response = await axios.delete(`/waters/${waterId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addWater = createAsyncThunk('waters/add', async (water, thunkAPI) => {
    try {
        const response = await axios.post('/waters', water);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
});

export const patchWater = createAsyncThunk(
    'waters/edit',
    async ({ amountDose, timeDose, waterId }, thunkAPI) => {
        try {
            const response = await axios.patch(`/waters/${waterId}`, {
                amountDose,
                timeDose,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchWaters,
  deleteWater,
  patchWater,
  addWater,
  fetchWatersMonth,
} from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: 'water',
  initialState: {
    list: [],
    loading: false,
    error: null,
    monthlyList: [], // Для обробки місячних даних
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWaters.pending, handlePending)
      .addCase(fetchWaters.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = action.payload;
      })
      .addCase(fetchWaters.rejected, handleRejected)
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list.push(action.payload);
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(deleteWater.pending, handlePending)
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = state.list.filter(item => item._id !== action.payload._id);
      })
      .addCase(deleteWater.rejected, handleRejected)
      .addCase(patchWater.pending, handlePending)
      .addCase(patchWater.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.list = state.list.map(item =>
          item._id === action.payload._id ? action.payload : item
        );
      })
      .addCase(patchWater.rejected, handleRejected)
      .addCase(fetchWatersMonth.pending, state => {
        state.loading = true;
      })
      .addCase(fetchWatersMonth.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.monthlyList = action.payload;
      })
      .addCase(fetchWatersMonth.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;

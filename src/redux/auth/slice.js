import { createSlice } from '@reduxjs/toolkit';
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {
      name: null,
      email: null,
      avatarURL: null,
      dailyWaterNorma: 0,
      activeSportTime: 0,
      gender: null,
      weight: 0,
    },
    token: null,
    accessToken: null,
    refreshToken: null,
    isLoggedIn: false,
    isRefreshing: false,
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.token = action.payload.token;
        state.user.water = action.payload.water;
        state.user.avatarURL = action.payload.avatarURL;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
          avatarURL: action.payload.avatar,
          dailyWaterNorma: action.payload.water,
        };
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(signOut.fulfilled, state => {
        state.user = {
          name: null,
          email: null,
          avatarURL: null,
          dailyWaterNorma: 0,
          activeSportTime: 0,
          gender: null,
          weight: 0,
        };
        state.accessToken = null;
        state.refreshToken = null;
        state.isLoggedIn = false;
      })
      .addCase(refreshUser.pending, state => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isRefreshing = false;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, state => {
        state.isRefreshing = false;
        state.isLoggedIn = false;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user.avatarURL = action.payload.avatarURL;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, action) => {
  const updatedFields = action.payload;
  for (let key in updatedFields) {
    if (updatedFields.hasOwnProperty(key)) {
      state.user[key] = updatedFields[key];
    }
  }
})

      .addCase(googleAuthenticateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isLoggedIn = true;
      })
      .addCase(verifyEmail.fulfilled, state => {
        state.isEmailVerified = true;
      })
      .addCase(resendVerificationToken.fulfilled, (state, action) => {
        state.verificationTokenSent = action.payload.success;
      });
  },
});

export const authReducer = authSlice.reducer;

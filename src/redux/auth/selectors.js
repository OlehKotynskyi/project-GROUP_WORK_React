export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectUser = state => state.auth.user;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectAccessToken = state => state.auth.accessToken;

export const selectRefreshToken = state => state.auth.refreshToken;

export const selectUserEmail = state => state.auth.user.email;

export const selectUserAvatar = state => state.auth.user.avatarURL;

export const selectDailyWaterNorma = state => state.auth.user.dailyWaterNorma;

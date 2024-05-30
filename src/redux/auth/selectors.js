import { createSelector } from 'reselect';

// Основні селектори
const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUser = state => state.auth.user;
const getIsRefreshing = state => state.auth.isRefreshing;
const getAccessToken = state => state.auth.accessToken;
const getRefreshToken = state => state.auth.refreshToken;
const getUserEmail = state => state.auth.user.email;
const getUserAvatar = state => state.auth.user.avatarURL;
const getDailyWaterNorma = state => state.auth.user.dailyWaterNorma;

// Мемоізовані селектори
export const selectIsLoggedIn = createSelector(
  [getIsLoggedIn],
  isLoggedIn => isLoggedIn
);

export const selectUser = createSelector([getUser], user => user);

export const selectIsRefreshing = createSelector(
  [getIsRefreshing],
  isRefreshing => isRefreshing
);

export const selectAccessToken = createSelector(
  [getAccessToken],
  accessToken => accessToken
);

export const selectRefreshToken = createSelector(
  [getRefreshToken],
  refreshToken => refreshToken
);

export const selectUserEmail = createSelector([getUserEmail], email => email);

export const selectUserAvatar = createSelector(
  [getUserAvatar],
  avatarURL => avatarURL
);

export const selectDailyWaterNorma = createSelector(
  [getDailyWaterNorma],
  dailyWaterNorma => dailyWaterNorma
);

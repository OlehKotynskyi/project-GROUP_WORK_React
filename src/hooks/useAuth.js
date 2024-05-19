import { useSelector } from 'react-redux';
import {
  selectIsLoggedIn,
  selectUser,
  selectIsRefreshing,
  selectAccessToken,
  selectRefreshToken,
  selectUserEmail,
  selectUserAvatar,
  selectDailyWaterNorma,
} from '../redux/auth/selectors';

export const useAuth = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const user = useSelector(selectUser);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const userEmail = useSelector(selectUserEmail);
  const userAvatar = useSelector(selectUserAvatar);
  const dailyWaterNorma = useSelector(selectDailyWaterNorma);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    accessToken,
    refreshToken,
    userEmail,
    userAvatar,
    dailyWaterNorma,
  };
};

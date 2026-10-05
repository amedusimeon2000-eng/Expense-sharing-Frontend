import { useStoredToken } from '@/hooks/utils/useStoredToken';
import { QUERY_SEARCH_KEYS } from '@/models/query';
import { AppRoutes } from '@/routes';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const ProtectedRouteLayout = () => {
  const location = useLocation();
  const { token, isReading } = useStoredToken();

  if (isReading) return null;

  if (!token) {
    const redirect = encodeURIComponent(location.pathname + location.search);

    return (
      <Navigate
        to={`${AppRoutes.login}?${QUERY_SEARCH_KEYS.REDIRECT}=${redirect}`}
        replace
      />
    );
  }

  return <Outlet />;
};

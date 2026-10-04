import { useStoredToken } from '@/hooks/utils/useStoredToken';
import { AppRoutes } from '@/routes';
import { Navigate, Outlet } from 'react-router-dom';

export const GuestRouteLayout = () => {
  const { token, isReading } = useStoredToken();

  if (isReading) return null;

  if (token) return <Navigate to={AppRoutes.dashboard} replace />;

  return <Outlet />;
};

import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout';
import { DashboardLayout } from './layout/DashboardLayout';
import { GuestRouteLayout } from './layout/GuestRouteLayout';
import { ProtectedRouteLayout } from './layout/ProtectedRouteLayout';
import { RootLayout } from './layout/RootLayout';
import LandingPage from './pages/LandingPage';
import { AppRoutes } from './routes';
import { authRoutes } from './routes/auth.route';
import { dashboardRoutes } from './routes/dashboard.route';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: AppRoutes.home, element: <LandingPage /> },
      {
        element: <ProtectedRouteLayout />,
        children: [{ element: <DashboardLayout />, children: dashboardRoutes }],
      },
      {
        element: <GuestRouteLayout />,
        children: [{ element: <AuthLayout />, children: authRoutes }],
      },
      { path: AppRoutes.auth, element: <Navigate to={AppRoutes.login} replace /> },
      { path: '*', element: <Navigate to={AppRoutes.home} replace /> },
    ],
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;

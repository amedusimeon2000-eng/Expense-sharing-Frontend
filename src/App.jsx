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

const withLayouts = (outerLayout, innerLayout, routes) => ({
  element: outerLayout,
  children: [{ element: innerLayout, children: routes }],
});

const routeTree = [
  {
    element: <RootLayout />,
    children: [
      { path: AppRoutes.home, element: <LandingPage /> },
      withLayouts(
        <ProtectedRouteLayout />,
        <DashboardLayout />,
        dashboardRoutes,
      ),
      withLayouts(<GuestRouteLayout />, <AuthLayout />, authRoutes),
      { path: AppRoutes.auth, element: <Navigate to={AppRoutes.login} replace /> },
      { path: '*', element: <Navigate to={AppRoutes.home} replace /> },
    ],
  },
];

const router = createBrowserRouter(routeTree);

const App = () => <RouterProvider router={router} />;

export default App;

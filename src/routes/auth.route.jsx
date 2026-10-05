import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { AppRoutes } from '.';

export const authRoutes = [
  { path: AppRoutes.login, element: <Login /> },
  { path: AppRoutes.register, element: <Register /> },
];

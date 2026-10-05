import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export const RootLayout = () => (
  <>
    <Outlet />
    <Toaster
      closeButton
      richColors
      theme='light'
      expand={false}
      duration={3000}
      position='top-right'
    />
  </>
);

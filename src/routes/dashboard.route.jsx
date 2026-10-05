import { Dashboard } from '@/pages/dashboard/Dashboard';
import { GroupDetail } from '@/pages/dashboard/GroupDetail';
import { Groups } from '@/pages/dashboard/Groups';
import { Profile } from '@/pages/dashboard/Profile';
import { AppRoutes } from '.';

export const dashboardRoutes = [
  { path: AppRoutes.groups, element: <Groups /> },
  { path: AppRoutes.profile, element: <Profile /> },
  { path: AppRoutes.dashboard, element: <Dashboard /> },
  { path: AppRoutes.groupID(), element: <GroupDetail /> },
];

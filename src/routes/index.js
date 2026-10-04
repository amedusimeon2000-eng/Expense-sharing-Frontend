export class AppRoutes {
  static home = '/';

  // AUTH
  static auth = '/auth';
  static login = `${AppRoutes.auth}/login`;
  static register = `${AppRoutes.auth}/register`;

  // DASHBOARD
  static dashboard = '/dashboard';

  // GROUPS
  static groups = '/groups';
  static groupID = (id = ':id') => `${AppRoutes.groups}/${id}`;

  // ACCOUNT
  static profile = '/profile';
}

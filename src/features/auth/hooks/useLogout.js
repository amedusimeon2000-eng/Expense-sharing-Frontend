import { LOCAL_STORAGE_NAME } from '@/models/auth';
import { QueryKeys } from '@/models/query';
import { AppRoutes } from '@/routes';
import { AuthService } from '@/services/auth';
import { LocalForageActions } from '@/store/state/localForage';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logoutFn, isPending: isPendingLogout } = useMutation({
    mutationKey: [QueryKeys.Logout],
    mutationFn: AuthService.logout,
    onSettled: async () => {
      await LocalForageActions.delete(LOCAL_STORAGE_NAME.USER_TOKEN);
      queryClient.clear();
      window.location.href = AppRoutes.login;
    },
  });

  return { logoutFn, isPendingLogout };
};

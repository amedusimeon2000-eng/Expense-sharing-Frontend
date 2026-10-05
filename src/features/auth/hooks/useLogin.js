import { useGetSharedQueryParams } from '@/hooks/utils/useGetSharedQueryParams';
import { LOCAL_STORAGE_NAME } from '@/models/auth';
import { QUERY_SEARCH_KEYS, QueryKeys } from '@/models/query';
import { AppRoutes } from '@/routes';
import { AuthService } from '@/services/auth';
import { LocalForageActions } from '@/store/state/localForage';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = ({ onError } = {}) => {
  const navigate = useNavigate();
  const { getItem } = useGetSharedQueryParams();
  const redirect = getItem(QUERY_SEARCH_KEYS.REDIRECT);

  const { mutate: loginFn, isPending: isLoginPending } = useMutation({
    mutationFn: AuthService.login,
    mutationKey: [QueryKeys.Login],
    onSuccess: async ({ data }) => {
      await LocalForageActions.store(
        LOCAL_STORAGE_NAME.USER_TOKEN,
        data?.token,
      );
      const path = redirect && redirect !== '/' ? redirect : undefined;
      navigate(path ?? AppRoutes.dashboard, { replace: true });
    },
    onError: (error) => {
      const message =
        QueryUtils.queryErrorMessage(error) ?? 'Something went wrong';
      if (onError) return onError(message, error);
      ToastUtils.errorToast({ message });
    },
  });

  return {
    loginFn,
    isLoginPending,
  };
};

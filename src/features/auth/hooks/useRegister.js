import { LOCAL_STORAGE_NAME } from '@/models/auth';
import { QueryKeys } from '@/models/query';
import { AppRoutes } from '@/routes';
import { AuthService } from '@/services/auth';
import { LocalForageActions } from '@/store/state/localForage';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useRegister = ({ onFieldError } = {}) => {
  const navigate = useNavigate();

  const { mutate: registerFn, isPending: isRegisterPending } = useMutation({
    mutationFn: AuthService.register,
    mutationKey: [QueryKeys.Register],
    onSuccess: async ({ data, message }) => {
      await LocalForageActions.store(
        LOCAL_STORAGE_NAME.USER_TOKEN,
        data?.token,
      );
      ToastUtils.successToast({
        message: message || 'Account created successfully',
      });
      navigate(AppRoutes.dashboard, { replace: true });
    },
    onError: (error) => {
      const message =
        QueryUtils.queryErrorMessage(error) ?? 'Something went wrong';
      const field =
        error?.response?.data?.errors?.[0]?.field ??
        (error?.response?.status === 409 ? 'email' : undefined);
      if (field && onFieldError) return onFieldError(field, message);
      ToastUtils.errorToast({ message });
    },
  });

  return {
    registerFn,
    isRegisterPending,
  };
};

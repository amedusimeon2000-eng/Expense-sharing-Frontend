import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { QueryKeys } from '@/models/query';
import { AuthService } from '@/services/auth';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useChangePassword = ({ onSuccess, onError } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: changePasswordFn, isPending: isPendingChangePassword } =
    useMutation({
      mutationKey: [QueryKeys.ChangePassword],
      mutationFn: AuthService.changePassword,
      onSuccess: ({ data, message }) => {
        ToastUtils.successToast({ message: message || 'Password changed' });
        invalidateQueries([QueryKeys.Sessions]);
        onSuccess?.(data);
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message:
            QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
        onError?.(error);
      },
    });

  return { changePasswordFn, isPendingChangePassword };
};

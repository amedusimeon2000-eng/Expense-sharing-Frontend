import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { QueryKeys } from '@/models/query';
import { AuthService } from '@/services/auth';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useRevokeSession = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: revokeSessionFn, isPending: isPendingRevokeSession } =
    useMutation({
      mutationKey: [QueryKeys.RevokeSession],
      mutationFn: AuthService.revokeSession,
      onSuccess: () => {
        ToastUtils.successToast({ message: 'Device logged out' });
        invalidateQueries([QueryKeys.Sessions]);
        onSuccess?.();
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message:
            QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
      },
    });

  return { revokeSessionFn, isPendingRevokeSession };
};

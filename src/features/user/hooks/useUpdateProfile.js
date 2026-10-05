import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { QueryKeys } from '@/models/query';
import { UserService } from '@/services/user';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useUpdateProfile = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: updateProfileFn, isPending: isPendingUpdateProfile } =
    useMutation({
      mutationKey: [QueryKeys.UpdateProfile],
      mutationFn: UserService.updateProfile,
      onSuccess: ({ data, message }) => {
        ToastUtils.successToast({ message: message || 'Profile updated successfully' });
        invalidateQueries([QueryKeys.Me]);
        if (data?.user) onSuccess?.(data.user);
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message: QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
      },
    });

  return { updateProfileFn, isPendingUpdateProfile };
};

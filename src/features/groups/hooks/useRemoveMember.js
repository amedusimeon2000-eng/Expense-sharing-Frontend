import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useRemoveMember = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: removeMemberFn, isPending: isPendingRemoveMember } =
    useMutation({
      mutationKey: [QueryKeys.RemoveMember],
      mutationFn: GroupService.removeMember,
      onSuccess: ({ message }, variables) => {
        ToastUtils.successToast({
          message: message || 'Member removed successfully',
        });
        onSuccess?.(variables);
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message:
            QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
      },
      onSettled: (_data, _error, { groupId }) => {
        invalidateQueries([
          QueryKeys.Groups,
          QueryKeys.Summary,
          [QueryKeys.Group, groupId],
          [QueryKeys.Balances, groupId],
        ]);
      },
    });

  return { removeMemberFn, isPendingRemoveMember };
};

import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useAddMember = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: addMemberFn, isPending: isPendingAddMember } = useMutation({
    mutationKey: [QueryKeys.AddMember],
    mutationFn: GroupService.addMember,
    onSuccess: ({ data, message }) => {
      ToastUtils.successToast({ message: message || 'Member added' });
      if (data?.group) onSuccess?.(data.group);
    },
    onError: (error) => {
      ToastUtils.errorToast({
        message: QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
      });
    },
    onSettled: (_data, _error, { groupId }) => {
      invalidateQueries([
        QueryKeys.Groups,
        [QueryKeys.Group, groupId],
        [QueryKeys.Balances, groupId],
      ]);
    },
  });

  return { addMemberFn, isPendingAddMember };
};

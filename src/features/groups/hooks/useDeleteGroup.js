import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useDeleteGroup = ({ onSuccess } = {}) => {
  const { invalidateQueries, removeQueries } = useInvalidateQueries();

  const { mutate: deleteGroupFn, isPending: isPendingDeleteGroup } =
    useMutation({
      mutationKey: [QueryKeys.DeleteGroup],
      mutationFn: GroupService.deleteGroup,
      onSuccess: ({ message }, groupId) => {
        ToastUtils.successToast({ message: message || 'Group deleted' });
        removeQueries([[QueryKeys.Group, groupId]]);
        invalidateQueries([QueryKeys.Groups, QueryKeys.Summary]);
        onSuccess?.();
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message:
            QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
      },
    });

  return { deleteGroupFn, isPendingDeleteGroup };
};

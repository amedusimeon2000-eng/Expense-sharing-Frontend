import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useUpdateGroup = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: updateGroupFn, isPending: isPendingUpdateGroup } =
    useMutation({
      mutationKey: [QueryKeys.UpdateGroup],
      mutationFn: GroupService.updateGroup,
      onSuccess: ({ data, message }) => {
        ToastUtils.successToast({
          message: message || 'Group updated successfully',
        });
        if (data?.group) onSuccess?.(data.group);
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
        ]);
      },
    });

  return { updateGroupFn, isPendingUpdateGroup };
};

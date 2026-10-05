import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useCreateGroup = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: createGroupFn, isPending: isPendingCreateGroup } =
    useMutation({
      mutationKey: [QueryKeys.CreateGroup],
      mutationFn: GroupService.createGroup,
      onSuccess: ({ data, message }) => {
        ToastUtils.successToast({
          message: message || 'Group created successfully',
        });
        invalidateQueries([QueryKeys.Groups, QueryKeys.Summary]);
        if (data?.group) onSuccess?.(data.group);
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message:
            QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
      },
    });

  return { createGroupFn, isPendingCreateGroup };
};

import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { MONEY_QUERY_KEYS, QueryKeys } from '@/models/query';
import { SettlementService } from '@/services/settlement';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useDeleteSettlement = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: deleteSettlementFn, isPending: isPendingDeleteSettlement } =
    useMutation({
      mutationKey: [QueryKeys.DeleteSettlement],
      mutationFn: SettlementService.deleteSettlement,
      onSuccess: ({ message }) => {
        ToastUtils.successToast({
          message: message || 'Payment undone successfully',
        });
        invalidateQueries(MONEY_QUERY_KEYS);
        onSuccess?.();
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message:
            QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
      },
    });

  return { deleteSettlementFn, isPendingDeleteSettlement };
};

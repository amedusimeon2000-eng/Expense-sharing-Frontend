import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { MONEY_QUERY_KEYS, QueryKeys } from '@/models/query';
import { SettlementService } from '@/services/settlement';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useCreateSettlement = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: createSettlementFn, isPending: isPendingCreateSettlement } =
    useMutation({
      mutationKey: [QueryKeys.CreateSettlement],
      mutationFn: SettlementService.createSettlement,
      onSuccess: ({ data, message }) => {
        ToastUtils.successToast({
          message: message || 'Payment recorded successfully',
        });
        invalidateQueries(MONEY_QUERY_KEYS);
        if (data?.settlement) onSuccess?.(data.settlement);
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message:
            QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
      },
    });

  return { createSettlementFn, isPendingCreateSettlement };
};

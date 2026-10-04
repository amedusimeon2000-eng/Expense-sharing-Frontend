import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { MONEY_QUERY_KEYS, QueryKeys } from '@/models/query';
import { ExpenseService } from '@/services/expense';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useUpdateExpense = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: updateExpenseFn, isPending: isPendingUpdateExpense } =
    useMutation({
      mutationKey: [QueryKeys.UpdateExpense],
      mutationFn: ExpenseService.updateExpense,
      onSuccess: ({ data, message }) => {
        ToastUtils.successToast({ message: message || 'Expense updated' });
        if (data?.expense) onSuccess?.(data.expense);
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message:
            QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
      },
      onSettled: () => {
        invalidateQueries(MONEY_QUERY_KEYS);
      },
    });

  return { updateExpenseFn, isPendingUpdateExpense };
};

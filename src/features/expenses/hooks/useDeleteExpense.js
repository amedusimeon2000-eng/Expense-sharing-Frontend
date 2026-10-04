import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { MONEY_QUERY_KEYS, QueryKeys } from '@/models/query';
import { ExpenseService } from '@/services/expense';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useDeleteExpense = ({ onSuccess } = {}) => {
  const { invalidateQueries, removeQueries } = useInvalidateQueries();

  const { mutate: deleteExpenseFn, isPending: isPendingDeleteExpense } =
    useMutation({
      mutationKey: [QueryKeys.DeleteExpense],
      mutationFn: ExpenseService.deleteExpense,
      onSuccess: ({ message }, { groupId, expenseId }) => {
        ToastUtils.successToast({ message: message || 'Expense deleted' });
        removeQueries([[QueryKeys.Expense, groupId, expenseId]]);
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

  return { deleteExpenseFn, isPendingDeleteExpense };
};

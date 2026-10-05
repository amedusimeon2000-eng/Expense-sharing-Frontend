import { useInvalidateQueries } from '@/hooks/utils/useInvalidateQuery';
import { MONEY_QUERY_KEYS, QueryKeys } from '@/models/query';
import { ExpenseService } from '@/services/expense';
import { QueryUtils } from '@/utils/query';
import { ToastUtils } from '@/utils/toast';
import { useMutation } from '@tanstack/react-query';

export const useCreateExpense = ({ onSuccess } = {}) => {
  const { invalidateQueries } = useInvalidateQueries();

  const { mutate: createExpenseFn, isPending: isPendingCreateExpense } =
    useMutation({
      mutationKey: [QueryKeys.CreateExpense],
      mutationFn: ExpenseService.createExpense,
      onSuccess: ({ data, message }) => {
        ToastUtils.successToast({ message: message || 'Expense added' });
        invalidateQueries(MONEY_QUERY_KEYS);
        if (data?.expense) onSuccess?.(data.expense);
      },
      onError: (error) => {
        ToastUtils.errorToast({
          message:
            QueryUtils.queryErrorMessage(error) ?? 'Something went wrong',
        });
      },
    });

  return { createExpenseFn, isPendingCreateExpense };
};

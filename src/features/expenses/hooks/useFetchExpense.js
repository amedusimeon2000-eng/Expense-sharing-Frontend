import { QueryErrCodes, QueryKeys } from '@/models/query';
import { ExpenseService } from '@/services/expense';
import { QueryUtils } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useFetchExpense = ({ groupId, expenseId }) => {
  const { isLoading, data, isFetching } = useQuery({
    enabled: !!groupId && !!expenseId,
    queryFn: () => ExpenseService.getExpense({ groupId, expenseId }),
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.Expense,
      params: { groupId, expenseId },
    }),
    meta: {
      errCode: QueryErrCodes.Expense,
    },
  });

  const expense = data?.data?.expense ?? null;

  return { isLoading, isFetching, expense };
};

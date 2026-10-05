import { QueryErrCodes, QueryKeys } from '@/models/query';
import { ExpenseService } from '@/services/expense';
import { QueryUtils } from '@/utils/query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchExpenses = ({ groupId, ...filters }) => {
  const { isLoading, data, isFetching } = useQuery({
    enabled: !!groupId,
    queryFn: () => ExpenseService.getExpenses({ groupId, ...filters }),
    placeholderData: keepPreviousData,
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.Expenses,
      params: { groupId, ...filters },
    }),
    meta: {
      errCode: QueryErrCodes.Expenses,
    },
  });

  const expenses = data?.data ?? [];
  const total = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;

  return { isLoading, isFetching, expenses, total, totalPages };
};

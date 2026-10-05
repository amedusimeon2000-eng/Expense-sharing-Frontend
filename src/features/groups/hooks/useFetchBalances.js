import { QueryErrCodes, QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useFetchBalances = (groupId) => {
  const { isLoading, data, isFetching } = useQuery({
    enabled: !!groupId,
    queryFn: () => GroupService.getBalances(groupId),
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.Balances,
      params: { groupId },
    }),
    meta: {
      errCode: QueryErrCodes.Balances,
    },
  });

  const balances = data?.data ?? [];

  return { isLoading, isFetching, balances };
};

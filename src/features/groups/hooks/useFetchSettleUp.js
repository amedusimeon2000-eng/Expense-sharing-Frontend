import { QueryErrCodes, QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useFetchSettleUp = (groupId) => {
  const { isLoading, data, isFetching } = useQuery({
    enabled: !!groupId,
    queryFn: () => GroupService.getSettleUp(groupId),
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.SettleUp,
      params: { groupId },
    }),
    meta: {
      errCode: QueryErrCodes.SettleUp,
    },
  });

  const suggestions = data?.data ?? [];

  return {
    isLoading,
    isFetching,
    suggestions,
    isSettled: !!data && suggestions.length === 0,
  };
};

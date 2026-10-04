import { QueryErrCodes, QueryKeys } from '@/models/query';
import { UserService } from '@/services/user';
import { QueryUtils } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

/** Dashboard totals (kobo), per-group nets and the 10 latest activity items. */
export const useFetchSummary = () => {
  const { isLoading, data, isFetching } = useQuery({
    queryFn: UserService.getSummary,
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.Summary,
    }),
    meta: {
      errCode: QueryErrCodes.Summary,
    },
  });

  const summary = data?.data;

  return {
    isLoading,
    isFetching,
    youOwe: summary?.youOwe ?? 0,
    youAreOwed: summary?.youAreOwed ?? 0,
    net: summary?.net ?? 0,
    groups: summary?.groups ?? [],
    recentActivity: summary?.recentActivity ?? [],
  };
};

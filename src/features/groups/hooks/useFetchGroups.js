import { QueryErrCodes, QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchGroups = (filters = {}) => {
  const { isLoading, data, isFetching } = useQuery({
    queryFn: () => GroupService.getGroups(filters),
    placeholderData: keepPreviousData,
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.Groups,
      params: filters,
    }),
    meta: {
      errCode: QueryErrCodes.Groups,
    },
  });

  const groups = data?.data ?? [];
  const total = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;

  return { isLoading, isFetching, groups, total, totalPages };
};

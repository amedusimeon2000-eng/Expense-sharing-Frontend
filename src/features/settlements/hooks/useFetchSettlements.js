import { QueryErrCodes, QueryKeys } from '@/models/query';
import { SettlementService } from '@/services/settlement';
import { QueryUtils } from '@/utils/query';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchSettlements = ({ groupId, ...filters }) => {
  const { isLoading, data, isFetching } = useQuery({
    enabled: !!groupId,
    queryFn: () => SettlementService.getSettlements({ groupId, ...filters }),
    placeholderData: keepPreviousData,
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.Settlements,
      params: { groupId, ...filters },
    }),
    meta: {
      errCode: QueryErrCodes.Settlements,
    },
  });

  const settlements = data?.data ?? [];
  const total = data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;

  return { isLoading, isFetching, settlements, total, totalPages };
};

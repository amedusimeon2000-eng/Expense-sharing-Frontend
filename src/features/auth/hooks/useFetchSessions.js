import { QueryErrCodes, QueryKeys } from '@/models/query';
import { AuthService } from '@/services/auth';
import { QueryUtils } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useFetchSessions = () => {
  const { isLoading, data, isFetching } = useQuery({
    queryFn: AuthService.getSessions,
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.Sessions,
    }),
    meta: {
      errCode: QueryErrCodes.Sessions,
    },
  });

  const sessions = data?.data?.sessions ?? [];
  const total = data?.data?.total ?? 0;

  return { isLoading, isFetching, sessions, total };
};

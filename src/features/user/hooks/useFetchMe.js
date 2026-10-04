import { QueryErrCodes, QueryKeys } from '@/models/query';
import { AuthService } from '@/services/auth';
import { QueryUtils } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useFetchMe = () => {
  const { isLoading, data, isFetching } = useQuery({
    queryFn: AuthService.getMe,
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.Me,
    }),
    meta: {
      errCode: QueryErrCodes.Me,
    },
  });

  const user = data?.data?.user ?? null;
  const session = data?.data?.session ?? null;

  return { isLoading, isFetching, user, session };
};

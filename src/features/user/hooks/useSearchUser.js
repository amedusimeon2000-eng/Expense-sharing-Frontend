import { QueryErrCodes, QueryKeys } from '@/models/query';
import { UserService } from '@/services/user';
import { QueryUtils } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useSearchUser = (email) => {
  const trimmed = email?.trim().toLowerCase() ?? '';

  const { isLoading, data, isFetching, isError } = useQuery({
    enabled: EMAIL_PATTERN.test(trimmed),
    retry: false,
    queryFn: () => UserService.searchUser(trimmed),
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.SearchUser,
      params: { email: trimmed },
    }),
    meta: {
      errCode: QueryErrCodes.SearchUser,
      errorToast: false,
    },
  });

  const user = data?.data?.user ?? null;

  return { isLoading, isFetching, user, notFound: isError };
};

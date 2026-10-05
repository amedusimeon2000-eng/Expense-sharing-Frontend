import { GROUP_ROLES } from '@/models/expense';
import { QueryErrCodes, QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { useQuery } from '@tanstack/react-query';

export const useFetchGroup = (groupId) => {
  const { isLoading, data, isFetching } = useQuery({
    enabled: !!groupId,
    queryFn: () => GroupService.getGroup(groupId),
    queryKey: QueryUtils.queryKeyWithProps({
      key: QueryKeys.Group,
      params: { groupId },
    }),
    meta: {
      errCode: QueryErrCodes.Group,
    },
  });

  const group = data?.data?.group ?? null;
  const myRole = data?.data?.myRole;
  const members = group?.members ?? [];

  return {
    isLoading,
    isFetching,
    group,
    members,
    myRole,
    isAdmin: myRole === GROUP_ROLES.ADMIN,
  };
};

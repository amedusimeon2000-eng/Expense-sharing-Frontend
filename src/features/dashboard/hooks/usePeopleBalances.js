import { QueryErrCodes, QueryKeys } from '@/models/query';
import { GroupService } from '@/services/group';
import { QueryUtils } from '@/utils/query';
import { useQueries } from '@tanstack/react-query';

export const usePeopleBalances = ({ groups, meId }) => {
  const results = useQueries({
    queries: groups.map((group) => ({
      enabled: !!meId,
      queryFn: () => GroupService.getSettleUp(group.id),
      queryKey: QueryUtils.queryKeyWithProps({
        key: QueryKeys.SettleUp,
        params: { groupId: group.id },
      }),
      meta: { errCode: QueryErrCodes.SettleUp, errorToast: false },
    })),
  });

  const people = {};
  results.forEach((result, index) => {
    const group = groups[index];
    (result.data?.data ?? []).forEach((payment) => {
      const isPayer = payment.from.id === meId;
      const isPayee = payment.to.id === meId;
      if (!isPayer && !isPayee) return;

      const other = isPayer ? payment.to : payment.from;
      const person = (people[other.id] ??= {
        user: other,
        v: 0,
        groups: [],
        first: null,
      });
      person.v += isPayee ? payment.amount : -payment.amount;
      person.groups.push(group.name);
      person.first ??= {
        groupId: group.id,
        from: payment.from.id,
        to: payment.to.id,
        amount: payment.amount,
      };
    });
  });

  const balances = Object.values(people)
    .filter((person) => person.v !== 0)
    .sort((a, b) => b.v - a.v);

  return {
    isLoading: results.some((result) => result.isLoading),
    people: balances,
  };
};

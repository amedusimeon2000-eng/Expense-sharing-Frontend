import { useFetchExpenses } from '@/features/expenses/hooks/useFetchExpenses';
import { FULL_LIST_LIMIT } from '@/models/serviceRequests';

export const useGroupLedger = (groupId) => {
  const {
    expenses,
    total: count,
    isLoading,
  } = useFetchExpenses({
    groupId,
    limit: FULL_LIST_LIMIT,
  });

  const paid = {};
  const share = {};
  let total = 0;

  expenses.forEach((expense) => {
    total += expense.amount;
    paid[expense.paidBy.id] = (paid[expense.paidBy.id] ?? 0) + expense.amount;
    expense.shares.forEach((s) => {
      share[s.user.id] = (share[s.user.id] ?? 0) + s.amount;
    });
  });

  return { isLoading, expenses, count, total, paid, share };
};

import { QueryInput } from '@/components/inputs/QueryInput';
import { Avatar } from '@/components/shared/Avatar';
import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingRows } from '@/components/shared/LoadingRows';
import { Panel } from '@/components/shared/Panel';
import { useFetchExpenses } from '@/features/expenses/hooks/useFetchExpenses';
import { useGetSharedQueryParams } from '@/hooks/utils/useGetSharedQueryParams';
import { FULL_LIST_LIMIT } from '@/models/serviceRequests';
import { BalanceUtils } from '@/utils/balance';
import { cn } from '@/utils/cn';
import { DateUtils } from '@/utils/date';
import { MoneyUtils } from '@/utils/money';
import { SettleUpPlan } from '../SettleUpPlan';
import { ExpenseRow } from './ExpenseRow';

const groupByDay = (expenses) => {
  const days = [];
  expenses.forEach((expense) => {
    const key = DateUtils.toInputDate(expense.date);
    const last = days[days.length - 1];
    if (last?.key === key) last.rows.push(expense);
    else
      days.push({
        key,
        label: DateUtils.dayLabel(expense.date),
        rows: [expense],
      });
  });
  return days;
};

export const ExpensesTab = ({
  groupId,
  meId,
  balances,
  settleUp,
  onOpenExpense,
  onRecord,
  onAddExpense,
}) => {
  // The box writes `?search=` (debounced); the list reads it back from the URL.
  const { search } = useGetSharedQueryParams();
  const { expenses, isLoading } = useFetchExpenses({
    groupId,
    limit: FULL_LIST_LIMIT,
    search,
  });

  return (
    <div className='grid grid-cols-1 items-start gap-4 min-[1100px]:grid-cols-[minmax(0,1fr)_340px]'>
      <div className='flex flex-col gap-4'>
        <QueryInput placeholder='Search expenses' inputClassName='h-9' />

        {isLoading && (
          <Panel>
            <LoadingRows rows={4} />
          </Panel>
        )}

        {!isLoading &&
          groupByDay(expenses).map((day) => (
            <div key={day.key} className='flex flex-col gap-2'>
              <p className='text-xs font-medium text-grey-400'>{day.label}</p>
              <Panel>
                {day.rows.map((expense) => (
                  <ExpenseRow
                    key={expense.id}
                    expense={expense}
                    meId={meId}
                    onOpen={onOpenExpense}
                  />
                ))}
              </Panel>
            </div>
          ))}

        {!isLoading && !expenses.length && (
          <EmptyState
            {...(search
              ? {
                  title: 'No expenses found',
                  subtitle: 'No expense matching your search was found.',
                }
              : {
                  title: 'No expenses yet',
                  subtitle: 'You have no expenses in this group at the moment',
                  ctaLabel: 'Add expense',
                  onClick: onAddExpense,
                })}
          />
        )}
      </div>

      <div className='flex flex-col gap-4 min-[1100px]:sticky min-[1100px]:top-20'>
        <Panel title='Balances' headerClassName='[&_h4]:text-[15px]'>
          <div className='py-2'>
            {balances.balances.map((row) => (
              <div
                key={row.user.id}
                className='flex items-center gap-2.5 px-4 py-2'
              >
                <Avatar id={row.user.id} name={row.user.name} size='xs' />
                <span className='flex-1 truncate text-sm'>
                  {row.user.name}
                  {row.user.id === meId && ' (you)'}
                </span>
                <span
                  className={cn(
                    'text-13 font-semibold tabular-nums',
                    BalanceUtils.textColor(row.net),
                  )}
                >
                  {MoneyUtils.formatSigned(row.net)}
                </span>
              </div>
            ))}
            {balances.isLoading && <LoadingRows rows={2} />}
          </div>
        </Panel>
        <SettleUpPlan
          compact
          meId={meId}
          suggestions={settleUp.suggestions}
          isLoading={settleUp.isLoading}
          onRecord={onRecord}
        />
      </div>
    </div>
  );
};

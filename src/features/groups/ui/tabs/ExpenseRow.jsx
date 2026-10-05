import { categoryFor, SPLIT_LABELS } from '@/features/expenses/store/data';
import { displayName, shareInfo } from '@/features/expenses/utils/share';
import { cn } from '@/utils/cn';
import { MoneyUtils } from '@/utils/money';

export const ExpenseRow = ({ expense, meId, onOpen }) => {
  const category = categoryFor(expense.category);
  const myShare = expense.shares.find((s) => s.user.id === meId)?.amount ?? 0;
  const share = shareInfo({ amount: expense.amount, paidById: expense.paidBy.id, myShare, meId });
  const people = expense.shares.length;

  return (
    <button
      onClick={() => onOpen(expense)}
      className='flex w-full items-center gap-3 border-b border-grey-transparent px-4 py-3.5 text-left last:border-b-0 hover:bg-brand-light'
    >
      <div
        className={cn('flex size-9 shrink-0 items-center justify-center rounded-lg', category.tint)}
      >
        <category.Icon size={18} />
      </div>
      <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
        <span className='truncate text-sm font-semibold'>{expense.description}</span>
        <span className='truncate text-xs text-text-muted'>
          {displayName(expense.paidBy, meId)} paid · {SPLIT_LABELS[expense.splitType]} split ·{' '}
          {people} {people === 1 ? 'person' : 'people'}
        </span>
      </div>
      <div className='flex flex-col items-end gap-0.5'>
        <span className='text-sm font-semibold tabular-nums'>
          {MoneyUtils.format(expense.amount)}
        </span>
        <span className={cn('text-xs font-medium whitespace-nowrap', share.className)}>
          {share.text}
        </span>
      </div>
    </button>
  );
};

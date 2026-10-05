import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandInput } from '@/components/inputs/BrandInput';
import { BrandModal } from '@/components/modals/BrandModal';
import { Avatar } from '@/components/shared/Avatar';
import { StatusBadge } from '@/components/status/StatusBadge';
import { SPLIT_TYPES } from '@/models/expense';
import { cn } from '@/utils/cn';
import { DateUtils } from '@/utils/date';
import { MoneyUtils } from '@/utils/money';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { useDeleteExpense } from '../hooks/useDeleteExpense';
import { useUpdateExpense } from '../hooks/useUpdateExpense';
import { categoryFor, SPLIT_LABELS } from '../store/data';
import { displayName } from '../utils/share';
import { scaleExactShares } from '../utils/split';

export const ExpenseDetail = ({ expense, groupId, meId, canEdit, onClose }) => {
  const [editAmount, setEditAmount] = useState(String(MoneyUtils.toNaira(expense.amount)));
  const category = categoryFor(expense.category);
  const editKobo = MoneyUtils.toKobo(editAmount);
  const canSave = canEdit && editKobo > 0 && editKobo !== expense.amount;

  const { updateExpenseFn, isPendingUpdateExpense } = useUpdateExpense({ onSuccess: onClose });

  // Equal and percentage splits re-split server-side; exact shares are fixed
  // kobo amounts, so they're scaled here and sent as the complete new split.
  const amountEdit =
    expense.splitType === SPLIT_TYPES.EXACT
      ? {
          amount: editKobo,
          splitType: SPLIT_TYPES.EXACT,
          shares: scaleExactShares(expense.shares, expense.amount, editKobo),
        }
      : { amount: editKobo };
  const { deleteExpenseFn, isPendingDeleteExpense } = useDeleteExpense({ onSuccess: onClose });

  const ids = { groupId, expenseId: expense.id };

  return (
    <BrandModal
      open
      onClose={onClose}
      title={
        <div className='flex min-w-0 items-center gap-2'>
          <h2 className='truncate text-xl font-bold text-text-header'>{expense.description}</h2>
          <StatusBadge
            text={category.label}
            icon={<category.Icon size={12} />}
            className={category.tint}
          />
        </div>
      }
      footerClassName='justify-between'
      footer={
        <>
          {canEdit ? (
            <BrandButton
              text='Delete'
              variant='danger'
              size='lg'
              iconStart={<IconTrash size={16} />}
              loading={isPendingDeleteExpense}
              onClick={() => deleteExpenseFn(ids)}
            />
          ) : (
            <span />
          )}
          <div className='flex gap-2'>
            <BrandButton text='Close' variant='secondary' size='lg' onClick={onClose} />
            {canEdit && (
              <BrandButton
                text='Save amount'
                size='lg'
                disabled={!canSave}
                loading={isPendingUpdateExpense}
                onClick={() => updateExpenseFn({ ...ids, ...amountEdit })}
              />
            )}
          </div>
        </>
      }
      bodyClassName='gap-5'
    >
      <div className='flex flex-col gap-1'>
        <span className='text-[32px] font-bold tabular-nums'>
          {MoneyUtils.format(expense.amount)}
        </span>
        <span className='text-13 text-text-description'>
          Paid by {displayName(expense.paidBy, meId, { object: true })} on {DateUtils.format(expense.date)} ·{' '}
          {SPLIT_LABELS[expense.splitType]} split
        </span>
      </div>

      <div className='overflow-hidden rounded-lg border border-grey-transparent'>
        {expense.shares.map((share) => (
          <div
            key={share.user.id}
            className='flex items-center gap-2.5 border-b border-grey-transparent px-3.5 py-2.5 last:border-b-0'
          >
            <Avatar id={share.user.id} name={share.user.name} size='xs' />
            <span className='flex-1 text-sm'>
              {share.user.name}
              {share.user.id === meId && ' (you)'}
            </span>
            <span className='text-xs text-text-muted'>
              {Math.round((share.amount / expense.amount) * 1000) / 10}%
            </span>
            <span className='w-[110px] text-right text-sm font-semibold tabular-nums'>
              {MoneyUtils.format(share.amount)}
            </span>
          </div>
        ))}
      </div>

      <BrandInput
        label='Edit amount'
        type='number'
        min='0'
        step='0.01'
        prefix='₦'
        disabled={!canEdit}
        value={editAmount}
        onChange={(e) => setEditAmount(e.target.value)}
        hint={
          canEdit
            ? 'Shares are recalculated with the same split type.'
            : 'Only the person who added this expense or the group admin can change it.'
        }
        className={cn(!canEdit && 'opacity-80')}
      />
    </BrandModal>
  );
};

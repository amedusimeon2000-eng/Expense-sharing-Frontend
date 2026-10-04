import { BrandInput } from '@/components/inputs/BrandInput';
import { Avatar } from '@/components/shared/Avatar';
import { SPLIT_TYPES } from '@/models/expense';
import { cn } from '@/utils/cn';
import { MoneyUtils } from '@/utils/money';
import { IconCheck } from '@tabler/icons-react';

export const SplitRow = ({ member, meId, form, split, onToggle, onInput }) => {
  const { id, name } = member.user;
  const isEqual = form.splitType === SPLIT_TYPES.EQUAL;
  const included = isEqual ? !!form.participants[id] : true;
  const value =
    form.splitType === SPLIT_TYPES.EXACT ? form.exact[id] : form.pct[id];

  return (
    <div className='flex min-h-12 items-center gap-2.5 border-b border-grey-transparent px-3 py-2 last:border-b-0'>
      {isEqual && (
        <button
          type='button'
          role='checkbox'
          aria-checked={included}
          aria-label={`Include ${name}`}
          onClick={onToggle}
          className={cn(
            'flex size-4 shrink-0 items-center justify-center rounded-sm border text-white',
            included
              ? 'border-orange-900 bg-orange-900'
              : 'border-grey-100 bg-white',
          )}
        >
          {included && <IconCheck size={12} />}
        </button>
      )}
      <Avatar id={id} name={name} size='xs' />
      <span
        className={cn(
          'min-w-0 flex-1 truncate text-sm',
          included ? 'text-text-main-1' : 'text-grey-300',
        )}
      >
        {name}
        {id === meId && ' (you)'}
      </span>
      {!isEqual && (
        <BrandInput
          type='number'
          min='0'
          step='any'
          size='sm'
          placeholder='0'
          prefix={form.splitType === SPLIT_TYPES.EXACT ? '₦' : '%'}
          value={value ?? ''}
          onChange={(e) => onInput(e.target.value)}
          className='w-24 shrink-0 sm:w-[120px]'
          inputClassName='pl-6 text-right'
        />
      )}
      <span className='w-[72px] shrink-0 text-right text-13 font-medium text-text-description tabular-nums sm:w-24'>
        {included && split.amount
          ? MoneyUtils.format(split.shares[id] ?? 0)
          : '—'}
      </span>
    </div>
  );
};

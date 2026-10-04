import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandInput } from '@/components/inputs/BrandInput';
import { InputLabel } from '@/components/inputs/InputLabel';
import { BrandModal } from '@/components/modals/BrandModal';
import { BrandSelect } from '@/components/select/BrandSelect';
import { useFetchGroup } from '@/features/groups/hooks/useFetchGroup';
import { useFetchMe } from '@/features/user/hooks/useFetchMe';
import { SPLIT_TYPES } from '@/models/expense';
import { cn } from '@/utils/cn';
import { DateUtils } from '@/utils/date';
import { IconCircleCheck, IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';
import { useCreateExpense } from '../hooks/useCreateExpense';
import { CATEGORY_OPTIONS } from '../store/data';
import { computeSplit } from '../utils/split';
import { SplitRow } from './SplitRow';
import { SplitTabs } from './SplitTabs';

const statusTones = {
  success: 'text-success-1100',
  warning: 'text-warning-1200',
  neutral: 'text-grey-500',
};

export const AddExpenseForm = ({ initialGroupId, groupOptions, onClose }) => {
  const { user: me } = useFetchMe();
  const [form, setForm] = useState({
    groupId: initialGroupId,
    description: '',
    amount: '',
    category: 'food',
    date: DateUtils.toInputDate(),
    paidBy: '',
    splitType: SPLIT_TYPES.EQUAL,
    participants: null,
    exact: {},
    pct: {},
  });

  const { members, isLoading } = useFetchGroup(form.groupId);
  const memberIds = members.map((m) => m.user.id);
  // Everyone is in by default until the user unticks someone.
  const participants =
    form.participants ?? Object.fromEntries(memberIds.map((id) => [id, true]));
  const paidBy = form.paidBy || me?.id || '';

  const split = computeSplit({ ...form, participants }, memberIds);
  const valid = split.ok && form.description.trim().length > 0 && !!form.date;

  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const { createExpenseFn, isPendingCreateExpense } = useCreateExpense({
    onSuccess: onClose,
  });

  const onSubmit = () => {
    if (!valid) return;
    createExpenseFn({
      groupId: form.groupId,
      description: form.description.trim(),
      amount: split.amount,
      category: form.category,
      paidBy,
      date: form.date,
      ...split.payload,
    });
  };

  const StatusIcon = split.ok ? IconCircleCheck : IconInfoCircle;

  return (
    <BrandModal
      open
      onClose={onClose}
      title='Add expense'
      footerClassName='flex-wrap justify-between'
      footer={
        <>
          <span
            className={cn(
              'flex items-center gap-1 text-xs font-medium max-sm:w-full',
              statusTones[split.tone],
            )}
          >
            <StatusIcon size={14} />
            {split.statusText}
          </span>
          <div className='flex gap-2 max-sm:ml-auto'>
            <BrandButton
              text='Cancel'
              variant='secondary'
              size='lg'
              onClick={onClose}
            />
            <BrandButton
              text='Record expense'
              size='lg'
              disabled={!valid}
              loading={isPendingCreateExpense}
              onClick={onSubmit}
            />
          </div>
        </>
      }
    >
      {groupOptions && (
        <BrandSelect
          label='Group'
          options={groupOptions}
          value={form.groupId}
          onChange={(e) =>
            update({
              groupId: e.target.value,
              participants: null,
              exact: {},
              pct: {},
              paidBy: '',
            })
          }
        />
      )}
      <BrandInput
        label='Description'
        placeholder='e.g. Dinner at Kilimanjaro'
        maxLength={100}
        value={form.description}
        onChange={(e) => update({ description: e.target.value })}
      />
      <div className='grid grid-cols-2 gap-3'>
        <BrandInput
          label='Amount'
          type='number'
          min='0'
          step='0.01'
          placeholder='0.00'
          prefix='₦'
          value={form.amount}
          onChange={(e) => update({ amount: e.target.value })}
        />
        <BrandInput
          label='Date'
          type='date'
          max={DateUtils.toInputDate()}
          value={form.date}
          onChange={(e) => update({ date: e.target.value })}
        />
        <BrandSelect
          label='Category'
          options={CATEGORY_OPTIONS}
          value={form.category}
          onChange={(e) => update({ category: e.target.value })}
        />
        <BrandSelect
          label='Paid by'
          options={members.map((m) => ({
            value: m.user.id,
            label: m.user.name + (m.user.id === me?.id ? ' (you)' : ''),
          }))}
          value={paidBy}
          onChange={(e) => update({ paidBy: e.target.value })}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <InputLabel label='Split' />
        <SplitTabs
          value={form.splitType}
          onChange={(splitType) => update({ splitType })}
        />
        <div className='overflow-hidden rounded-md border border-grey-transparent'>
          {isLoading && (
            <p className='px-3 py-4 text-13 text-text-muted'>
              Loading members…
            </p>
          )}
          {members.map((member) => (
            <SplitRow
              key={member.user.id}
              member={member}
              meId={me?.id}
              form={{ ...form, participants }}
              split={split}
              onToggle={() =>
                update({
                  participants: {
                    ...participants,
                    [member.user.id]: !participants[member.user.id],
                  },
                })
              }
              onInput={(value) =>
                form.splitType === SPLIT_TYPES.EXACT
                  ? update({
                      exact: { ...form.exact, [member.user.id]: value },
                    })
                  : update({ pct: { ...form.pct, [member.user.id]: value } })
              }
            />
          ))}
        </div>
      </div>
    </BrandModal>
  );
};

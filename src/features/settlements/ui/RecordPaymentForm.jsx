import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandInput } from '@/components/inputs/BrandInput';
import { BrandModal } from '@/components/modals/BrandModal';
import { BrandSelect } from '@/components/select/BrandSelect';
import { useFetchGroup } from '@/features/groups/hooks/useFetchGroup';
import { useFetchMe } from '@/features/user/hooks/useFetchMe';
import { MoneyUtils } from '@/utils/money';
import { ToastUtils } from '@/utils/toast';
import { IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import { useCreateSettlement } from '../hooks/useCreateSettlement';

export const RecordPaymentForm = ({ groupId, defaults, onClose }) => {
  const { user: me } = useFetchMe();
  const { group, members } = useFetchGroup(groupId);
  const [form, setForm] = useState({
    from: defaults?.from ?? '',
    to: defaults?.to ?? '',
    amount: defaults?.amount ? String(MoneyUtils.toNaira(defaults.amount)) : '',
    note: '',
  });

  const { createSettlementFn, isPendingCreateSettlement } = useCreateSettlement({
    onSuccess: onClose,
  });

  const options = members.map((m) => ({
    value: m.user.id,
    label: m.user.name + (m.user.id === me?.id ? ' (you)' : ''),
  }));
  const update = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  const onSubmit = () => {
    const amount = MoneyUtils.toKobo(form.amount);
    if (amount <= 0 || !form.from || !form.to || form.from === form.to) {
      return ToastUtils.errorToast({ message: 'Pick two different people and an amount.' });
    }
    createSettlementFn({
      groupId,
      from: form.from,
      to: form.to,
      amount,
      ...(form.note.trim() && { note: form.note.trim() }),
    });
  };

  return (
    <BrandModal
      open
      onClose={onClose}
      title='Record payment'
      size='sm'
      footer={
        <>
          <BrandButton text='Cancel' variant='secondary' size='lg' onClick={onClose} />
          <BrandButton
            text='Record payment'
            size='lg'
            loading={isPendingCreateSettlement}
            onClick={onSubmit}
          />
        </>
      }
    >
      <p className='text-13 text-text-description'>In {group?.name ?? '…'}</p>
      <div className='grid grid-cols-[1fr_auto_1fr] items-end gap-2'>
        <BrandSelect
          label='From'
          placeholder='Select'
          options={options}
          value={form.from}
          onChange={(e) => update({ from: e.target.value })}
        />
        <IconArrowRight size={16} className='mb-2.5 text-grey-400' />
        <BrandSelect
          label='To'
          placeholder='Select'
          options={options}
          value={form.to}
          onChange={(e) => update({ to: e.target.value })}
        />
      </div>
      <BrandInput
        label='Amount'
        type='number'
        min='0'
        step='0.01'
        prefix='₦'
        value={form.amount}
        onChange={(e) => update({ amount: e.target.value })}
      />
      <BrandInput
        label='Note'
        placeholder='e.g. Bank transfer'
        maxLength={200}
        value={form.note}
        onChange={(e) => update({ note: e.target.value })}
      />
    </BrandModal>
  );
};

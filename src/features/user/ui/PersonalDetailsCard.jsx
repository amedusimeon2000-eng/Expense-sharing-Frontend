import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandInput } from '@/components/inputs/BrandInput';
import { Panel } from '@/components/shared/Panel';
import { useState } from 'react';
import { useUpdateProfile } from '../hooks/useUpdateProfile';

export const PersonalDetailsCard = ({ user }) => {
  const [draft, setDraft] = useState(null);
  const name = draft ?? user?.name ?? '';
  const { updateProfileFn, isPendingUpdateProfile } = useUpdateProfile({
    onSuccess: () => setDraft(null),
  });

  const trimmed = name.trim();
  const canSave = trimmed.length >= 2 && trimmed !== user?.name;

  return (
    <Panel title='Personal details' headerClassName='px-5'>
      <div className='flex flex-col gap-4 p-5'>
        <BrandInput
          label='Name'
          maxLength={50}
          value={name}
          onChange={(e) => setDraft(e.target.value)}
        />
        <BrandInput label='Email' value={user?.email ?? ''} disabled readOnly />
        <div className='flex justify-end'>
          <BrandButton
            text='Save changes'
            disabled={!canSave}
            loading={isPendingUpdateProfile}
            onClick={() => updateProfileFn({ name: trimmed })}
          />
        </div>
      </div>
    </Panel>
  );
};

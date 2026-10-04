import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandInput } from '@/components/inputs/BrandInput';
import { BrandModal } from '@/components/modals/BrandModal';
import { Avatar } from '@/components/shared/Avatar';
import { InlineAlert } from '@/components/shared/InlineAlert';
import { useSearchUser } from '@/features/user/hooks/useSearchUser';
import { IconCircleCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { useAddMember } from '../hooks/useAddMember';

export const AddMemberForm = ({ group, members, onClose }) => {
  const [email, setEmail] = useState('');
  // Only searched when the user presses Search/Enter, not on every keystroke.
  const [searchedEmail, setSearchedEmail] = useState('');
  const { user, notFound, isFetching } = useSearchUser(searchedEmail);
  const { addMemberFn, isPendingAddMember } = useAddMember({ onSuccess: onClose });

  const isMember = !!user && members.some((m) => m.user.id === user.id);
  const found = user && !isMember && searchedEmail ? user : null;

  let error = '';
  if (searchedEmail && notFound) error = 'No SplitBook user with that email.';
  if (isMember) error = `${user.name} is already in this group.`;

  const search = () => setSearchedEmail(email.trim().toLowerCase());

  return (
    <BrandModal
      open
      onClose={onClose}
      title='Add member'
      size='sm'
      footer={
        <>
          <BrandButton text='Cancel' variant='secondary' size='lg' onClick={onClose} />
          <BrandButton
            text='Add to group'
            size='lg'
            disabled={!found}
            loading={isPendingAddMember}
            onClick={() => addMemberFn({ groupId: group.id, userId: found.id })}
          />
        </>
      }
    >
      <div className='flex flex-col gap-1'>
        <div className='flex items-end gap-2'>
          <BrandInput
            label='Email address'
            type='email'
            placeholder='friend@example.com'
            className='flex-1'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setSearchedEmail('');
            }}
            onKeyDown={(e) => e.key === 'Enter' && search()}
          />
          <BrandButton
            text='Search'
            variant='white'
            className='h-9 px-3'
            loading={isFetching}
            onClick={search}
          />
        </div>
        <p className='text-xs text-text-muted'>They need a SplitBook account.</p>
      </div>

      {error && <InlineAlert message={error} />}

      {found && (
        <div className='flex items-center gap-2.5 rounded-md border border-orange-300 bg-orange-100 p-3'>
          <Avatar id={found.id} name={found.name} size='base' />
          <div className='flex flex-1 flex-col gap-0.5'>
            <span className='text-sm font-medium'>{found.name}</span>
            <span className='text-xs text-text-description'>{found.email}</span>
          </div>
          <IconCircleCheck size={18} className='text-success-1000' />
        </div>
      )}
    </BrandModal>
  );
};

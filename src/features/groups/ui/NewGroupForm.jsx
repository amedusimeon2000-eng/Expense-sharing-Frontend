import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandInput } from '@/components/inputs/BrandInput';
import { BrandModal } from '@/components/modals/BrandModal';
import { AppRoutes } from '@/routes';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateGroup } from '../hooks/useCreateGroup';

export const NewGroupForm = ({ onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // A new group only has you in it, so land on Members to add people.
  const { createGroupFn, isPendingCreateGroup } = useCreateGroup({
    onSuccess: (group) => {
      onClose();
      navigate(`${AppRoutes.groupID(group.id)}?tab=members`);
    },
  });

  const valid = name.trim().length >= 2;

  return (
    <BrandModal
      open
      onClose={onClose}
      title='New group'
      size='sm'
      footer={
        <>
          <BrandButton text='Cancel' variant='secondary' size='lg' onClick={onClose} />
          <BrandButton
            text='Create group'
            size='lg'
            disabled={!valid}
            loading={isPendingCreateGroup}
            onClick={() =>
              createGroupFn({
                name: name.trim(),
                ...(description.trim() && { description: description.trim() }),
              })
            }
          />
        </>
      }
    >
      <BrandInput
        label='Group name'
        placeholder='e.g. Lagos trip'
        maxLength={60}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <BrandInput
        label='Description'
        placeholder='Optional'
        maxLength={200}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </BrandModal>
  );
};

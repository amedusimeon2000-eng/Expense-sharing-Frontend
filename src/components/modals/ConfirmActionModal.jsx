import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandModal } from './BrandModal';

export const ConfirmActionModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  loading,
}) => (
  <BrandModal
    open={open}
    onClose={onClose}
    title={title}
    size='sm'
    footer={
      <>
        <BrandButton text='Cancel' variant='secondary' size='lg' onClick={onClose} />
        <BrandButton
          text={confirmText}
          variant='danger'
          size='lg'
          loading={loading}
          onClick={onConfirm}
        />
      </>
    }
  >
    <p className='text-sm text-text-description'>{message}</p>
  </BrandModal>
);

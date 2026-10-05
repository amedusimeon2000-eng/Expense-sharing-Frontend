import { RecordPaymentForm } from './RecordPaymentForm';

export const RecordPaymentModal = ({ open, groupId, defaults, onClose }) =>
  open && groupId ? (
    <RecordPaymentForm
      groupId={groupId}
      defaults={defaults}
      onClose={onClose}
    />
  ) : null;

import { AddExpenseForm } from './AddExpenseForm';

export const AddExpenseModal = ({ open, onClose, groupId, groupOptions }) =>
  open ? (
    <AddExpenseForm
      initialGroupId={groupId}
      groupOptions={groupOptions}
      onClose={onClose}
    />
  ) : null;

import { NewGroupForm } from './NewGroupForm';

export const NewGroupModal = ({ open, onClose }) =>
  open ? <NewGroupForm onClose={onClose} /> : null;

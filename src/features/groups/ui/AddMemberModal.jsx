import { AddMemberForm } from './AddMemberForm';

export const AddMemberModal = ({ open, ...props }) =>
  open && props.group ? <AddMemberForm {...props} /> : null;

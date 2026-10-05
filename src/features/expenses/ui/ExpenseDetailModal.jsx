import { ExpenseDetail } from './ExpenseDetail';

export const ExpenseDetailModal = ({ expense, ...props }) =>
  expense ? <ExpenseDetail key={expense.id} expense={expense} {...props} /> : null;

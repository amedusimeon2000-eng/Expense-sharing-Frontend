import { cn } from '@/utils/cn';

export const InputLabel = ({ label, htmlFor, className }) => (
  <label htmlFor={htmlFor} className={cn('text-xs font-medium text-text-main-1', className)}>
    {label}
  </label>
);

import { cn } from '@/utils/cn';
import { IconAlertCircle } from '@tabler/icons-react';

export const InlineAlert = ({ message, className }) => (
  <div
    role='alert'
    className={cn(
      'flex items-center gap-1.5 rounded-md bg-error-transparent px-3 py-2.5 text-13 text-error-1000',
      className,
    )}
  >
    <IconAlertCircle size={16} className='shrink-0' />
    {message}
  </div>
);

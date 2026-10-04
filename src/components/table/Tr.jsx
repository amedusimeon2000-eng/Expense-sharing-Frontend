import { cn } from '@/utils/cn';

export const Tr = ({ children, onClick, className }) => (
  <tr
    onClick={onClick}
    className={cn(
      'border-b border-grey-transparent bg-white last:border-b-0',
      onClick && 'cursor-pointer hover:bg-brand-light',
      className,
    )}
  >
    {children}
  </tr>
);

import { cn } from '@/utils/cn';

export const Td = ({ children, align = 'left', className }) => (
  <td
    className={cn(
      'h-[52px] px-4 text-sm',
      align === 'right' ? 'text-right' : 'text-left',
      className,
    )}
  >
    {children}
  </td>
);

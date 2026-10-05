import { cn } from '@/utils/cn';

export const Th = ({ children, align = 'left', className }) => (
  <th
    className={cn(
      'h-[45px] px-4 text-sm font-semibold whitespace-nowrap text-text-main-1',
      align === 'right' ? 'text-right' : 'text-left',
      className,
    )}
  >
    {children}
  </th>
);

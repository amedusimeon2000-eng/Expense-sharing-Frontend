import { LOGO_SIZES } from '@/store/data/logo';
import { cn } from '@/utils/cn';
import { IconReceipt2 } from '@tabler/icons-react';

export const LogoMark = ({ size = 'lg', className }) => (
  <div
    className={cn(
      LOGO_SIZES[size].box,
      'flex shrink-0 items-center justify-center bg-orange-900 text-white',
      className,
    )}
  >
    <IconReceipt2 size={LOGO_SIZES[size].icon} />
  </div>
);

import { LOGO_SIZES } from '@/store/data/logo';
import { cn } from '@/utils/cn';
import { LogoMark } from './LogoMark';

export const Logo = ({ size = 'lg', onClick, className }) => (
  <div
    onClick={onClick}
    className={cn('flex items-center gap-2', onClick && 'cursor-pointer', className)}
  >
    <LogoMark size={size} />
    <span
      className={cn(
        LOGO_SIZES[size].text,
        'font-bold tracking-[-0.3px] whitespace-nowrap text-orange-1000',
      )}
    >
      SplitBook
    </span>
  </div>
);

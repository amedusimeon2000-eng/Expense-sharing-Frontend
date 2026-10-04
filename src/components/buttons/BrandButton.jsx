import { cn } from '@/utils/cn';
import { IconLoader2 } from '@tabler/icons-react';

const buttonVariants = {
  primary: 'bg-btn-main-1 text-white enabled:hover:bg-btn-main-hover',
  secondary: 'bg-brand-light text-text-main-1 enabled:hover:bg-grey-transparent',
  white:
    'bg-white border border-grey-transparent shadow-default text-text-main-1 enabled:hover:bg-brand-light',
  text: 'bg-transparent text-text-main-1 enabled:hover:bg-brand-light',
  danger: 'bg-error-transparent text-error-1000 enabled:hover:bg-error-100',
};

const buttonSizes = {
  sm: 'h-[26px] px-2 text-xs font-semibold',
  base: 'h-8 px-2.5 text-13 font-medium',
  lg: 'h-[38px] px-3 text-sm font-medium',
  xl: 'h-11 px-4 text-base font-medium',
};

export const BrandButton = ({
  text,
  loading,
  disabled,
  iconStart,
  iconEnd,
  className,
  loadingText,
  size = 'base',
  variant = 'primary',
  type = 'button',
  ...props
}) => (
  <button
    type={type}
    className={cn(
      buttonSizes[size],
      buttonVariants[variant],
      'inline-flex shrink-0 items-center justify-center gap-1.5 rounded-md transition-[colors,opacity,transform] duration-150 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:enabled:active:scale-[0.99]',
      className,
    )}
    disabled={disabled || loading}
    aria-busy={loading || undefined}
    {...props}
  >
    {iconStart && !loading && <span aria-hidden='true' className='flex'>{iconStart}</span>}
    {loading && <IconLoader2 size={14} className='animate-spin' aria-hidden='true' />}
    {text && <span>{loading ? loadingText || text : text}</span>}
    {iconEnd && <span aria-hidden='true' className='flex'>{iconEnd}</span>}
  </button>
);

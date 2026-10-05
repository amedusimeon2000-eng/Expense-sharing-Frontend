import { cn } from '@/utils/cn';
import { IconCircleX, IconSearch } from '@tabler/icons-react';

export const SearchInput = ({
  value,
  onChange,
  className,
  inputClassName,
  placeholder,
  ariaLabel,
  iconClassName,
}) => (
  <div className={cn('relative w-full', className)}>
    <span className='absolute top-1/2 left-2.5 -translate-y-1/2 text-grey-300'>
      <IconSearch size={14} className={iconClassName} />
    </span>

    <input
      type='text'
      value={value}
      placeholder={placeholder ?? 'Search'}
      onChange={(e) => onChange?.(e.target.value)}
      aria-label={ariaLabel ?? placeholder ?? 'Search'}
      className={cn(
        // Layout & spacing
        'h-8 w-full rounded-md pr-8 pl-8',
        // Typography
        'text-sm font-medium text-text-main-1',
        // Background & shadow
        'bg-brand-white shadow-default',
        // Placeholder
        'placeholder:text-xs placeholder:font-normal placeholder:text-text-tertiary',
        // Focus & autofill
        'autofill:bg-field-level-hover-1 focus:bg-field-level-hover-1 focus:outline-none',
        // Border
        'border border-grey-transparent',
        inputClassName,
      )}
    />

    {!!value?.length && (
      <button
        type='button'
        aria-label='Clear search'
        onClick={() => onChange?.('')}
        className='absolute top-1/2 right-2 -translate-y-1/2 text-text-tertiary'
      >
        <IconCircleX size={18} aria-hidden='true' />
      </button>
    )}
  </div>
);

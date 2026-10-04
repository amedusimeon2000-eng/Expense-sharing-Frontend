import { InputLabel } from '@/components/inputs/InputLabel';
import { cn } from '@/utils/cn';
import { IconChevronDown } from '@tabler/icons-react';
import { forwardRef, useId } from 'react';

export const BrandSelect = forwardRef(
  (
    { label, options = [], placeholder, className, error, id, ...props },
    ref,
  ) => {
    const autoId = useId();
    const selectId = id ?? autoId;

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && <InputLabel label={label} htmlFor={selectId} />}
        <div className='relative'>
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'h-9 w-full appearance-none truncate rounded-sm border border-grey-transparent bg-white pr-8 pl-2.5 text-sm text-text-main-1 shadow-default outline-none focus:border-orange-900',
              error && 'border-error-1000',
            )}
            {...props}
          >
            {placeholder && (
              <option value='' disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <IconChevronDown
            size={16}
            aria-hidden='true'
            className='pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-grey-500'
          />
        </div>
        {error && <p className='text-xs text-error-1000'>{error}</p>}
      </div>
    );
  },
);

BrandSelect.displayName = 'BrandSelect';

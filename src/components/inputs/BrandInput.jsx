import { cn } from '@/utils/cn';
import { forwardRef, useId } from 'react';
import { InputLabel } from './InputLabel';

const inputSizes = {
  sm: 'h-8',
  base: 'h-9',
  lg: 'h-10',
  xl: 'h-14 rounded-md text-2xl font-bold',
};

export const BrandInput = forwardRef(
  (
    {
      label,
      error,
      hint,
      iconStart,
      iconEnd,
      prefix,
      className,
      inputClassName,
      labelClassName,
      size = 'base',
      id,
      ...props
    },
    ref,
  ) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const hasStart = !!(iconStart || prefix);

    return (
      <div className={cn('flex flex-col gap-1', className)}>
        {label && (
          <InputLabel
            label={label}
            htmlFor={inputId}
            className={labelClassName}
          />
        )}
        <div className='relative'>
          {hasStart && (
            <span
              className={cn(
                'pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 text-grey-300',
                prefix && 'text-sm text-grey-500',
                size === 'xl' && 'left-3.5 text-[22px] font-semibold',
              )}
            >
              {iconStart ?? prefix}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error || undefined}
            className={cn(
              inputSizes[size],
              'w-full rounded-sm border border-grey-transparent bg-white px-3 text-sm text-text-main-1 shadow-default outline-none transition-colors focus:border-orange-900 disabled:cursor-not-allowed disabled:border-grey-980 disabled:bg-grey-25 disabled:text-grey-300 disabled:shadow-none',
              hasStart && (iconStart ? 'pl-[38px]' : 'pl-[26px]'),
              size === 'xl' && hasStart && 'pl-9',
              iconEnd && 'pr-10',
              error && 'border-error-1000 focus:border-error-1000',
              inputClassName,
            )}
            {...props}
          />
          {iconEnd && (
            <span className='absolute top-1/2 right-2 flex -translate-y-1/2'>
              {iconEnd}
            </span>
          )}
        </div>
        {error && <p className='text-xs text-error-1000'>{error}</p>}
        {!error && hint && <p className='text-xs text-text-muted'>{hint}</p>}
      </div>
    );
  },
);

BrandInput.displayName = 'BrandInput';

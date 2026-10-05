import { cn } from '@/utils/cn';

export const StatCard = ({
  label,
  value,
  valueClassName,
  Icon,
  iconClassName,
  isLoading,
}) => (
  <div className='flex min-h-[137px] items-start justify-between rounded-md border border-grey-transparent bg-white p-5 shadow-default'>
    <div className='flex min-w-0 flex-1 flex-col justify-between gap-4 self-stretch'>
      <p className='text-sm text-grey-500'>{label}</p>
      {isLoading ? (
        <div className='h-10 w-40 animate-pulse rounded-sm bg-grey-25' />
      ) : (
        <h3
          className={cn(
            'truncate text-[40px] font-bold tracking-[-1px] whitespace-nowrap tabular-nums',
            valueClassName,
          )}
        >
          {value}
        </h3>
      )}
    </div>
    <div
      className={cn(
        'mt-2 flex size-12 shrink-0 items-center justify-center rounded-full',
        iconClassName,
      )}
    >
      <Icon size={24} />
    </div>
  </div>
);

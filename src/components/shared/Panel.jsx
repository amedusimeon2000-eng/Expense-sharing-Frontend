import { cn } from '@/utils/cn';

export const Panel = ({
  title,
  description,
  action,
  children,
  className,
  headerClassName,
}) => (
  <div
    className={cn(
      'overflow-hidden rounded-lg border border-grey-transparent bg-white',
      className,
    )}
  >
    {title && (
      <div
        className={cn(
          'flex items-center justify-between gap-3 border-b border-grey-transparent px-4 py-3.5',
          headerClassName,
        )}
      >
        <div className='flex flex-col gap-0.5'>
          <h4 className='text-base font-semibold text-text-header'>{title}</h4>
          {description && (
            <p className='text-xs text-text-muted'>{description}</p>
          )}
        </div>
        {action}
      </div>
    )}
    {children}
  </div>
);

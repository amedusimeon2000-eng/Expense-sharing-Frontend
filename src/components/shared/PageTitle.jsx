import { StatusBadge } from '@/components/status/StatusBadge';

export const PageTitle = ({ title, count, badge, description, actions }) => (
  <div className='flex flex-wrap items-end justify-between gap-4'>
    <div className='flex flex-col gap-1'>
      <div className='flex items-center gap-2'>
        <h2 className='text-xl font-bold text-text-main-1'>{title}</h2>
        {count !== undefined && <StatusBadge text={count} tone='accent' />}
        {badge}
      </div>
      {description && (
        <p className='text-xs text-text-description'>{description}</p>
      )}
    </div>
    {actions && <div className='flex gap-2'>{actions}</div>}
  </div>
);

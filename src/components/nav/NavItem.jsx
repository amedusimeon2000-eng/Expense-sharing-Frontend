import { cn } from '@/utils/cn';

const dotColor = (net) =>
  net > 0 ? 'bg-success-1000' : net < 0 ? 'bg-error-1000' : 'bg-transparent';

export const NavItem = ({ item, collapsed }) => {
  const { Icon, label, active, onClick, net } = item;

  if (collapsed) {
    return (
      <button
        onClick={onClick}
        title={label}
        className={cn(
          'relative flex h-[38px] w-[43px] items-center justify-center self-center rounded-md',
          active ? 'bg-orange-1000 text-white' : 'text-text-main-1 hover:bg-brand-light',
        )}
      >
        <Icon size={14} />
        {net !== undefined && (
          <span
            className={cn('absolute top-2 right-[9px] size-[5px] rounded-full', dotColor(net))}
          />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'relative flex h-9 items-center gap-1.5 px-7 text-left text-sm font-medium',
        active ? 'text-orange-1000' : 'text-text-main-1 hover:text-orange-1000',
      )}
    >
      {active && (
        <span className='absolute top-0 left-0 h-9 w-[3px] rounded-r-[5px] bg-orange-900' />
      )}
      <Icon size={14} className='shrink-0' />
      <span className='flex-1 truncate'>{label}</span>
      {net !== undefined && <span className={cn('size-1.5 rounded-full', dotColor(net))} />}
    </button>
  );
};

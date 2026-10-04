import { cn } from '@/utils/cn';

export const GroupTabs = ({ tabs, value, onChange }) => (
  <div className='flex gap-5 overflow-x-auto border-b border-grey-transparent'>
    {tabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => onChange(tab.value)}
        className={cn(
          '-mb-px flex items-center gap-1.5 border-b-2 pb-2.5 text-sm font-medium whitespace-nowrap',
          value === tab.value
            ? 'border-orange-900 text-text-main-1'
            : 'border-transparent text-grey-300 hover:text-text-main-1',
        )}
      >
        {tab.label}
        {tab.count !== undefined && (
          <span className='text-xs text-grey-400'>{tab.count}</span>
        )}
      </button>
    ))}
  </div>
);

import { SPLIT_TYPES } from '@/models/expense';
import { cn } from '@/utils/cn';
import { SPLIT_LABELS } from '../store/data';

export const SplitTabs = ({ value, onChange }) => (
  <div className='flex gap-0.5 rounded-md bg-brand-light p-0.5'>
    {Object.values(SPLIT_TYPES).map((type) => (
      <button
        key={type}
        type='button'
        onClick={() => onChange(type)}
        className={cn(
          'h-[30px] flex-1 rounded-[5px] text-13 font-medium',
          value === type
            ? 'bg-white text-text-main-1 shadow-default'
            : 'text-grey-500',
        )}
      >
        {SPLIT_LABELS[type]}
      </button>
    ))}
  </div>
);

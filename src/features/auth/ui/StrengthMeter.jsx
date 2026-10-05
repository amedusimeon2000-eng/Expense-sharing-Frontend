import { cn } from '@/utils/cn';
import { passwordStrength } from '../store/passwordStrength';

export const StrengthMeter = ({ password }) => {
  const strength = passwordStrength(password);

  return (
    <div className='mt-1 flex items-center gap-2'>
      <div className='flex flex-1 gap-1'>
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={cn(
              'h-1 flex-1 rounded-xs',
              bar <= strength.level ? strength.color : 'bg-grey-transparent',
            )}
          />
        ))}
      </div>
      <span
        className={cn('min-w-11 text-right text-xs font-medium', strength.text)}
      >
        {strength.label}
      </span>
    </div>
  );
};

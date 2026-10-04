import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { forwardRef, useState } from 'react';
import { BrandInput } from './BrandInput';

export const PasswordInput = forwardRef(
  ({ visible, onToggleVisible, ...props }, ref) => {
    const [localVisible, setLocalVisible] = useState(false);
    const isVisible = visible ?? localVisible;
    const toggle = onToggleVisible ?? (() => setLocalVisible((v) => !v));
    const Icon = isVisible ? IconEyeOff : IconEye;

    return (
      <BrandInput
        ref={ref}
        type={isVisible ? 'text' : 'password'}
        iconEnd={
          <button
            type='button'
            onClick={toggle}
            aria-label={isVisible ? 'Hide password' : 'Show password'}
            className='flex size-7 items-center justify-center text-grey-500'
          >
            <Icon size={16} />
          </button>
        }
        {...props}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

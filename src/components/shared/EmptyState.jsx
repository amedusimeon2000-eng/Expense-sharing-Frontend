import { BrandButton } from '@/components/buttons/BrandButton';
import { cn } from '@/utils/cn';
import { IconPlus } from '@tabler/icons-react';
import { EMPTY_STATE_ICONS } from '@/store/data/emptyState';
import { useNavigate } from 'react-router-dom';

export const EmptyState = ({
  title,
  subtitle,
  imgUrl,
  ctaLabel,
  ctaRoute,
  onClick,
  titleClassName,
  containerClassName,
  customButton,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-center gap-4 rounded-[10px] bg-white px-4 py-12',
        containerClassName,
      )}
    >
      <img alt='' src={imgUrl ?? EMPTY_STATE_ICONS.folder} />

      <div className='flex max-w-67.5 flex-col items-center justify-center'>
        <h2
          className={cn(
            'text-center text-xl font-semibold text-text-main-1',
            titleClassName,
          )}
        >
          {title}
        </h2>
        <p className='text-center text-sm text-text-sub-1'>{subtitle}</p>
      </div>

      {customButton
        ? customButton
        : ctaLabel && (
            <BrandButton
              text={ctaLabel}
              size='lg'
              iconStart={<IconPlus size={16} />}
              onClick={() => (ctaRoute ? navigate(ctaRoute) : onClick?.())}
            />
          )}
    </div>
  );
};

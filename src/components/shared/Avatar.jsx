import { AvatarUtils } from '@/utils/avatar';
import { cn } from '@/utils/cn';

const avatarSizes = {
  xs: 'size-[26px] text-[10px]',
  sm: 'size-7 text-[11px]',
  base: 'size-8 text-xs',
};

export const Avatar = ({ id, name, size = 'sm', className }) => (
  <div
    title={name}
    className={cn(
      avatarSizes[size],
      AvatarUtils.colors(id ?? name),
      'flex shrink-0 items-center justify-center rounded-full font-semibold',
      className,
    )}
  >
    {AvatarUtils.initials(name)}
  </div>
);

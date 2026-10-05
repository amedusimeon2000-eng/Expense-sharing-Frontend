import { useFetchMe } from '@/features/user/hooks/useFetchMe';
import { AppRoutes } from '@/routes';
import { useSidebarStore } from '@/store/state/sidebar.store';
import { AvatarUtils } from '@/utils/avatar';
import { IconMenu2 } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const TopBar = ({ contentLeft, gutter, isMobile }) => {
  const navigate = useNavigate();
  const { user } = useFetchMe();
  const { openDrawer } = useSidebarStore();

  return (
    <header
      style={{ paddingLeft: contentLeft, paddingRight: gutter }}
      className='fixed inset-x-0 top-0 z-40 flex h-[52px] items-center justify-between gap-3 border-b border-grey-transparent bg-white py-2 transition-[padding] duration-300'
    >
      {isMobile && (
        <button
          onClick={openDrawer}
          aria-label='Open menu'
          className='flex size-9 shrink-0 items-center justify-center rounded-md border border-grey-transparent bg-white text-text-main-1 shadow-default'
        >
          <IconMenu2 size={18} />
        </button>
      )}

      <button
        onClick={() => navigate(AppRoutes.profile)}
        className='ml-auto flex shrink-0 items-center gap-2.5 text-left'
      >
        <div className='hidden flex-col items-end sm:flex'>
          <span className='text-13 font-semibold text-text-main-1'>{user?.name ?? '…'}</span>
          <span className='text-xs text-text-muted'>{user?.email}</span>
        </div>
        <div className='relative flex size-8 items-center justify-center rounded-full bg-orange-100 text-xs font-semibold text-orange-1000'>
          {AvatarUtils.initials(user?.name ?? '')}
          <span className='absolute right-0 bottom-0 flex size-2.5 items-center justify-center rounded-full bg-white'>
            <span className='size-[5px] rounded-full bg-success-1000' />
          </span>
        </div>
      </button>
    </header>
  );
};

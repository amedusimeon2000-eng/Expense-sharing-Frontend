import { Sidebar } from '@/components/nav/Sidebar';
import { TopBar } from '@/components/nav/TopBar';
import { useIsMobile } from '@/hooks/utils/useIsMobile';
import { SIDEBAR_WIDTH, useSidebarStore } from '@/store/state/sidebar.store';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  const { collapsed } = useSidebarStore();
  const isMobile = useIsMobile();

  const gutter = isMobile ? 16 : 24;
  const sidebarWidth = collapsed
    ? SIDEBAR_WIDTH.collapsed
    : SIDEBAR_WIDTH.expanded;
  const contentLeft = isMobile ? gutter : sidebarWidth + gutter;

  return (
    <div className='min-h-screen bg-surface-level-2'>
      <Sidebar />
      <TopBar contentLeft={contentLeft} gutter={gutter} isMobile={isMobile} />
      <main
        style={{
          marginLeft: contentLeft,
          marginRight: gutter,
          paddingTop: isMobile ? 68 : 80,
        }}
        className='flex min-w-0 flex-col gap-6 pb-6 transition-[margin] duration-300'
      >
        <Outlet />
      </main>
    </div>
  );
};

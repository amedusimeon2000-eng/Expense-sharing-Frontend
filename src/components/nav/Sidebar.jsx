import { Logo } from '@/components/shared/Logo';
import { LogoMark } from '@/components/shared/LogoMark';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useFetchGroups } from '@/features/groups/hooks/useFetchGroups';
import { useFetchSummary } from '@/features/user/hooks/useFetchSummary';
import { useIsMobile } from '@/hooks/utils/useIsMobile';
import { FULL_LIST_LIMIT } from '@/models/serviceRequests';
import { AppRoutes } from '@/routes';
import { useSidebarStore } from '@/store/state/sidebar.store';
import { cn } from '@/utils/cn';
import {
  IconArrowLeft,
  IconArrowRight,
  IconLayoutDashboard,
  IconLogout,
  IconUserCircle,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavSection } from './NavSection';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const { collapsed: railCollapsed, toggleSidebar, drawerOpen, closeDrawer } = useSidebarStore();
  const { groups } = useFetchGroups({ limit: FULL_LIST_LIMIT });
  const { groups: groupNets } = useFetchSummary();
  const { logoutFn } = useLogout();

  // On mobile the sidebar is a full-width drawer, never the icon rail.
  const collapsed = !isMobile && railCollapsed;
  const isHidden = isMobile && !drawerOpen;

  const netById = Object.fromEntries(groupNets.map((g) => [g.id, g.net]));

  /** Navigating from the drawer closes it. */
  const go = (to) => {
    navigate(to);
    closeDrawer();
  };

  const mainItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      Icon: IconLayoutDashboard,
      active: pathname === AppRoutes.dashboard,
      onClick: () => go(AppRoutes.dashboard),
    },
    {
      key: 'groups',
      label: 'Groups',
      Icon: IconUsersGroup,
      active: pathname === AppRoutes.groups,
      onClick: () => go(AppRoutes.groups),
    },
  ];

  const groupItems = groups.map((group) => ({
    key: group.id,
    label: group.name,
    Icon: IconUsers,
    net: netById[group.id] ?? 0,
    active: pathname === AppRoutes.groupID(group.id),
    onClick: () => go(AppRoutes.groupID(group.id)),
  }));

  const accountItems = [
    {
      key: 'profile',
      label: 'Profile',
      Icon: IconUserCircle,
      active: pathname === AppRoutes.profile,
      onClick: () => go(AppRoutes.profile),
    },
    { key: 'logout', label: 'Log out', Icon: IconLogout, onClick: () => logoutFn() },
  ];

  const sections = [
    { label: 'Menu', items: mainItems },
    { label: 'Your groups', items: groupItems },
    { label: 'Account', items: accountItems },
  ].filter((section) => section.items.length);

  return (
    <>
      {isMobile && drawerOpen && (
        <div onClick={closeDrawer} className='overlay_bg fixed inset-0 z-[45]' aria-hidden='true' />
      )}
      <aside
        aria-hidden={isHidden || undefined}
        inert={isHidden || undefined}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col gap-7 overflow-hidden border-r border-grey-transparent bg-white pb-4 transition-[width,transform] duration-300',
          collapsed ? 'w-[70px]' : 'w-[270px]',
          isHidden && '-translate-x-full',
          isMobile && drawerOpen && 'shadow-popover',
        )}
      >
        <div
          className={cn(
            'flex h-[52px] min-h-[52px] items-center gap-2 border-b border-grey-transparent',
            collapsed ? 'justify-center' : 'px-4',
          )}
        >
          {collapsed ? (
            <button onClick={toggleSidebar} aria-label='Expand sidebar'>
              <LogoMark size='base' />
            </button>
          ) : (
            <>
              <Logo size='base' onClick={() => go(AppRoutes.dashboard)} className='flex-1' />
              <button
                onClick={isMobile ? closeDrawer : toggleSidebar}
                aria-label={isMobile ? 'Close menu' : 'Collapse sidebar'}
                className='flex size-[22px] shrink-0 items-center justify-center rounded-full bg-brand-light text-text-main-1 hover:bg-grey-transparent'
              >
                <IconArrowLeft size={14} />
              </button>
            </>
          )}
        </div>

        <nav className='hide-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto'>
          {sections.map((section, index) => (
            <div key={section.label} className='flex flex-col gap-3'>
              {collapsed && index > 0 && <div className='mx-4 h-px bg-grey-transparent' />}
              <NavSection label={section.label} items={section.items} collapsed={collapsed} />
            </div>
          ))}
        </nav>

        {collapsed && (
          <div className='flex justify-center'>
            <button
              onClick={toggleSidebar}
              aria-label='Expand sidebar'
              className='flex size-[22px] items-center justify-center rounded-full bg-brand-light text-text-main-1 hover:bg-grey-transparent'
            >
              <IconArrowRight size={14} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

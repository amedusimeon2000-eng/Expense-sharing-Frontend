import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const SIDEBAR_WIDTH = { expanded: 270, collapsed: 70 };

export const useSidebarStore = create()(
  persist(
    (set) => ({
      collapsed: false,
      drawerOpen: false,
      toggleSidebar: () => set((state) => ({ collapsed: !state.collapsed })),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
    }),
    {
      name: 'splitbook-sidebar',
      partialize: ({ collapsed }) => ({ collapsed }),
    },
  ),
);

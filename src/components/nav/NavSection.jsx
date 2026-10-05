import { NavItem } from './NavItem';

export const NavSection = ({ label, items, collapsed }) => (
  <div className='flex flex-col gap-2'>
    {!collapsed && <p className='px-5 text-xs font-medium text-grey-400'>{label}</p>}
    <div className='flex flex-col gap-0.5'>
      {items.map((item) => (
        <NavItem key={item.key} item={item} collapsed={collapsed} />
      ))}
    </div>
  </div>
);

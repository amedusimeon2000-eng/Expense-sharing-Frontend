import { Logo } from '@/components/shared/Logo';
import { AUTH_POINTS } from '@/features/landing/store/data';
import { AppRoutes } from '@/routes';
import { IconArrowDownLeft } from '@tabler/icons-react';
import { Outlet, useNavigate } from 'react-router-dom';

export const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <div className='grid min-h-screen grid-cols-[repeat(auto-fit,minmax(min(100%,460px),1fr))] bg-white'>
      <div className='flex flex-col gap-12 border-r border-grey-transparent bg-surface-level-2 px-10 py-8'>
        <Logo onClick={() => navigate(AppRoutes.home)} className='self-start' />
        <div className='flex max-w-[460px] flex-1 flex-col justify-center gap-8'>
          <h2 className='text-[34px] leading-[1.15] font-extrabold tracking-[-0.8px] text-balance'>
            Know who owes what, in every group.
          </h2>
          <div className='flex flex-col gap-4'>
            {AUTH_POINTS.map(({ Icon, text }) => (
              <div key={text} className='flex items-start gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-1000'>
                  <Icon size={16} />
                </div>
                <p className='pt-1.5 text-sm leading-normal text-text-description'>{text}</p>
              </div>
            ))}
          </div>
          <div className='flex max-w-[380px] items-center gap-3 rounded-lg border border-grey-transparent bg-white p-4 shadow-card-shadow'>
            <div className='flex size-10 items-center justify-center rounded-full bg-success-transparent text-success-1100'>
              <IconArrowDownLeft size={20} />
            </div>
            <div className='flex flex-1 flex-col gap-0.5'>
              <span className='text-xs text-grey-500'>You are owed</span>
              <span className='text-[22px] font-bold text-success-1100 tabular-nums'>₦98,375</span>
            </div>
            <span className='text-xs text-text-muted'>Lagos trip</span>
          </div>
        </div>
      </div>

      <div className='flex items-center justify-center bg-white px-10 py-8'>
        <div className='flex w-full max-w-[440px] flex-col gap-8'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

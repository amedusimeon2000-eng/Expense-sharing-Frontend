import { Logo } from '@/components/shared/Logo';

export const LandingFooter = () => (
  <footer className='border-t border-grey-transparent'>
    <div className='mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 p-6'>
      <Logo size='sm' />
      <p className='text-xs text-text-muted'>© {new Date().getFullYear()} SplitBook</p>
    </div>
  </footer>
);

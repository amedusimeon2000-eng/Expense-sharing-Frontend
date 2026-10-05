import { BrandButton } from '@/components/buttons/BrandButton';
import { StatusBadge } from '@/components/status/StatusBadge';
import { AppRoutes } from '@/routes';
import { IconArrowRight, IconUsersGroup } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { HeroIllustration } from './HeroIllustration';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className='mx-auto grid max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] items-center gap-14 px-6 pt-[72px] pb-[88px]'>
      <div className='flex flex-col items-start gap-6'>
        <StatusBadge
          text='For friends, flatmates and trips'
          icon={<IconUsersGroup size={14} />}
          className='h-[26px] gap-1.5 bg-orange-100 px-2.5 font-semibold text-orange-1000'
        />
        <h1 className='text-[clamp(40px,5.2vw,60px)] leading-[1.05] font-extrabold tracking-[-1.8px] text-balance'>
          Shared expenses, settled.
        </h1>
        <p className='max-w-[500px] text-lg leading-[1.55] text-pretty text-text-description'>
          SplitBook keeps track of who paid for what in your groups, then works out the fewest
          payments it takes for everyone to square up.
        </p>
        <div className='flex flex-wrap gap-2'>
          <BrandButton
            text='Create a free account'
            size='xl'
            iconEnd={<IconArrowRight size={16} />}
            onClick={() => navigate(AppRoutes.register)}
          />
          <BrandButton
            text='Log in'
            variant='white'
            size='xl'
            onClick={() => navigate(AppRoutes.login)}
          />
        </div>
      </div>
      <HeroIllustration />
    </section>
  );
};

import { BrandButton } from '@/components/buttons/BrandButton';
import { Logo } from '@/components/shared/Logo';
import { AppRoutes } from '@/routes';
import { useNavigate } from 'react-router-dom';

export const LandingNav = () => {
  const navigate = useNavigate();

  return (
    <nav className='sticky top-0 z-30 border-b border-grey-transparent bg-white/92 backdrop-blur-[30px] backdrop-saturate-200'>
      <div className='mx-auto flex h-16 max-w-[1200px] items-center gap-8 px-6'>
        <Logo />
        <div className='hidden flex-1 gap-6 sm:flex'>
          <a
            href='#how'
            className='text-sm font-medium text-text-description hover:text-text-main-1'
          >
            How it works
          </a>
          <a
            href='#features'
            className='text-sm font-medium text-text-description hover:text-text-main-1'
          >
            Features
          </a>
        </div>
        <div className='ml-auto flex gap-2'>
          <BrandButton
            text='Log in'
            variant='text'
            size='lg'
            onClick={() => navigate(AppRoutes.login)}
          />
          <BrandButton
            text='Get started'
            size='lg'
            onClick={() => navigate(AppRoutes.register)}
          />
        </div>
      </div>
    </nav>
  );
};

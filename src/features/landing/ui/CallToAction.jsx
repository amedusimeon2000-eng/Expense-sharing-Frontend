import { BrandButton } from '@/components/buttons/BrandButton';
import { AppRoutes } from '@/routes';
import { IconArrowRight } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const CallToAction = () => {
  const navigate = useNavigate();

  return (
    <section className='mx-auto max-w-[1200px] px-6 pb-20'>
      <div className='flex flex-wrap items-center justify-between gap-6 rounded-[20px] border border-orange-300 bg-orange-100 p-12'>
        <div className='flex max-w-[560px] flex-col gap-2'>
          <h2 className='text-3xl leading-[1.15] font-extrabold tracking-[-0.6px]'>
            Start your first group
          </h2>
          <p className='text-base text-text-description'>
            It takes a name, an email and a password.
          </p>
        </div>
        <BrandButton
          text='Create a free account'
          size='xl'
          iconEnd={<IconArrowRight size={16} />}
          onClick={() => navigate(AppRoutes.register)}
        />
      </div>
    </section>
  );
};

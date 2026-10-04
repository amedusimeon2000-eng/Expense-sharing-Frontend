import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandInput } from '@/components/inputs/BrandInput';
import { PasswordInput } from '@/components/inputs/PasswordInput';
import { InlineAlert } from '@/components/shared/InlineAlert';
import { AppRoutes } from '@/routes';
import { loginSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLock, IconMail } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { authInputProps } from '../store/data';
import { AuthHeading } from './AuthHeading';

export const LoginForm = () => {
  const [serverError, setServerError] = useState('');
  const { loginFn, isLoginPending } = useLogin({ onError: setServerError });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const clearError = { onChange: () => setServerError('') };
  const error = serverError || errors.email?.message || errors.password?.message;

  const onSubmit = handleSubmit((data) => {
    setServerError('');
    loginFn({ email: data.email, password: data.password });
  });

  return (
    <form onSubmit={onSubmit} noValidate className='flex flex-col gap-8'>
      <AuthHeading title='Welcome back' description='Log in to see your groups and balances.' />

      <div className='flex flex-col gap-5'>
        <BrandInput
          {...authInputProps}
          label='Email'
          type='email'
          autoComplete='email'
          placeholder='you@example.com'
          iconStart={<IconMail size={16} />}
          {...register('email', clearError)}
        />
        <PasswordInput
          {...authInputProps}
          label='Password'
          autoComplete='current-password'
          placeholder='Enter your password'
          iconStart={<IconLock size={16} />}
          {...register('password', clearError)}
        />
        {error && <InlineAlert message={error} />}
      </div>

      <div className='flex flex-col gap-4'>
        <BrandButton
          type='submit'
          text='Log in'
          loadingText='Logging in…'
          size='xl'
          className='w-full'
          loading={isLoginPending}
        />
        <p className='text-center text-sm text-grey-500'>
          New to SplitBook?{' '}
          <Link to={AppRoutes.register} className='font-semibold text-orange-1000'>
            Create an account
          </Link>
        </p>
      </div>
    </form>
  );
};

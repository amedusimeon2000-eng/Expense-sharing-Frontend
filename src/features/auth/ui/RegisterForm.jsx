import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandInput } from '@/components/inputs/BrandInput';
import { PasswordInput } from '@/components/inputs/PasswordInput';
import { AppRoutes } from '@/routes';
import { registerSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLock, IconLockCheck, IconMail, IconUser } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useRegister } from '../hooks/useRegister';
import { authInputProps } from '../store/data';
import { AuthHeading } from './AuthHeading';
import { StrengthMeter } from './StrengthMeter';

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirm: '' },
  });

  const password = useWatch({ control, name: 'password' });

  const { registerFn, isRegisterPending } = useRegister({
    onFieldError: (field, message) =>
      setError(['name', 'email', 'password'].includes(field) ? field : 'email', { message }),
  });

  const onSubmit = handleSubmit(({ name, email, password }) =>
    registerFn({ name, email, password }),
  );

  const passwordProps = {
    ...authInputProps,
    visible: showPassword,
    onToggleVisible: () => setShowPassword((v) => !v),
  };

  return (
    <form onSubmit={onSubmit} noValidate className='flex flex-col gap-8'>
      <AuthHeading
        title='Create your account'
        description='Enter your details to start splitting expenses.'
      />

      <div className='flex flex-col gap-5'>
        <BrandInput
          {...authInputProps}
          label='Full name'
          autoComplete='name'
          placeholder='e.g. Ngozi Okafor'
          iconStart={<IconUser size={16} />}
          error={errors.name?.message}
          {...register('name')}
        />
        <BrandInput
          {...authInputProps}
          label='Email'
          type='email'
          autoComplete='email'
          placeholder='you@example.com'
          iconStart={<IconMail size={16} />}
          error={errors.email?.message}
          {...register('email')}
        />
        <div className='flex flex-col gap-1'>
          <PasswordInput
            {...passwordProps}
            label='Password'
            autoComplete='new-password'
            placeholder='At least 8 characters'
            iconStart={<IconLock size={16} />}
            {...register('password')}
          />
          <StrengthMeter password={password} />
          {errors.password && (
            <p className='text-xs text-error-1000'>{errors.password.message}</p>
          )}
        </div>
        <BrandInput
          {...authInputProps}
          label='Confirm password'
          type={showPassword ? 'text' : 'password'}
          autoComplete='new-password'
          placeholder='Repeat your password'
          iconStart={<IconLockCheck size={16} />}
          error={errors.confirm?.message}
          {...register('confirm')}
        />
      </div>

      <div className='flex flex-col gap-4'>
        <BrandButton
          type='submit'
          text='Create account'
          loadingText='Creating account…'
          size='xl'
          className='w-full'
          loading={isRegisterPending}
        />
        <p className='text-center text-sm text-grey-500'>
          Already have an account?{' '}
          <Link to={AppRoutes.login} className='font-semibold text-orange-1000'>
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

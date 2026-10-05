import { BrandButton } from '@/components/buttons/BrandButton';
import { BrandInput } from '@/components/inputs/BrandInput';
import { Panel } from '@/components/shared/Panel';
import { useChangePassword } from '@/features/auth/hooks/useChangePassword';
import { changePasswordSchema } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

export const ChangePasswordCard = () => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: '', newPassword: '', confirm: '' },
  });

  const { changePasswordFn, isPendingChangePassword } = useChangePassword({
    onSuccess: () => reset(),
    onError: (error) => {
      const fieldError = error?.response?.data?.errors?.[0];
      if (['currentPassword', 'newPassword'].includes(fieldError?.field)) {
        setError(fieldError.field, { message: fieldError.message });
      }
    },
  });

  const onSubmit = handleSubmit(({ currentPassword, newPassword }) =>
    changePasswordFn({ currentPassword, newPassword }),
  );

  // The design shows one error line under the fields, not one per field.
  const error =
    errors.currentPassword?.message || errors.newPassword?.message || errors.confirm?.message;

  return (
    <Panel
      title='Change password'
      description='Changing it signs you out on your other devices'
      headerClassName='px-5'
    >
      <form onSubmit={onSubmit} noValidate className='flex flex-col gap-4 p-5'>
        <BrandInput
          label='Current password'
          type='password'
          autoComplete='current-password'
          placeholder='Enter current password'
          {...register('currentPassword')}
        />
        <BrandInput
          label='New password'
          type='password'
          autoComplete='new-password'
          placeholder='At least 8 characters'
          {...register('newPassword')}
        />
        <BrandInput
          label='Confirm new password'
          type='password'
          autoComplete='new-password'
          placeholder='Repeat new password'
          {...register('confirm')}
        />
        <p className='min-h-3.5 text-xs text-error-1000'>{error}</p>
        <div className='flex justify-end'>
          <BrandButton type='submit' text='Update password' loading={isPendingChangePassword} />
        </div>
      </form>
    </Panel>
  );
};

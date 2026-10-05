import { PageTitle } from '@/components/shared/PageTitle';
import { ChangePasswordCard } from '@/features/user/ui/ChangePasswordCard';
import { PersonalDetailsCard } from '@/features/user/ui/PersonalDetailsCard';
import { SessionsTable } from '@/features/user/ui/SessionsTable';
import { useFetchMe } from '@/features/user/hooks/useFetchMe';

export const Profile = () => {
  const { user } = useFetchMe();

  return (
    <>
      <PageTitle title='Profile' description='Your details, password and signed-in devices' />
      <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-4'>
        <PersonalDetailsCard user={user} />
        <ChangePasswordCard />
      </div>
      <SessionsTable />
    </>
  );
};

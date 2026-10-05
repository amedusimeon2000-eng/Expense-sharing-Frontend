import { BrandButton } from '@/components/buttons/BrandButton';
import { EMPTY_STATE_INLINE } from '@/store/data/emptyState';
import { PageTitle } from '@/components/shared/PageTitle';
import { Panel } from '@/components/shared/Panel';
import { usePeopleBalances } from '@/features/dashboard/hooks/usePeopleBalances';
import { PeopleBalances } from '@/features/dashboard/ui/PeopleBalances';
import { RecentActivity } from '@/features/dashboard/ui/RecentActivity';
import { StatCards } from '@/features/dashboard/ui/StatCards';
import { AddExpenseModal } from '@/features/expenses/ui/AddExpenseModal';
import { useFetchGroups } from '@/features/groups/hooks/useFetchGroups';
import { GroupsTable } from '@/features/groups/ui/GroupsTable';
import { RecordPaymentModal } from '@/features/settlements/ui/RecordPaymentModal';
import { useFetchMe } from '@/features/user/hooks/useFetchMe';
import { useFetchSummary } from '@/features/user/hooks/useFetchSummary';
import { FULL_LIST_LIMIT } from '@/models/serviceRequests';
import { AppRoutes } from '@/routes';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DASHBOARD_GROUP_ROWS = 5;

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useFetchMe();
  const summary = useFetchSummary();
  const { groups, isLoading: isLoadingGroups } = useFetchGroups({
    limit: FULL_LIST_LIMIT,
  });
  const { people, isLoading: isLoadingPeople } = usePeopleBalances({
    groups: summary.groups,
    meId: user?.id,
  });

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [settle, setSettle] = useState(null);

  const netById = Object.fromEntries(summary.groups.map((g) => [g.id, g.net]));
  const groupOptions = groups.map((g) => ({ value: g.id, label: g.name }));

  return (
    <>
      <PageTitle
        title='Dashboard'
        description='Your balances across all groups'
        actions={
          <BrandButton
            text='Add expense'
            size='lg'
            disabled={!groups.length}
            iconStart={<IconPlus size={16} />}
            onClick={() => setIsAddOpen(true)}
            title={groups.length ? undefined : 'Create a group first'}
          />
        }
      />

      <StatCards
        net={summary.net}
        youAreOwed={summary.youAreOwed}
        youOwe={summary.youOwe}
        isLoading={summary.isLoading}
      />

      <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-4'>
        <PeopleBalances
          people={people}
          isLoading={summary.isLoading || isLoadingPeople}
          onSettle={setSettle}
        />
        <RecentActivity
          items={summary.recentActivity}
          meId={user?.id}
          isLoading={summary.isLoading}
        />
      </div>

      <Panel
        title='Your groups'
        action={
          <button
            onClick={() => navigate(AppRoutes.groups)}
            className='text-13 font-medium text-orange-1000'
          >
            View all
          </button>
        }
      >
        <GroupsTable
          groups={groups.slice(0, DASHBOARD_GROUP_ROWS)}
          netById={netById}
          isLoading={isLoadingGroups}
          emptyStateProps={{
            title: 'No groups yet',
            subtitle: 'You have no groups at the moment',
            ctaLabel: 'Create a group',
            ctaRoute: AppRoutes.groups,
            containerClassName: EMPTY_STATE_INLINE,
          }}
        />
      </Panel>

      <AddExpenseModal
        open={isAddOpen}
        groupId={groups[0]?.id}
        groupOptions={groupOptions}
        onClose={() => setIsAddOpen(false)}
      />
      <RecordPaymentModal
        open={!!settle}
        groupId={settle?.groupId}
        defaults={settle}
        onClose={() => setSettle(null)}
      />
    </>
  );
};

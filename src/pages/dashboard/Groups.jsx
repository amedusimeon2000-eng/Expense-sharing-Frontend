import { BrandButton } from '@/components/buttons/BrandButton';
import { EmptyState } from '@/components/shared/EmptyState';
import { PageTitle } from '@/components/shared/PageTitle';
import { Panel } from '@/components/shared/Panel';
import { useFetchGroups } from '@/features/groups/hooks/useFetchGroups';
import { GroupsTable } from '@/features/groups/ui/GroupsTable';
import { NewGroupModal } from '@/features/groups/ui/NewGroupModal';
import { useFetchSummary } from '@/features/user/hooks/useFetchSummary';
import { useGetSharedQueryParams } from '@/hooks/utils/useGetSharedQueryParams';
import { FULL_LIST_LIMIT } from '@/models/serviceRequests';
import { IconPlus } from '@tabler/icons-react';
import { useState } from 'react';

export const Groups = () => {
  const { search } = useGetSharedQueryParams();
  const { groups, total, isLoading } = useFetchGroups({ limit: FULL_LIST_LIMIT, search });
  const { groups: groupNets } = useFetchSummary();
  const [isNewOpen, setIsNewOpen] = useState(false);

  const netById = Object.fromEntries(groupNets.map((g) => [g.id, g.net]));

  return (
    <>
      <PageTitle
        title='Groups'
        count={isLoading ? undefined : total}
        description='Groups you share expenses with'
        actions={
          <BrandButton
            text='New group'
            size='lg'
            iconStart={<IconPlus size={16} />}
            onClick={() => setIsNewOpen(true)}
          />
        }
      />

      {!isLoading && !groups.length ? (
        <EmptyState
          {...(search
            ? {
                title: 'No groups found',
                subtitle: `No group matching "${search}" was found.`,
              }
            : {
                title: 'No groups yet',
                subtitle: 'You have no groups at the moment',
                ctaLabel: 'New group',
                onClick: () => setIsNewOpen(true),
              })}
        />
      ) : (
        <Panel>
          <GroupsTable groups={groups} netById={netById} isLoading={isLoading} showChevron />
        </Panel>
      )}

      <NewGroupModal open={isNewOpen} onClose={() => setIsNewOpen(false)} />
    </>
  );
};

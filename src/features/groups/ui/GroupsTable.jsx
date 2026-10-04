import { EmptyState } from '@/components/shared/EmptyState';
import { LoadingRows } from '@/components/shared/LoadingRows';
import { StatusBadge } from '@/components/status/StatusBadge';
import { Table } from '@/components/table/Table';
import { TableHead } from '@/components/table/TableHead';
import { Td } from '@/components/table/Td';
import { Th } from '@/components/table/Th';
import { Tr } from '@/components/table/Tr';
import { AppRoutes } from '@/routes';
import { BalanceUtils } from '@/utils/balance';
import { IconChevronRight, IconUsers } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

export const GroupsTable = ({
  groups,
  netById,
  isLoading,
  emptyStateProps,
  showChevron,
}) => {
  const navigate = useNavigate();

  if (isLoading) return <LoadingRows rows={3} />;
  if (!groups.length) return <EmptyState {...emptyStateProps} />;

  return (
    <Table>
      <TableHead>
        <Th>Group</Th>
        <Th>Members</Th>
        <Th>Your balance</Th>
        {showChevron && <Th className='w-10' />}
      </TableHead>
      <tbody>
        {groups.map((group) => {
          const balance = BalanceUtils.mine(netById[group.id] ?? 0);
          return (
            <Tr
              key={group.id}
              onClick={() => navigate(AppRoutes.groupID(group.id))}
            >
              <Td className='h-auto py-3'>
                <div className='flex flex-col gap-0.5'>
                  <span className='font-medium'>{group.name}</span>
                  {group.description && (
                    <span className='text-xs text-text-muted'>
                      {group.description}
                    </span>
                  )}
                </div>
              </Td>
              <Td>
                <span className='flex items-center gap-1.5 text-xs text-text-muted'>
                  <IconUsers size={14} />
                  {group.memberCount}{' '}
                  {group.memberCount === 1 ? 'member' : 'members'}
                </span>
              </Td>
              <Td>
                <StatusBadge text={balance.text} tone={balance.tone} />
              </Td>
              {showChevron && (
                <Td className='text-grey-400'>
                  <IconChevronRight size={16} />
                </Td>
              )}
            </Tr>
          );
        })}
      </tbody>
    </Table>
  );
};

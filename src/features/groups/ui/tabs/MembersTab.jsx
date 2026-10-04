import { BrandButton } from '@/components/buttons/BrandButton';
import { Avatar } from '@/components/shared/Avatar';
import { Panel } from '@/components/shared/Panel';
import { StatusBadge } from '@/components/status/StatusBadge';
import { Table } from '@/components/table/Table';
import { TableHead } from '@/components/table/TableHead';
import { Td } from '@/components/table/Td';
import { Th } from '@/components/table/Th';
import { Tr } from '@/components/table/Tr';
import { GROUP_ROLES } from '@/models/expense';
import { AppRoutes } from '@/routes';
import { BalanceUtils } from '@/utils/balance';
import { useNavigate } from 'react-router-dom';
import { useRemoveMember } from '../../hooks/useRemoveMember';

export const MembersTab = ({ groupId, meId, isAdmin, members, netById }) => {
  const navigate = useNavigate();
  const { removeMemberFn, isPendingRemoveMember } = useRemoveMember({
    onSuccess: ({ userId }) => userId === meId && navigate(AppRoutes.groups),
  });

  return (
    <Panel>
      <Table>
        <TableHead>
          <Th>Member</Th>
          <Th>Email</Th>
          <Th>Balance</Th>
          <Th className='w-[100px]' />
        </TableHead>
        <tbody>
          {members.map(({ user, role }) => {
            const badge = BalanceUtils.member(netById[user.id] ?? 0);
            const isMe = user.id === meId;
            const isMemberAdmin = role === GROUP_ROLES.ADMIN;
            const canRemove = isAdmin && !isMe && !isMemberAdmin;
            const canLeave = isMe && !isMemberAdmin;

            return (
              <Tr key={user.id}>
                <Td>
                  <div className='flex items-center gap-2'>
                    <Avatar id={user.id} name={user.name} />
                    <span className='font-medium'>
                      {user.name}
                      {isMe && ' (you)'}
                    </span>
                    {isMemberAdmin && <StatusBadge text='Admin' tone='info' />}
                  </div>
                </Td>
                <Td className='text-text-description'>{user.email}</Td>
                <Td>
                  <StatusBadge text={badge.text} tone={badge.tone} />
                </Td>
                <Td align='right'>
                  {(canRemove || canLeave) && (
                    <BrandButton
                      text={canLeave ? 'Leave' : 'Remove'}
                      variant='white'
                      size='sm'
                      disabled={isPendingRemoveMember}
                      onClick={() =>
                        removeMemberFn({ groupId, userId: user.id })
                      }
                    />
                  )}
                </Td>
              </Tr>
            );
          })}
        </tbody>
      </Table>
    </Panel>
  );
};

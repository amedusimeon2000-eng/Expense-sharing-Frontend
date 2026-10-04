import { BrandButton } from '@/components/buttons/BrandButton';
import { LoadingRows } from '@/components/shared/LoadingRows';
import { Panel } from '@/components/shared/Panel';
import { StatusBadge } from '@/components/status/StatusBadge';
import { Table } from '@/components/table/Table';
import { TableHead } from '@/components/table/TableHead';
import { Td } from '@/components/table/Td';
import { Th } from '@/components/table/Th';
import { Tr } from '@/components/table/Tr';
import { useFetchSessions } from '@/features/auth/hooks/useFetchSessions';
import { useRevokeSession } from '@/features/auth/hooks/useRevokeSession';
import { DateUtils } from '@/utils/date';
import { describeDevice } from '../utils/device';

export const SessionsTable = () => {
  const { sessions, isLoading } = useFetchSessions();
  const { revokeSessionFn, isPendingRevokeSession } = useRevokeSession();

  return (
    <Panel title='Active sessions' headerClassName='px-5'>
      {isLoading ? (
        <LoadingRows rows={2} />
      ) : (
        <Table>
          <TableHead>
            <Th>Device</Th>
            <Th>IP address</Th>
            <Th>Last active</Th>
            <Th className='w-[120px]' />
          </TableHead>
          <tbody>
            {sessions.map((session) => {
              const device = describeDevice(session.userAgent);
              return (
                <Tr key={session.id}>
                  <Td>
                    <div className='flex items-center gap-2'>
                      <device.Icon size={18} className='text-grey-500' />
                      {device.label}
                    </div>
                  </Td>
                  <Td className='text-text-description'>{session.ip || '—'}</Td>
                  <Td className='text-text-description'>
                    {session.current
                      ? 'Active now'
                      : DateUtils.relative(session.lastActivityAt)}
                  </Td>
                  <Td align='right'>
                    {session.current ? (
                      <StatusBadge text='This device' tone='success' />
                    ) : (
                      <BrandButton
                        text='Log out'
                        variant='white'
                        size='sm'
                        disabled={isPendingRevokeSession}
                        onClick={() => revokeSessionFn(session.id)}
                      />
                    )}
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Panel>
  );
};

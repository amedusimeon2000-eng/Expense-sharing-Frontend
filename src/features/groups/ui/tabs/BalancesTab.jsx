import { Avatar } from '@/components/shared/Avatar';
import { LoadingRows } from '@/components/shared/LoadingRows';
import { Panel } from '@/components/shared/Panel';
import { StatusBadge } from '@/components/status/StatusBadge';
import { Table } from '@/components/table/Table';
import { TableHead } from '@/components/table/TableHead';
import { Td } from '@/components/table/Td';
import { Th } from '@/components/table/Th';
import { Tr } from '@/components/table/Tr';
import { BalanceUtils } from '@/utils/balance';
import { MoneyUtils } from '@/utils/money';
import { SettleUpPlan } from '../SettleUpPlan';

export const BalancesTab = ({ meId, balances, ledger, settleUp, onRecord }) => (
  <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-4'>
    <Panel>
      {balances.isLoading ? (
        <LoadingRows rows={3} />
      ) : (
        <Table>
          <TableHead>
            <Th>Member</Th>
            <Th align='right'>Paid</Th>
            <Th align='right'>Share</Th>
            <Th align='right'>Net</Th>
          </TableHead>
          <tbody>
            {balances.balances.map((row) => {
              const badge = BalanceUtils.member(row.net);
              return (
                <Tr key={row.user.id}>
                  <Td>
                    <div className='flex items-center gap-2'>
                      <Avatar id={row.user.id} name={row.user.name} size='xs' />
                      <span>
                        {row.user.name}
                        {row.user.id === meId && ' (you)'}
                        {!row.isMember && (
                          <span className='ml-1 text-xs text-text-muted'>
                            (left)
                          </span>
                        )}
                      </span>
                    </div>
                  </Td>
                  <Td align='right' className='tabular-nums'>
                    {MoneyUtils.format(ledger.paid[row.user.id] ?? 0)}
                  </Td>
                  <Td align='right' className='tabular-nums'>
                    {MoneyUtils.format(ledger.share[row.user.id] ?? 0)}
                  </Td>
                  <Td align='right'>
                    <StatusBadge text={badge.text} tone={badge.tone} />
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Panel>
    <SettleUpPlan
      meId={meId}
      suggestions={settleUp.suggestions}
      isLoading={settleUp.isLoading}
      onRecord={onRecord}
    />
  </div>
);

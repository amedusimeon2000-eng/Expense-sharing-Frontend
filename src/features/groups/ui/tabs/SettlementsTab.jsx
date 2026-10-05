import { EmptyState } from '@/components/shared/EmptyState';
import { EMPTY_STATE_INLINE } from '@/store/data/emptyState';
import { LoadingRows } from '@/components/shared/LoadingRows';
import { Panel } from '@/components/shared/Panel';
import { Table } from '@/components/table/Table';
import { TableHead } from '@/components/table/TableHead';
import { Td } from '@/components/table/Td';
import { Th } from '@/components/table/Th';
import { Tr } from '@/components/table/Tr';
import { displayName } from '@/features/expenses/utils/share';
import { useDeleteSettlement } from '@/features/settlements/hooks/useDeleteSettlement';
import { DateUtils } from '@/utils/date';
import { MoneyUtils } from '@/utils/money';

export const SettlementsTab = ({ groupId, meId, isAdmin, settlements, isLoading }) => {
  const { deleteSettlementFn, isPendingDeleteSettlement } = useDeleteSettlement();

  if (isLoading) {
    return (
      <Panel>
        <LoadingRows rows={2} />
      </Panel>
    );
  }

  return (
    <Panel>
      {settlements.length ? (
        <Table>
          <TableHead>
            <Th>Date</Th>
            <Th>Payment</Th>
            <Th>Note</Th>
            <Th align='right'>Amount</Th>
            <Th className='w-20' />
          </TableHead>
          <tbody>
            {settlements.map((settlement) => {
              // Whoever recorded it, or the admin, may undo it.
              const canUndo = isAdmin || settlement.createdBy?.id === meId;
              return (
                <Tr key={settlement.id}>
                  <Td className='text-grey-500'>{DateUtils.format(settlement.date)}</Td>
                  <Td>
                    <b className='font-medium'>{displayName(settlement.from, meId)}</b> paid{' '}
                    <b className='font-medium'>{displayName(settlement.to, meId, { object: true })}</b>
                  </Td>
                  <Td className='text-text-description'>{settlement.note || '—'}</Td>
                  <Td align='right' className='font-semibold tabular-nums'>
                    {MoneyUtils.format(settlement.amount)}
                  </Td>
                  <Td align='right'>
                    {canUndo && (
                      <button
                        disabled={isPendingDeleteSettlement}
                        onClick={() =>
                          deleteSettlementFn({ groupId, settlementId: settlement.id })
                        }
                        className='text-13 font-medium text-error-1000 disabled:opacity-50'
                      >
                        Undo
                      </button>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <EmptyState
          title='No payments yet'
          subtitle='You have no payments recorded at the moment'
          containerClassName={EMPTY_STATE_INLINE}
        />
      )}
    </Panel>
  );
};

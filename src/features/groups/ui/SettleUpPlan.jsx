import { BrandButton } from '@/components/buttons/BrandButton';
import { Avatar } from '@/components/shared/Avatar';
import { EmptyState } from '@/components/shared/EmptyState';
import { EMPTY_STATE_INLINE } from '@/store/data/emptyState';
import { LoadingRows } from '@/components/shared/LoadingRows';
import { Panel } from '@/components/shared/Panel';
import { displayName, payVerb } from '@/features/expenses/utils/share';
import { MoneyUtils } from '@/utils/money';
import { IconArrowRight } from '@tabler/icons-react';

export const SettleUpPlan = ({
  suggestions,
  isLoading,
  meId,
  onRecord,
  compact,
}) => (
  <Panel
    title='Settle-up plan'
    description={
      compact
        ? 'Fewest payments to clear the group'
        : 'Fewest payments to clear every balance'
    }
    headerClassName={compact ? '[&_h4]:text-[15px]' : undefined}
  >
    {isLoading && <LoadingRows rows={2} />}
    {!isLoading &&
      suggestions.map((payment) => {
        const key = `${payment.from.id}-${payment.to.id}`;
        const record = () =>
          onRecord({
            from: payment.from.id,
            to: payment.to.id,
            amount: payment.amount,
          });
        const names = (
          <>
            <b className='font-semibold'>{displayName(payment.from, meId)}</b>{' '}
            {payVerb(payment.from, meId)}{' '}
            <b className='font-semibold'>
              {displayName(payment.to, meId, { object: true })}
            </b>
          </>
        );

        return compact ? (
          <div
            key={key}
            className='flex items-center gap-2 border-b border-grey-transparent px-4 py-3 last:border-b-0'
          >
            <div className='flex min-w-0 flex-1 flex-col gap-0.5 text-13'>
              <span>{names}</span>
              <span className='font-semibold tabular-nums'>
                {MoneyUtils.format(payment.amount)}
              </span>
            </div>
            <BrandButton
              text='Record'
              variant='white'
              size='sm'
              onClick={record}
            />
          </div>
        ) : (
          <div
            key={key}
            className='flex items-center gap-3 border-b border-grey-transparent px-4 py-3.5 last:border-b-0'
          >
            <Avatar id={payment.from.id} name={payment.from.name} />
            <IconArrowRight size={14} className='text-grey-400' />
            <Avatar id={payment.to.id} name={payment.to.name} />
            <span className='flex-1 text-sm'>{names}</span>
            <span className='text-sm font-semibold tabular-nums'>
              {MoneyUtils.format(payment.amount)}
            </span>
            <BrandButton text='Record payment' size='sm' onClick={record} />
          </div>
        );
      })}
    {!isLoading && !suggestions.length && (
      <EmptyState
        title='All settled up'
        subtitle='Everyone in this group is settled up.'
        containerClassName={EMPTY_STATE_INLINE}
        titleClassName={compact ? 'text-base' : undefined}
      />
    )}
  </Panel>
);

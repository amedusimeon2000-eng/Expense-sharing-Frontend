import { BrandButton } from '@/components/buttons/BrandButton';
import { Avatar } from '@/components/shared/Avatar';
import { EmptyState } from '@/components/shared/EmptyState';
import { EMPTY_STATE_ICONS, EMPTY_STATE_INLINE } from '@/store/data/emptyState';
import { LoadingRows } from '@/components/shared/LoadingRows';
import { Panel } from '@/components/shared/Panel';
import { StatusBadge } from '@/components/status/StatusBadge';
import { MoneyUtils } from '@/utils/money';

export const PeopleBalances = ({ people, isLoading, onSettle }) => (
  <Panel title='Balances by person' description='Simplified across every group you share'>
    {isLoading ? (
      <LoadingRows rows={3} />
    ) : people.length ? (
      people.map((person) => (
        <div
          key={person.user.id}
          className='flex items-center gap-2.5 border-b border-grey-transparent px-4 py-3 last:border-b-0'
        >
          <Avatar id={person.user.id} name={person.user.name} />
          <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
            <span className='text-sm font-medium'>{person.user.name}</span>
            <span className='truncate text-xs text-text-muted'>{person.groups.join(', ')}</span>
          </div>
          <StatusBadge
            tone={person.v > 0 ? 'success' : 'error'}
            text={
              person.v > 0
                ? `Owes you ${MoneyUtils.format(person.v)}`
                : `You owe ${MoneyUtils.format(person.v)}`
            }
          />
          <BrandButton
            text='Settle'
            variant='white'
            size='sm'
            onClick={() => onSettle(person.first)}
          />
        </div>
      ))
    ) : (
      <EmptyState
        title='All settled up'
        subtitle="You're settled up with everyone."
        imgUrl={EMPTY_STATE_ICONS.group}
        containerClassName={EMPTY_STATE_INLINE}
      />
    )}
  </Panel>
);

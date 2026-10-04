import { EmptyState } from '@/components/shared/EmptyState';
import { EMPTY_STATE_INLINE } from '@/store/data/emptyState';
import { LoadingRows } from '@/components/shared/LoadingRows';
import { Panel } from '@/components/shared/Panel';
import { categoryFor } from '@/features/expenses/store/data';
import { displayName, shareInfo } from '@/features/expenses/utils/share';
import { AppRoutes } from '@/routes';
import { cn } from '@/utils/cn';
import { DateUtils } from '@/utils/date';
import { MoneyUtils } from '@/utils/money';
import { IconArrowsExchange } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const toRow = (item, meId) => {
  const date = DateUtils.format(item.date, true);

  if (item.type === 'settlement') {
    return {
      Icon: IconArrowsExchange,
      tint: 'bg-orange-100 text-orange-1000',
      title: `${displayName(item.from, meId)} paid ${displayName(item.to, meId, { object: true })}`,
      sub: `${item.group?.name} · ${item.note || 'Payment'} · ${date}`,
      share: { text: 'Payment', className: 'text-grey-400' },
      to: `${AppRoutes.groupID(item.group?.id)}?tab=settlements`,
    };
  }

  const category = categoryFor(item.category);
  return {
    Icon: category.Icon,
    tint: category.tint,
    title: item.description,
    sub: `${item.group?.name} · ${displayName(item.paidBy, meId)} paid · ${date}`,
    share: shareInfo({
      amount: item.amount,
      paidById: item.paidBy?.id,
      myShare: item.yourShare ?? 0,
      meId,
    }),
    to: AppRoutes.groupID(item.group?.id),
  };
};

export const RecentActivity = ({ items, meId, isLoading }) => {
  const navigate = useNavigate();

  return (
    <Panel title='Recent activity' description='Latest expenses and payments'>
      {isLoading ? (
        <LoadingRows rows={4} />
      ) : items.length ? (
        items.map((item) => {
          const row = toRow(item, meId);
          return (
            <button
              key={`${item.type}-${item.id}`}
              onClick={() => navigate(row.to)}
              className='flex w-full items-center gap-2.5 border-b border-grey-transparent px-4 py-3 text-left last:border-b-0 hover:bg-brand-light'
            >
              <div
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full',
                  row.tint,
                )}
              >
                <row.Icon size={16} />
              </div>
              <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
                <span className='truncate text-sm font-medium'>
                  {row.title}
                </span>
                <span className='truncate text-xs text-text-muted'>
                  {row.sub}
                </span>
              </div>
              <div className='flex flex-col items-end gap-0.5'>
                <span className='text-sm font-semibold tabular-nums'>
                  {MoneyUtils.format(item.amount)}
                </span>
                <span
                  className={cn(
                    'text-xs whitespace-nowrap',
                    row.share.className,
                  )}
                >
                  {row.share.text}
                </span>
              </div>
            </button>
          );
        })
      ) : (
        <EmptyState
          title='No activity yet'
          subtitle='You have no expenses or payments at the moment'
          containerClassName={EMPTY_STATE_INLINE}
        />
      )}
    </Panel>
  );
};

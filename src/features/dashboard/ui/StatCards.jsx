import { StatCard } from '@/components/shared/StatCard';
import { MoneyUtils } from '@/utils/money';
import { IconArrowDownLeft, IconArrowUpRight, IconScale } from '@tabler/icons-react';

export const StatCards = ({ net, youAreOwed, youOwe, isLoading }) => (
  <div className='grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4'>
    <StatCard
      label='Net balance'
      value={MoneyUtils.formatSigned(net)}
      valueClassName={net > 0 ? 'text-success-1100' : net < 0 ? 'text-error-950' : 'text-text-main-1'}
      Icon={IconScale}
      iconClassName='bg-orange-100 text-orange-1000'
      isLoading={isLoading}
    />
    <StatCard
      label='You are owed'
      value={MoneyUtils.format(youAreOwed)}
      valueClassName='text-success-1000'
      Icon={IconArrowDownLeft}
      iconClassName='bg-success-transparent text-success-1000'
      isLoading={isLoading}
    />
    <StatCard
      label='You owe'
      value={MoneyUtils.format(youOwe)}
      valueClassName='text-error-1000'
      Icon={IconArrowUpRight}
      iconClassName='bg-error-transparent text-error-1000'
      isLoading={isLoading}
    />
  </div>
);

import { StatusBadge } from '@/components/status/StatusBadge';
import { IconRoute, IconToolsKitchen2 } from '@tabler/icons-react';
import { HERO_PAYMENTS } from '../store/data';

export const HeroIllustration = () => (
  <div className='relative pt-6 pb-12'>
    <div className='absolute inset-y-0 right-0 left-6 rounded-[20px] bg-surface-level-2 sm:left-12' />

    <div className='relative mt-6 ml-8 overflow-hidden rounded-lg border border-grey-transparent bg-white shadow-popover sm:ml-[72px]'>
      <div className='flex items-center justify-between gap-3 border-b border-grey-transparent px-4 py-3.5'>
        <div className='flex flex-col gap-0.5'>
          <span className='text-[15px] font-semibold text-text-header'>Lagos trip</span>
          <span className='text-xs text-text-muted'>4 members · ₦247,600 spent</span>
        </div>
        <StatusBadge text="You're owed ₦98,375" tone='success' />
      </div>
      <div className='py-1.5'>
        {HERO_PAYMENTS.map((row) => (
          <div key={row.name} className='flex items-center gap-2.5 px-4 py-2.5'>
            <div
              className={`flex size-7 items-center justify-center rounded-full text-[11px] font-semibold ${row.tint}`}
            >
              {row.initials}
            </div>
            <span className='flex-1 text-13'>
              <b className='font-semibold'>{row.name}</b> pays <b className='font-semibold'>you</b>
            </span>
            <span className='text-13 font-semibold tabular-nums'>{row.amount}</span>
          </div>
        ))}
      </div>
      <div className='flex items-center gap-1.5 border-t border-grey-transparent bg-brand-neutral-25 px-4 py-3 text-xs text-text-muted'>
        <IconRoute size={14} className='text-orange-1000' />3 payments clear every balance in
        this group
      </div>
    </div>

    <div className='absolute bottom-0 left-0 flex w-[230px] flex-col sm:w-[260px] gap-2.5 rounded-lg border border-grey-transparent bg-white p-3.5 shadow-drop-down'>
      <div className='flex items-center gap-2.5'>
        <div className='flex size-8 items-center justify-center rounded-lg bg-warning-50 text-warning-1200'>
          <IconToolsKitchen2 size={16} />
        </div>
        <div className='flex flex-1 flex-col gap-0.5'>
          <span className='text-13 font-semibold'>Dinner at Kilimanjaro</span>
          <span className='text-[11px] text-text-muted'>Tolu paid · Exact split</span>
        </div>
      </div>
      <div className='flex items-baseline justify-between'>
        <span className='text-xl font-bold tabular-nums'>₦15,000</span>
        <span className='text-xs font-medium text-error-950'>You borrowed ₦5,000</span>
      </div>
      <div className='flex h-1.5 gap-0.5 overflow-hidden rounded-[3px]'>
        <div className='flex-[5] bg-orange-900' />
        <div className='flex-[4] bg-orange-600' />
        <div className='flex-[3.5] bg-orange-400' />
        <div className='flex-[2.5] bg-orange-200' />
      </div>
    </div>
  </div>
);

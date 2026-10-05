import { BrandButton } from '@/components/buttons/BrandButton';
import { ConfirmActionModal } from '@/components/modals/ConfirmActionModal';
import { EmptyState } from '@/components/shared/EmptyState';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatusBadge } from '@/components/status/StatusBadge';
import { AddExpenseModal } from '@/features/expenses/ui/AddExpenseModal';
import { ExpenseDetailModal } from '@/features/expenses/ui/ExpenseDetailModal';
import { useDeleteGroup } from '@/features/groups/hooks/useDeleteGroup';
import { useFetchBalances } from '@/features/groups/hooks/useFetchBalances';
import { useFetchGroup } from '@/features/groups/hooks/useFetchGroup';
import { useFetchSettleUp } from '@/features/groups/hooks/useFetchSettleUp';
import { useGroupLedger } from '@/features/groups/hooks/useGroupLedger';
import { AddMemberModal } from '@/features/groups/ui/AddMemberModal';
import { GROUP_TABS } from '@/features/groups/store/data';
import { GroupTabs } from '@/features/groups/ui/GroupTabs';
import { BalancesTab } from '@/features/groups/ui/tabs/BalancesTab';
import { ExpensesTab } from '@/features/groups/ui/tabs/ExpensesTab';
import { MembersTab } from '@/features/groups/ui/tabs/MembersTab';
import { SettlementsTab } from '@/features/groups/ui/tabs/SettlementsTab';
import { useFetchSettlements } from '@/features/settlements/hooks/useFetchSettlements';
import { RecordPaymentModal } from '@/features/settlements/ui/RecordPaymentModal';
import { useFetchMe } from '@/features/user/hooks/useFetchMe';
import { useGetSharedQueryParams } from '@/hooks/utils/useGetSharedQueryParams';
import { QUERY_SEARCH_KEYS } from '@/models/query';
import { FULL_LIST_LIMIT } from '@/models/serviceRequests';
import { AppRoutes } from '@/routes';
import { BalanceUtils } from '@/utils/balance';
import { MoneyUtils } from '@/utils/money';
import { IconChevronRight, IconPlus, IconTrash, IconUserPlus } from '@tabler/icons-react';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const GroupDetail = () => {
  const { id: groupId } = useParams();
  const navigate = useNavigate();
  const { getItem, setItems } = useGetSharedQueryParams();
  const tab = getItem(QUERY_SEARCH_KEYS.TAB) || GROUP_TABS.EXPENSES;

  const { user: me } = useFetchMe();
  const { group, members, isAdmin, isLoading } = useFetchGroup(groupId);
  const balances = useFetchBalances(groupId);
  const settleUp = useFetchSettleUp(groupId);
  const ledger = useGroupLedger(groupId);
  const { settlements, total: settlementCount, isLoading: isLoadingSettlements } =
    useFetchSettlements({ groupId, limit: FULL_LIST_LIMIT });

  const [modal, setModal] = useState(null);
  const [openExpense, setOpenExpense] = useState(null);
  const [settleDefaults, setSettleDefaults] = useState(null);
  const closeModal = () => setModal(null);

  const { deleteGroupFn, isPendingDeleteGroup } = useDeleteGroup({
    onSuccess: () => navigate(AppRoutes.groups),
  });

  if (isLoading) {
    return <div className='h-24 animate-pulse rounded-lg bg-white' />;
  }

  if (!group) {
    return (
      <EmptyState
        title='Group not found'
        subtitle="This group doesn't exist or you're no longer a member."
        ctaLabel='Back to groups'
        ctaRoute={AppRoutes.groups}
      />
    );
  }

  const netById = Object.fromEntries(balances.balances.map((b) => [b.user.id, b.net]));
  const myBalance = BalanceUtils.mine(netById[me?.id] ?? 0);
  const memberCount = `${members.length} ${members.length === 1 ? 'member' : 'members'}`;

  const openSettle = (defaults) => {
    setSettleDefaults(defaults);
    setModal('settle');
  };

  const tabs = [
    { value: GROUP_TABS.EXPENSES, label: 'Expenses', count: ledger.count },
    { value: GROUP_TABS.BALANCES, label: 'Balances' },
    { value: GROUP_TABS.SETTLEMENTS, label: 'Settlements', count: settlementCount },
    { value: GROUP_TABS.MEMBERS, label: 'Members', count: members.length },
  ];

  const shared = { groupId, meId: me?.id, isAdmin };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col gap-3'>
        <div className='flex items-center gap-1.5 text-xs text-text-muted'>
          <Link to={AppRoutes.groups} className='hover:text-text-main-1'>
            Groups
          </Link>
          <IconChevronRight size={12} />
          <span className='font-medium text-text-main-1'>{group.name}</span>
        </div>
        <PageTitle
          title={group.name}
          badge={<StatusBadge text={myBalance.text} tone={myBalance.tone} />}
          description={[group.description, memberCount, `${MoneyUtils.format(ledger.total)} spent`]
            .filter(Boolean)
            .join(' · ')}
          actions={
            <>
              {isAdmin && (
                <BrandButton
                  variant='white'
                  title='Delete group'
                  aria-label='Delete group'
                  className='w-8 px-0 text-grey-500 hover:text-error-1000'
                  iconStart={<IconTrash size={16} />}
                  onClick={() => setModal('delete')}
                />
              )}
              {isAdmin && (
                <BrandButton
                  text='Add member'
                  variant='white'
                  iconStart={<IconUserPlus size={15} />}
                  onClick={() => setModal('member')}
                />
              )}
              <BrandButton
                text='Add expense'
                iconStart={<IconPlus size={15} />}
                onClick={() => setModal('expense')}
              />
            </>
          }
        />
      </div>

      <GroupTabs
        tabs={tabs}
        value={tab}
        onChange={(value) => setItems({ [QUERY_SEARCH_KEYS.TAB]: value })}
      />

      {tab === GROUP_TABS.EXPENSES && (
        <ExpensesTab
          {...shared}
          balances={balances}
          settleUp={settleUp}
          onOpenExpense={setOpenExpense}
          onRecord={openSettle}
          onAddExpense={() => setModal('expense')}
        />
      )}
      {tab === GROUP_TABS.BALANCES && (
        <BalancesTab
          {...shared}
          balances={balances}
          ledger={ledger}
          settleUp={settleUp}
          onRecord={openSettle}
        />
      )}
      {tab === GROUP_TABS.SETTLEMENTS && (
        <SettlementsTab
          {...shared}
          settlements={settlements}
          isLoading={isLoadingSettlements}
        />
      )}
      {tab === GROUP_TABS.MEMBERS && (
        <MembersTab {...shared} members={members} netById={netById} />
      )}

      <AddExpenseModal open={modal === 'expense'} groupId={groupId} onClose={closeModal} />
      <AddMemberModal
        open={modal === 'member'}
        group={group}
        members={members}
        onClose={closeModal}
      />
      <RecordPaymentModal
        open={modal === 'settle'}
        groupId={groupId}
        defaults={settleDefaults}
        onClose={closeModal}
      />
      <ExpenseDetailModal
        expense={openExpense}
        groupId={groupId}
        meId={me?.id}
        canEdit={isAdmin || openExpense?.createdBy?.id === me?.id}
        onClose={() => setOpenExpense(null)}
      />
      <ConfirmActionModal
        open={modal === 'delete'}
        onClose={closeModal}
        title='Delete group'
        message={`Delete ${group.name}? This only works once every balance in the group is zero.`}
        confirmText='Delete group'
        loading={isPendingDeleteGroup}
        onConfirm={() => deleteGroupFn(groupId)}
      />
    </div>
  );
};

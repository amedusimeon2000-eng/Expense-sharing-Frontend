import { TextUtils } from '@/utils/text';

export class QueryKeys {
  // AUTH
  static Login = 'login';
  static Register = 'register';
  static Logout = 'logout';
  static Sessions = 'sessions';
  static RevokeSession = 'revoke session';
  static ChangePassword = 'change password';

  // USER
  static Me = 'me';
  static Summary = 'summary';
  static SearchUser = 'search user';
  static UpdateProfile = 'update profile';

  // GROUPS
  static Group = 'group';
  static Groups = 'groups';
  static CreateGroup = 'create group';
  static UpdateGroup = 'update group';
  static DeleteGroup = 'delete group';

  // MEMBERS
  static AddMember = 'add member';
  static RemoveMember = 'remove member';

  // EXPENSES
  static Expense = 'expense';
  static Expenses = 'expenses';
  static CreateExpense = 'create expense';
  static UpdateExpense = 'update expense';
  static DeleteExpense = 'delete expense';

  // SETTLEMENTS
  static Settlements = 'settlements';
  static CreateSettlement = 'create settlement';
  static DeleteSettlement = 'delete settlement';

  // BALANCES
  static Balances = 'balances';
  static SettleUp = 'settle up';
}

export const MONEY_QUERY_KEYS = [
  QueryKeys.Expenses,
  QueryKeys.Expense,
  QueryKeys.Settlements,
  QueryKeys.Balances,
  QueryKeys.SettleUp,
  QueryKeys.Summary,
  QueryKeys.Groups,
];

export class QueryErrCodes {
  // Auth
  static Sessions = TextUtils.queryText('sessions');

  // User
  static Me = TextUtils.queryText('your profile');
  static Summary = TextUtils.queryText('dashboard summary');
  static SearchUser = TextUtils.queryText('user');

  // Groups
  static Group = TextUtils.queryText('group');
  static Groups = TextUtils.queryText('groups');

  // Expenses
  static Expense = TextUtils.queryText('expense');
  static Expenses = TextUtils.queryText('expenses');

  // Settlements
  static Settlements = TextUtils.queryText('settlements');

  // Balances
  static Balances = TextUtils.queryText('balances');
  static SettleUp = TextUtils.queryText('settle up suggestions');
}

export const QUERY_SEARCH_KEYS = {
  ID: 'id',
  TAB: 'tab',
  PAGE: 'page',
  LIMIT: 'limit',
  SEARCH_QUERY: 'search',
  CATEGORY: 'category',
  PAID_BY: 'paidBy',
  FROM: 'from',
  TO: 'to',
  REDIRECT: 'redirect',
};

export class Endpoints {
  // Auth
  static authBase = (id) => (id ? `v1/auth/${id}` : 'v1/auth');

  static isAuthEndpoint = (url) =>
    [this.login.url, this.register.url].some((path) => url?.includes(path));

  static register = {
    method: 'POST',
    url: this.authBase('register'),
  };

  static login = {
    method: 'POST',
    url: this.authBase('login'),
  };

  static logout = {
    method: 'POST',
    url: this.authBase('logout'),
  };

  static getMe = {
    method: 'GET',
    url: this.authBase('me'),
  };

  static getSessions = {
    method: 'GET',
    url: this.authBase('sessions'),
  };

  static revokeSession = (sessionId) => ({
    method: 'DELETE',
    url: this.authBase(`sessions/${sessionId}`),
  });

  static changePassword = {
    method: 'POST',
    url: this.authBase('change-password'),
  };

  // User
  static userBase = (id) => (id ? `v1/users/${id}` : 'v1/users');

  static updateProfile = {
    method: 'PATCH',
    url: this.userBase('me'),
  };

  static searchUser = {
    method: 'GET',
    url: this.userBase('search'),
  };

  static getSummary = {
    method: 'GET',
    url: this.userBase('me/summary'),
  };

  // Groups
  static groupBase = (id) => (id ? `v1/groups/${id}` : 'v1/groups');

  static getGroups = {
    method: 'GET',
    url: this.groupBase(),
  };

  static createGroup = {
    method: 'POST',
    url: this.groupBase(),
  };

  static getGroup = (groupId) => ({
    method: 'GET',
    url: this.groupBase(groupId),
  });

  static updateGroup = (groupId) => ({
    method: 'PATCH',
    url: this.groupBase(groupId),
  });

  static deleteGroup = (groupId) => ({
    method: 'DELETE',
    url: this.groupBase(groupId),
  });

  // Members
  static addMember = (groupId) => ({
    method: 'POST',
    url: this.groupBase(`${groupId}/members`),
  });

  static removeMember = ({ groupId, userId }) => ({
    method: 'DELETE',
    url: this.groupBase(`${groupId}/members/${userId}`),
  });

  // Expenses
  static expenseBase = ({ groupId, expenseId }) =>
    this.groupBase(
      expenseId ? `${groupId}/expenses/${expenseId}` : `${groupId}/expenses`,
    );

  static getExpenses = (groupId) => ({
    method: 'GET',
    url: this.expenseBase({ groupId }),
  });

  static createExpense = (groupId) => ({
    method: 'POST',
    url: this.expenseBase({ groupId }),
  });

  static getExpense = ({ groupId, expenseId }) => ({
    method: 'GET',
    url: this.expenseBase({ groupId, expenseId }),
  });

  static updateExpense = ({ groupId, expenseId }) => ({
    method: 'PATCH',
    url: this.expenseBase({ groupId, expenseId }),
  });

  static deleteExpense = ({ groupId, expenseId }) => ({
    method: 'DELETE',
    url: this.expenseBase({ groupId, expenseId }),
  });

  // Settlements
  static settlementBase = ({ groupId, settlementId }) =>
    this.groupBase(
      settlementId
        ? `${groupId}/settlements/${settlementId}`
        : `${groupId}/settlements`,
    );

  static getSettlements = (groupId) => ({
    method: 'GET',
    url: this.settlementBase({ groupId }),
  });

  static createSettlement = (groupId) => ({
    method: 'POST',
    url: this.settlementBase({ groupId }),
  });

  static deleteSettlement = ({ groupId, settlementId }) => ({
    method: 'DELETE',
    url: this.settlementBase({ groupId, settlementId }),
  });

  // Balances
  static getBalances = (groupId) => ({
    method: 'GET',
    url: this.groupBase(`${groupId}/balances`),
  });

  static getSettleUp = (groupId) => ({
    method: 'GET',
    url: this.groupBase(`${groupId}/settle-up`),
  });
}

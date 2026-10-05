import { Endpoints } from '@/utils/endpoints';
import { ClientHTTP } from './client';

export class ExpenseService {
  static getExpenses = ({ groupId, ...params }) => {
    const config = { ...Endpoints.getExpenses(groupId), params };
    return ClientHTTP.apiRequest(config);
  };

  /** Amounts are kobo. Body carries one split shape, picked by `splitType`. */
  static createExpense = ({ groupId, ...data }) => {
    const config = { ...Endpoints.createExpense(groupId), data };
    return ClientHTTP.apiRequest(config);
  };

  static getExpense = ({ groupId, expenseId }) => {
    const config = Endpoints.getExpense({ groupId, expenseId });
    return ClientHTTP.apiRequest(config);
  };

  /** Touching any split field means sending the complete new split. */
  static updateExpense = ({ groupId, expenseId, ...data }) => {
    const config = { ...Endpoints.updateExpense({ groupId, expenseId }), data };
    return ClientHTTP.apiRequest(config);
  };

  static deleteExpense = ({ groupId, expenseId }) => {
    const config = Endpoints.deleteExpense({ groupId, expenseId });
    return ClientHTTP.apiRequest(config);
  };
}

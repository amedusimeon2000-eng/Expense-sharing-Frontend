import { Endpoints } from '@/utils/endpoints';
import { ClientHTTP } from './client';

export class SettlementService {
  static getSettlements = ({ groupId, ...params }) => {
    const config = { ...Endpoints.getSettlements(groupId), params };
    return ClientHTTP.apiRequest(config);
  };

  static createSettlement = ({ groupId, ...data }) => {
    const config = { ...Endpoints.createSettlement(groupId), data };
    return ClientHTTP.apiRequest(config);
  };

  static deleteSettlement = ({ groupId, settlementId }) => {
    const config = Endpoints.deleteSettlement({ groupId, settlementId });
    return ClientHTTP.apiRequest(config);
  };
}

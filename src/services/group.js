import { Endpoints } from '@/utils/endpoints';
import { ClientHTTP } from './client';

export class GroupService {
  static getGroups = (params) => {
    const config = { ...Endpoints.getGroups, params };
    return ClientHTTP.apiRequest(config);
  };

  static createGroup = (data) => {
    const config = { ...Endpoints.createGroup, data };
    return ClientHTTP.apiRequest(config);
  };

  static getGroup = (groupId) => {
    const config = Endpoints.getGroup(groupId);
    return ClientHTTP.apiRequest(config);
  };

  static updateGroup = ({ groupId, ...data }) => {
    const config = { ...Endpoints.updateGroup(groupId), data };
    return ClientHTTP.apiRequest(config);
  };

  static deleteGroup = (groupId) => {
    const config = Endpoints.deleteGroup(groupId);
    return ClientHTTP.apiRequest(config);
  };

  /** Send exactly one of `email` or `userId`. */
  static addMember = ({ groupId, ...data }) => {
    const config = { ...Endpoints.addMember(groupId), data };
    return ClientHTTP.apiRequest(config);
  };

  /** Also how a member leaves: pass their own `userId`. */
  static removeMember = ({ groupId, userId }) => {
    const config = Endpoints.removeMember({ groupId, userId });
    return ClientHTTP.apiRequest(config);
  };

  static getBalances = (groupId) => {
    const config = Endpoints.getBalances(groupId);
    return ClientHTTP.apiRequest(config);
  };

  static getSettleUp = (groupId) => {
    const config = Endpoints.getSettleUp(groupId);
    return ClientHTTP.apiRequest(config);
  };
}

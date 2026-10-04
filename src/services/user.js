import { Endpoints } from '@/utils/endpoints';
import { ClientHTTP } from './client';

export class UserService {
  static updateProfile = (data) => {
    const config = { ...Endpoints.updateProfile, data };
    return ClientHTTP.apiRequest(config);
  };

  static searchUser = (email) => {
    const config = { ...Endpoints.searchUser, params: { email } };
    return ClientHTTP.apiRequest(config);
  };

  static getSummary = () => {
    const config = Endpoints.getSummary;
    return ClientHTTP.apiRequest(config);
  };
}

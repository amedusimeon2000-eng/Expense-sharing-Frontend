import { Endpoints } from '@/utils/endpoints';
import { ClientHTTP } from './client';

export class AuthService {
  static register = (data) => {
    const config = { ...Endpoints.register, data };
    return ClientHTTP.apiRequest(config);
  };

  static login = (data) => {
    const config = { ...Endpoints.login, data };
    return ClientHTTP.apiRequest(config);
  };

  static logout = () => {
    const config = Endpoints.logout;
    return ClientHTTP.apiRequest(config);
  };

  static getMe = () => {
    const config = Endpoints.getMe;
    return ClientHTTP.apiRequest(config);
  };

  static getSessions = () => {
    const config = Endpoints.getSessions;
    return ClientHTTP.apiRequest(config);
  };

  static revokeSession = (sessionId) => {
    const config = Endpoints.revokeSession(sessionId);
    return ClientHTTP.apiRequest(config);
  };

  static changePassword = (data) => {
    const config = { ...Endpoints.changePassword, data };
    return ClientHTTP.apiRequest(config);
  };
}

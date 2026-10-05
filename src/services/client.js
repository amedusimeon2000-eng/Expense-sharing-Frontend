import { LOCAL_STORAGE_NAME } from '@/models/auth';
import { AppRoutes } from '@/routes';
import { LocalForageActions } from '@/store/state/localForage';
import { Constants } from '@/utils/constants';
import { Endpoints } from '@/utils/endpoints';
import axios from 'axios';

export class ClientHTTP {
  // The instances
  static API = axios.create({
    timeout: 60000,
    baseURL: `${Constants.API_BASE_URL}/`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // The request handlers
  static apiRequest = async (config) => {
    const response = await ClientHTTP.API(config);
    return response.data;
  };
}

ClientHTTP.API.interceptors.request.use(
  async (config) => {
    const accessToken = await LocalForageActions.fetch(
      LOCAL_STORAGE_NAME.USER_TOKEN,
    );
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

ClientHTTP.API.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response) {
      // There is no refresh endpoint: a 401 means the session ended (logout,
      // expiry or 60 minutes idle). Auth endpoints are excluded so a failed
      // login reaches the form as an error toast instead of a reload.
      if (
        error.response.status === 401 &&
        !Endpoints.isAuthEndpoint(error.config?.url)
      ) {
        await LocalForageActions.delete(LOCAL_STORAGE_NAME.USER_TOKEN);
        const currentUrl = window.location.pathname + window.location.search;
        const redirectParam = encodeURIComponent(currentUrl);
        window.location.href = `${AppRoutes.login}?redirect=${redirectParam}`;
      }
    } else if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  },
);

import { SharedUtils } from './shared';
import { TextUtils } from './text';
import { ToastUtils } from './toast';

export class QueryUtils {
  /** Prefers the first field error over the generic "Validation failed". */
  static queryErrorMessage = (error) => {
    const body = error?.response?.data;
    const message = body?.errors?.[0]?.message ?? body?.message ?? error?.message;
    return message
      ? TextUtils.capitalize({ str: message })
      : error?.response?.statusText;
  };

  static queryKeyWithProps = ({ key, other, params }) => {
    let queryKeys = [key];

    if (SharedUtils.exists(other)) {
      const newList = Array.isArray(other) ? other : [other];
      queryKeys = [...queryKeys, ...newList].filter((item) => !!item);
    }

    if (params) {
      const filteredParams = Object.values(params)
        .filter((value) => value !== undefined)
        .map((item) => (typeof item !== 'string' ? JSON.stringify(item) : item));

      if (filteredParams.length > 0) {
        queryKeys.push(...filteredParams);
      }
    }

    return queryKeys.filter((e) => e);
  };

  static queryCacheOnError = ({ message, query }) => {
    if (query.meta?.errorToast === false) return;

    if (query.meta?.errCode) {
      const title = query.meta?.errCode;
      ToastUtils.errorToast({ message: message || title });
    }
  };
}

import { LOCAL_STORAGE_NAME } from '@/models/auth';
import { LocalForageActions } from '@/store/state/localForage';
import { useEffect, useState } from 'react';

/** `undefined` while the token is still being read out of storage. */
export const useStoredToken = () => {
  const [token, setToken] = useState();

  useEffect(() => {
    LocalForageActions.fetch(LOCAL_STORAGE_NAME.USER_TOKEN).then((value) =>
      setToken(value ?? null),
    );
  }, []);

  return { token, isReading: token === undefined };
};

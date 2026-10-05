import { QUERY_SEARCH_KEYS } from '@/models/query';
import { DEFAULT_LIMIT } from '@/models/serviceRequests';
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export const useGetSharedQueryParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getItem = useCallback((key) => searchParams.get(key), [searchParams]);

  const setItems = useCallback(
    (items) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        Object.entries(items).forEach(([key, value]) => {
          if (value === null || value === undefined || value === '') {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        });
        if (!(QUERY_SEARCH_KEYS.PAGE in items))
          next.delete(QUERY_SEARCH_KEYS.PAGE);
        return next;
      });
    },
    [setSearchParams],
  );

  const page = Number(getItem(QUERY_SEARCH_KEYS.PAGE)) || 1;
  const limit = Number(getItem(QUERY_SEARCH_KEYS.LIMIT)) || DEFAULT_LIMIT;
  const search = getItem(QUERY_SEARCH_KEYS.SEARCH_QUERY) || undefined;

  return { page, limit, search, getItem, setItems };
};

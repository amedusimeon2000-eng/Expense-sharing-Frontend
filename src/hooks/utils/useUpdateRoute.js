import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * Merges params into the URL query without adding a history entry (ported
 * from nowah-dashboard). Empty values drop the key; arrays join with commas.
 * Goes through React Router so `useSearchParams` readers re-render.
 */
export const useUpdateRoute = () => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const updateRoute = (params) => {
    setSearchParams(
      (prev) => {
        const search = new URLSearchParams(prev);
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            search.set(
              key,
              value
                .filter((e) => e)
                .join(',')
                .trim(),
            );
          } else if (value) {
            search.set(key, String(value));
          } else {
            search.delete(key);
          }
        });
        return search;
      },
      { replace: true },
    );
  };

  const back = () => navigate(-1);

  return { updateRoute, back };
};

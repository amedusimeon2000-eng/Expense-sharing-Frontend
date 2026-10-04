import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidateQueries = useCallback(
    (queryKeys) => {
      queryKeys.forEach((queryKey) => {
        queryClient.invalidateQueries({
          queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
        });
      });
    },
    [queryClient],
  );

  const removeQueries = useCallback(
    (queryKeys) => {
      queryKeys.forEach((queryKey) => {
        queryClient.removeQueries({
          queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
          type: 'all',
        });
      });
    },
    [queryClient],
  );

  const refetchQueries = useCallback(
    (type) => {
      queryClient.refetchQueries({ type });
    },
    [queryClient],
  );

  return { invalidateQueries, removeQueries, refetchQueries };
};

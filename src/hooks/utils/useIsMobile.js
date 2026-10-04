import { useCallback, useSyncExternalStore } from 'react';

export const MOBILE_BREAKPOINT = 900;

export const useIsMobile = (breakpoint = MOBILE_BREAKPOINT) => {
  const query = `(max-width: ${breakpoint - 1}px)`;

  const subscribe = useCallback(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onChange);
      return () => mql.removeEventListener('change', onChange);
    },
    [query],
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
  );
};

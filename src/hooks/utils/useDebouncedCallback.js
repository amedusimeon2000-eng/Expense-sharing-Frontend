import { useCallback, useEffect, useRef } from 'react';

export const useDebouncedCallback = ({ callback, delay }) => {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(undefined);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    },
    [],
  );

  return useCallback(
    (...args) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
        timeoutRef.current = undefined;
      }, delay);
    },
    [delay],
  );
};

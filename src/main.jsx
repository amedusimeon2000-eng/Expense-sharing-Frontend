import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryUtils } from './utils/query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const status = error?.response?.status;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
      staleTime: 30000,
      refetchOnWindowFocus: true,
    },
  },
  queryCache: new QueryCache({
    onError: (err, query) => {
      const message = QueryUtils.queryErrorMessage(err);
      QueryUtils.queryCacheOnError({ message, query });
    },
  }),
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />

      <ReactQueryDevtools
        client={queryClient}
        initialIsOpen={false}
        buttonPosition='bottom-right'
      />
    </QueryClientProvider>
  </StrictMode>,
);

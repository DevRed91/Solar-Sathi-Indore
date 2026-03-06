'use client';
import useIdleTimeout from '@/hooks/useIdleTimeout';
import { ReactQueryProviderProps } from '@/types';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { ReactNode } from 'react';

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: Infinity,
  //       gcTime: Infinity,
  //     },
  //   },
  // });
  const queryClient = new QueryClient();

  const asyncStoragePersister = createAsyncStoragePersister({
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <IdleTimerWrapper>{children}</IdleTimerWrapper>
    </QueryClientProvider>
    // <PersistQueryClientProvider
    //   client={queryClient}
    //   persistOptions={{ persister: asyncStoragePersister }}
    // >
    //   <IdleTimerWrapper>{children}</IdleTimerWrapper>
    // </PersistQueryClientProvider>
  );
};

const IdleTimerWrapper = ({ children }: { children: ReactNode }) => {
  useIdleTimeout(2 * 60 * 1000);

  return <>{children}</>;
};
export default ReactQueryProvider;

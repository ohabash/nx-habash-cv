'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react'

const QueryProvider = ({children}:{children: ReactNode }) => {
  const clientQuery = new QueryClient();
  return (
    <QueryClientProvider client={clientQuery}>
      {children}
    </QueryClientProvider>
  );
}

export default QueryProvider

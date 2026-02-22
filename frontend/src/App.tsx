import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from './config/wagmi';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import ArenaPage from './pages/ArenaPage';

const queryClient = new QueryClient();

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'arena'>('home');

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Layout currentPage={currentPage} setCurrentPage={setCurrentPage}>
          {currentPage === 'home' ? <HomePage /> : <ArenaPage />}
        </Layout>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

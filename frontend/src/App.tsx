import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { config } from './config/wagmi';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ChallengesPage from './pages/ChallengesPage';
import CreateChallengePage from './pages/CreateChallengePage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';

const queryClient = new QueryClient();

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'dashboard' | 'challenges' | 'create-challenge' | 'leaderboard' | 'profile'>('landing');

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {currentPage === 'landing' ? (
          <LandingPage onEnter={() => setCurrentPage('dashboard')} />
        ) : (
          <>
            <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage as any} />
            <main className="bg-white min-h-screen">
              {currentPage === 'dashboard' && <DashboardPage />}
              {currentPage === 'challenges' && <ChallengesPage />}
              {currentPage === 'create-challenge' && <CreateChallengePage />}
              {currentPage === 'leaderboard' && <LeaderboardPage />}
              {currentPage === 'profile' && <ProfilePage />}
            </main>
          </>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}

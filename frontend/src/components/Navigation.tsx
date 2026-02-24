import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from '@wagmi/connectors';
import { useState } from 'react';
import Button from './Button';

interface NavigationProps {
  currentPage: 'dashboard' | 'challenges' | 'create-challenge' | 'leaderboard' | 'profile';
  setCurrentPage: (page: 'dashboard' | 'challenges' | 'create-challenge' | 'leaderboard' | 'profile') => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'create-challenge', label: 'Create Challenge' },
    { id: 'leaderboard', label: 'Rankings' },
    { id: 'profile', label: 'Profile' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 group cursor-pointer hover:opacity-85 transition-opacity"
            onClick={() => setCurrentPage('dashboard')}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center shadow-soft text-white font-black text-base">
              S
            </div>
            <div>
              <h1 className="text-sm font-black uppercase tracking-widest text-dark">Somnia Arena</h1>
              <p className="text-xs text-primary/70 font-semibold">Competitive Gaming</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id as any)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  currentPage === item.id
                    ? 'bg-primary text-white shadow-soft'
                    : 'text-dark hover:text-primary hover:bg-primary/5 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Wallet & Mobile Menu */}
          <div className="flex items-center gap-3">
            {isConnected ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/70 transition-all group">
                  <p className="text-xs text-gray-600 font-bold mb-1 uppercase tracking-wider">Connected</p>
                  <p className="text-sm text-primary font-mono font-bold group-hover:text-secondary transition-colors">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>
                <Button
                  onClick={() => disconnect()}
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <div className="hidden md:block">
                <Button
                  onClick={() => connect({ connector: injected() })}
                  variant="primary"
                  size="md"
                >
                  Connect Wallet
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors text-dark hover:text-primary border border-transparent hover:border-primary/30"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 py-4 space-y-2 bg-light animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  currentPage === item.id
                    ? 'bg-primary text-white'
                    : 'text-dark hover:text-primary hover:bg-primary/5'
                }`}
              >
                {item.label}
              </button>
            ))}
            {isConnected ? (
              <Button
                onClick={() => {
                  disconnect();
                  setMobileMenuOpen(false);
                }}
                variant="secondary"
                size="md"
                fullWidth
                className="mt-4"
              >
                Disconnect
              </Button>
            ) : (
              <Button
                onClick={() => {
                  connect({ connector: injected() });
                  setMobileMenuOpen(false);
                }}
                variant="primary"
                size="md"
                fullWidth
                className="mt-4"
              >
                Connect Wallet
              </Button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

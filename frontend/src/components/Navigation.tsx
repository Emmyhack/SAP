import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from '@wagmi/connectors';
import { useState } from 'react';
import Button from './Button';

interface NavigationProps {
  currentPage: 'dashboard' | 'challenges' | 'leaderboard' | 'profile';
  setCurrentPage: (page: 'dashboard' | 'challenges' | 'leaderboard' | 'profile') => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'leaderboard', label: 'Rankings' },
    { id: 'profile', label: 'Profile' },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/30 bg-dark/80 backdrop-blur-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-3 group cursor-pointer hover:opacity-85 transition-opacity"
            onClick={() => setCurrentPage('dashboard')}
          >
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/50 group-hover:shadow-accent/50 transition-all">
              <span className="text-lg font-black text-white">S</span>
            </div>
            <div>
              <h1 className="text-xs font-black uppercase tracking-widest text-white">Somnia Arena</h1>
              <p className="text-xs text-accent/70 font-bold">Competitive Platform</p>
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
                    ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30'
                    : 'text-gray-400 hover:text-white hover:bg-primary/10 border border-transparent hover:border-primary/30'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Wallet & Mobile Menu */}
          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30 hover:border-primary/70 transition-all group">
                  <p className="text-xs text-gray-400 font-bold mb-1 uppercase tracking-wider">Connected</p>
                  <p className="text-sm text-primary font-mono font-bold group-hover:text-accent transition-colors">
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
              className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors text-gray-400 hover:text-white border border-transparent hover:border-primary/30"
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
          <div className="md:hidden pb-6 space-y-3 border-t border-border/30 pt-4 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id as any);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors flex items-center gap-3 ${
                  currentPage === item.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="pt-3 border-t border-border/30 space-y-2">
              {isConnected ? (
                <>
                  <div className="px-4 py-3 rounded-lg bg-primary/10 border border-primary/30">
                    <p className="text-xs text-gray-400 font-bold mb-1">Connected</p>
                    <p className="text-sm text-primary font-mono font-bold">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      disconnect();
                      setMobileMenuOpen(false);
                    }}
                    variant="secondary"
                    fullWidth
                  >
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    connect({ connector: injected() });
                    setMobileMenuOpen(false);
                  }}
                  variant="primary"
                  fullWidth
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

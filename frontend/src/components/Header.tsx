import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from '@wagmi/connectors';
import { useState } from 'react';

interface HeaderProps {
  currentPage: 'home' | 'arena';
  setCurrentPage: (page: 'home' | 'arena') => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border bg-secondary/50 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="w-11 h-11 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center shadow-lg shadow-primary/50 group-hover:shadow-accent/50 transition-all">
              <span className="text-white font-bold text-lg">⚡</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-gradient">Somnia Arena</h1>
              <p className="text-xs text-gray-400 font-semibold tracking-widest">PASSPORT</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            <button
              onClick={() => setCurrentPage('home')}
              className={`font-semibold transition-all duration-300 relative group ${
                currentPage === 'home'
                  ? 'text-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform transition-transform duration-300 ${currentPage === 'home' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
            <button
              onClick={() => setCurrentPage('arena')}
              className={`font-semibold transition-all duration-300 relative group ${
                currentPage === 'arena'
                  ? 'text-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Arena
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-primary transform transition-transform duration-300 ${currentPage === 'arena' ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></span>
            </button>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="hidden md:flex items-center gap-3">
                <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-sm text-primary font-mono font-semibold">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>
                <button
                  onClick={() => disconnect()}
                  className="btn btn-secondary text-sm font-semibold"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: injected() })}
                className="hidden md:flex btn btn-primary font-semibold"
              >
                Connect Wallet
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-border/30 pt-4">
            <button
              onClick={() => {
                setCurrentPage('home');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'home'
                  ? 'bg-primary/20 text-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {
                setCurrentPage('arena');
                setMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 'arena'
                  ? 'bg-accent/20 text-accent'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Arena
            </button>
            {isConnected ? (
              <>
                <div className="px-4 py-2 rounded-lg bg-primary/10 border border-primary/30">
                  <p className="text-sm text-primary font-mono font-semibold">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    disconnect();
                    setMobileMenuOpen(false);
                  }}
                  className="btn btn-secondary w-full font-semibold"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  connect({ connector: injected() });
                  setMobileMenuOpen(false);
                }}
                className="btn btn-primary w-full font-semibold"
              >
                Connect Wallet
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

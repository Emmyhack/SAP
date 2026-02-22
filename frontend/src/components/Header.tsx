import { useAccount } from 'wagmi';
import { useConnect, useDisconnect } from 'wagmi';
import { injected } from '@wagmi/connectors';

interface HeaderProps {
  currentPage: 'home' | 'arena';
  setCurrentPage: (page: 'home' | 'arena') => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <header className="border-b border-border bg-secondary sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ⓢ</span>
            </div>
            <h1 className="text-xl font-bold text-gradient">Somnia Arena</h1>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('home')}
              className={`transition-colors ${
                currentPage === 'home'
                  ? 'text-primary font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setCurrentPage('arena')}
              className={`transition-colors ${
                currentPage === 'arena'
                  ? 'text-primary font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Arena
            </button>
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-4">
            {isConnected ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </span>
                <button
                  onClick={() => disconnect()}
                  className="btn btn-secondary text-sm"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={() => connect({ connector: injected() })}
                className="btn btn-primary"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

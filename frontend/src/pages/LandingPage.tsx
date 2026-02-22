import { useAccount, useConnect } from 'wagmi';
import { injected } from '@wagmi/connectors';
import Button from '../components/Button';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const { isConnected } = useAccount();
  const { connect } = useConnect();

  const handleGetStarted = () => {
    if (isConnected) {
      onEnter();
    } else {
      connect({ connector: injected() });
    }
  };

  return (
    <div className="min-h-screen bg-dark overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/40 bg-dark/80 backdrop-blur-md sticky top-0">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold">⚡</span>
            </div>
            <h1 className="text-xl font-black text-white tracking-wider">Somnia Arena</h1>
          </div>
          <Button
            onClick={() => connect({ connector: injected() })}
            variant={isConnected ? 'secondary' : 'primary'}
            size="md"
          >
            {isConnected ? '✓ Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-20 text-center animate-fade-in">
          <div className="inline-block mb-6">
            <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/50 backdrop-blur-sm">
              <p className="text-sm font-bold text-primary">🚀 Competitive Gaming on Web3</p>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-gradient">Compete.</span>
            <br />
            <span className="text-white">Earn.</span> <span className="text-gradient-reverse">Dominate.</span>
          </h1>

          <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Enter the Somnia Arena. Challenge competitors, prove your skills, and build your reputation on the blockchain.
            One soulbound Passport. Infinite possibilities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              onClick={handleGetStarted}
              variant="primary"
              size="lg"
            >
              {isConnected ? '→ Enter Arena' : '→ Get Started'}
            </Button>
            <Button
              onClick={() => {
                const el = document.getElementById('features');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="secondary"
              size="lg"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-12">
            <div className="card">
              <p className="text-2xl font-black text-accent">8.5K+</p>
              <p className="text-xs text-gray-400 mt-1">Active Players</p>
            </div>
            <div className="card">
              <p className="text-2xl font-black text-primary">1.2M</p>
              <p className="text-xs text-gray-400 mt-1">ETH Prize Pool</p>
            </div>
            <div className="card">
              <p className="text-2xl font-black text-green-400">428K</p>
              <p className="text-xs text-gray-400 mt-1">Challenges Won</p>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Why Somnia Arena?</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Everything you need to compete and win</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: '🎖️',
                title: 'Soulbound Passport',
                description: 'Your unique NFT identity. Non-transferable, always yours.',
              },
              {
                icon: '⚡',
                title: 'Epic Challenges',
                description: 'Compete in diverse competitions with rising difficulty.',
              },
              {
                icon: '📈',
                title: 'Reputation System',
                description: 'Build your reputation and climb the global leaderboards.',
              },
              {
                icon: '💰',
                title: 'Real Rewards',
                description: 'Earn ETH and tokens from prize pools and competitions.',
              },
              {
                icon: '🔗',
                title: 'Web3 Native',
                description: 'Fully decentralized. Your data, your control, your rewards.',
              },
              {
                icon: '⚙️',
                title: 'Fair & Transparent',
                description: 'All logic on-chain. Verifiable, trustless, immutable.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="card group hover:border-primary/70 hover:shadow-2xl hover:shadow-primary/20 transition-all"
              >
                <p className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</p>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Four simple steps to start competing</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: '01',
                  title: 'Connect Your Wallet',
                  description: 'Sign in with your Web3 wallet to get started.',
                },
                {
                  step: '02',
                  title: 'Mint Your Passport',
                  description: 'Create your soulbound NFT passport in one transaction.',
                },
                {
                  step: '03',
                  title: 'Join a Challenge',
                  description: 'Pick a challenge, pay the entry fee, and compete.',
                },
                {
                  step: '04',
                  title: 'Earn Rewards',
                  description: 'Win challenges, build reputation, and claim prizes.',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-6 card group hover:border-primary/70 transition-all"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0 font-bold text-lg group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                  <div className="py-2">
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-20">
          <div className="card glow-border bg-gradient-to-r from-primary/5 to-accent/5 py-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to Compete?</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of competitors battling for supremacy. The arena awaits.
            </p>
            <Button
              onClick={handleGetStarted}
              variant="primary"
              size="lg"
            >
              {isConnected ? '→ Enter Arena Now' : '→ Connect & Start'}
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 pt-12 text-center text-gray-500 text-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold text-white mb-2">Arena</p>
              <p className="text-xs text-gray-400">Challenges</p>
            </div>
            <div>
              <p className="font-bold text-white mb-2">Learn</p>
              <p className="text-xs text-gray-400">Docs</p>
            </div>
            <div>
              <p className="font-bold text-white mb-2">Community</p>
              <p className="text-xs text-gray-400">Discord</p>
            </div>
            <div>
              <p className="font-bold text-white mb-2">Links</p>
              <p className="text-xs text-gray-400">Twitter</p>
            </div>
          </div>
          <p>© 2025 Somnia Arena. All rights reserved.</p>
        </footer>
      </main>
    </div>
  );
}

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
    <div className="min-h-screen bg-dark">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-dark/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black tracking-tight">SOMNIA</h1>
            <div className="w-px h-6 bg-border"></div>
            <span className="text-sm font-bold text-gray-400 tracking-widest">ARENA</span>
          </div>
          <Button
            onClick={() => connect({ connector: injected() })}
            variant={isConnected ? 'secondary' : 'primary'}
            size="md"
          >
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center py-20">
          <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-tight">
              <span className="text-gradient">Compete</span>
              <br />
              <span>to</span>
              <br />
              <span className="text-gradient-reverse">Dominate</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto font-light">
              A competitive gaming platform where skill meets reward. Build your reputation, compete globally, and claim what you earn.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Button
                onClick={handleGetStarted}
                variant="primary"
                size="lg"
              >
                {isConnected ? 'Enter Arena' : 'Get Started'}
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

            {/* Key Highlight */}
            <div className="inline-block px-6 py-3 rounded-lg bg-primary/5 border border-primary/30">
              <p className="text-sm font-semibold text-gray-300">
                Live on Somnia Testnet • Chain ID 50312
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 border-t border-border/40">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Core Features</h2>
              <p className="text-lg text-gray-400">Everything you need to compete at the highest level</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Soulbound Identity',
                  desc: 'Mint your permanent NFT passport. Non-transferable, always yours. Your reputation follows you on chain.'
                },
                {
                  title: 'Real Competition',
                  desc: 'Enter structured challenges with transparent rules. Compete against players worldwide in real-time.'
                },
                {
                  title: 'Reputation System',
                  desc: 'Every win builds your reputation score. Climb leaderboards and earn recognition across the network.'
                },
                {
                  title: 'Actual Rewards',
                  desc: 'Winners earn real cryptocurrency. Prize pools are split among top performers each season.'
                },
                {
                  title: 'Fully Decentralized',
                  desc: 'All logic lives on the blockchain. Transparent, verifiable, and immutable. Complete on-chain.'
                },
                {
                  title: 'Fast & Scalable',
                  desc: 'Built on Somnia for high throughput. Minimal fees, instant confirmation, zero delays.'
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="card group hover:border-primary/70 transition-all"
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg"></div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 border-t border-border/40">
          <div className="max-w-5xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Getting Started</h2>
              <p className="text-lg text-gray-400">Four straightforward steps to begin your competitive journey</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  number: '01',
                  title: 'Connect Wallet',
                  desc: 'Link your Web3 wallet. We support MetaMask, WalletConnect, and most standard Web3 providers.'
                },
                {
                  number: '02',
                  title: 'Mint Passport',
                  desc: 'Create your soulbound NFT in one transaction. This is your permanent identity in the Arena.'
                },
                {
                  number: '03',
                  title: 'Browse Challenges',
                  desc: 'Explore available competitions with different difficulty levels and entry fee requirements.'
                },
                {
                  number: '04',
                  title: 'Compete & Earn',
                  desc: 'Enter challenges, prove your skills, win rewards, and build your global reputation.'
                },
              ].map((step, idx) => (
                <div key={idx} className="flex gap-6 card group hover:border-primary/70 transition-all">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0 font-bold text-lg text-white">
                    {step.number}
                  </div>
                  <div className="py-2">
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 border-t border-border/40">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Ready to Compete?</h2>
            <p className="text-lg text-gray-400 mb-12">
              Join the competitive gaming revolution. Build your reputation on blockchain. Earn real rewards for your skill.
            </p>
            <Button
              onClick={handleGetStarted}
              variant="primary"
              size="lg"
            >
              {isConnected ? 'Enter Arena' : 'Connect & Start'}
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 py-12 text-center text-gray-500 text-sm">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-6 text-xs font-semibold tracking-widest mb-6">
              <span>SOMNIA ARENA</span>
              <span className="text-gray-700">•</span>
              <span>CHAIN 50312</span>
              <span className="text-gray-700">•</span>
              <span className="text-green-400">LIVE</span>
            </div>
          </div>
          <p>Competitive gaming on blockchain. Built on Somnia. For everyone.</p>
        </footer>
      </main>
    </div>
  );
}

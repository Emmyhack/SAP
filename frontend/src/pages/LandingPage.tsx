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

      {/* Header Navigation - Enhanced */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-dark/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              SOMNIA
            </h1>
            <div className="w-0.5 h-6 bg-gradient-to-b from-primary to-accent"></div>
            <span className="text-xs font-black text-gray-300 tracking-widest">ARENA</span>
          </div>
          <Button
            onClick={() => connect({ connector: injected() })}
            variant={isConnected ? 'secondary' : 'primary'}
            size="md"
          >
            {isConnected ? 'Connected ✓' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4">
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center py-20">
          <div className="max-w-5xl mx-auto animate-fade-in">
            {/* Pre-headline */}
            <div className="mb-8">
              <div className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/40">
                <p className="text-sm font-bold text-accent tracking-widest uppercase">
                  Competitive Gaming Reimagined
                </p>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tight leading-tight">
              <span className="text-gradient">Compete</span>
              <br />
              <span>to</span>
              <br />
              <span className="text-gradient-reverse">Dominate</span>
            </h1>

            {/* Subheading - Enhanced */}
            <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed max-w-3xl mx-auto font-light">
              A decentralized competitive platform where your skill translates to real rewards. Build your reputation on chain, compete globally, and claim what you earn.
            </p>

            {/* Value Props - Quick Scan */}
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-14 max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span className="text-sm font-semibold text-gray-300">Soulbound NFT Passport</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span className="text-sm font-semibold text-gray-300">Real Cryptocurrency Rewards</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span className="text-sm font-semibold text-gray-300">Global Leaderboards</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                <span className="text-sm font-semibold text-gray-300">Fully Decentralized</span>
              </div>
            </div>

            {/* CTA Buttons - Emphasized */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
              <Button
                onClick={handleGetStarted}
                variant="primary"
                size="lg"
              >
                {isConnected ? 'Enter Arena Now' : 'Start Competing'}
              </Button>
              <Button
                onClick={() => {
                  const el = document.getElementById('features');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                variant="secondary"
                size="lg"
              >
                See How It Works
              </Button>
            </div>

            {/* Status Badge - Enhanced */}
            <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/40 inline-block">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-sm font-semibold text-gray-200">
                Live on Somnia • Chain 50312
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32 border-t border-border/40">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                <span className="text-gradient">Everything You Need</span>
                <br /> to Dominate
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                A complete competitive ecosystem built on blockchain with real rewards, transparent rules, and global reach.
              </p>
            </div>

            {/* Enhanced Feature Grid with Varied Layout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Large Featured Card */}
              <div className="md:col-span-1 card group hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/10">
                <div className="mb-6">
                  <div className="inline-block h-12 w-12 rounded-lg bg-gradient-to-br from-accent to-accent/50"></div>
                </div>
                <h3 className="text-2xl font-black mb-3">Soulbound Identity</h3>
                <p className="text-gray-400 leading-relaxed">
                  Mint your permanent NFT passport. Non-transferable, always yours. Your reputation follows you forever on chain.
                </p>
              </div>

              <div className="md:col-span-2">
                <div className="grid grid-cols-2 gap-6 h-full">
                  <div className="card group hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
                    <div className="mb-4">
                      <div className="inline-block h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/50"></div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Real Competition</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Compete against players worldwide with transparent rules.
                    </p>
                  </div>

                  <div className="card group hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/10">
                    <div className="mb-4">
                      <div className="inline-block h-10 w-10 rounded-lg bg-gradient-to-br from-accent to-accent/50"></div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">Actual Rewards</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Winners earn real cryptocurrency split among top performers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Second Grid Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card group hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
                <div className="mb-4">
                  <div className="inline-block h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/50"></div>
                </div>
                <h3 className="text-lg font-bold mb-2">Reputation System</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every win builds your score. Climb leaderboards and earn recognition.
                </p>
              </div>

              <div className="card group hover:border-accent/50 transition-all hover:shadow-2xl hover:shadow-accent/10">
                <div className="mb-4">
                  <div className="inline-block h-10 w-10 rounded-lg bg-gradient-to-br from-accent to-accent/50"></div>
                </div>
                <h3 className="text-lg font-bold mb-2">Fully Decentralized</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  All logic lives on chain. Transparent, verifiable, immutable.
                </p>
              </div>

              <div className="card group hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/10">
                <div className="mb-4">
                  <div className="inline-block h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-primary/50"></div>
                </div>
                <h3 className="text-lg font-bold mb-2">Fast & Scalable</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Built on Somnia for high throughput. Minimal fees, instant confirmation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-32 border-t border-border/40">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20 text-center">
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                <span className="text-gradient">Four Steps</span> to Start Competing
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Get from zero to competing in minutes. Simple, straightforward, no complexity.
              </p>
            </div>

            {/* Steps with Enhanced Visualization */}
            <div className="space-y-6">
              {[
                {
                  number: '01',
                  title: 'Connect Wallet',
                  desc: 'Link your Web3 wallet. Support for MetaMask, WalletConnect, and all standard Web3 providers.',
                  color: 'from-primary'
                },
                {
                  number: '02',
                  title: 'Mint Passport',
                  desc: 'Create your soulbound NFT identity in one transaction. Instant verification on Somnia.',
                  color: 'from-accent'
                },
                {
                  number: '03',
                  title: 'Explore Challenges',
                  desc: 'Browse competitions with different difficulty levels, fees, and reward pools. Pick what suits you.',
                  color: 'from-primary'
                },
                {
                  number: '04',
                  title: 'Compete & Earn',
                  desc: 'Enter challenges, prove your skills, win real rewards, and watch your reputation grow.',
                  color: 'from-accent'
                },
              ].map((step, idx) => (
                <div
                  key={idx}
                  className="group relative card hover:border-primary/50 transition-all overflow-hidden hover:shadow-2xl hover:shadow-primary/10"
                >
                  {/* Background gradient accent */}
                  <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${step.color} to-transparent opacity-0 group-hover:opacity-5 transition-opacity`}></div>

                  <div className="flex gap-8 items-start md:items-center">
                    {/* Number Badge */}
                    <div className={`relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${step.color} to-transparent flex items-center justify-center flex-shrink-0 font-black text-2xl md:text-3xl text-white`}>
                      <span>{step.number}</span>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} to-transparent opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-2">
                      <h3 className="text-2xl md:text-3xl font-black mb-3 group-hover:text-accent transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed text-lg">{step.desc}</p>
                    </div>

                    {/* Arrow indicator (hidden on mobile) */}
                    {idx < 3 && (
                      <div className="hidden lg:flex text-accent/30 group-hover:text-accent transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section - Enhanced */}
        <section className="py-32 border-t border-border/40">
          <div className="max-w-4xl mx-auto">
            {/* Large visual container */}
            <div className="relative rounded-3xl overflow-hidden">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent"></div>
              <div className="absolute inset-0 border-2 border-primary/40 rounded-3xl"></div>

              {/* Content */}
              <div className="relative px-8 md:px-16 py-20 text-center">
                <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
                  Ready to <span className="text-gradient">Dominate</span> the Arena?
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                  Thousands of competitive players worldwide are building their reputation. Start your journey today and prove what you can achieve.
                </p>

                {/* Dual CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleGetStarted}
                    variant="primary"
                    size="lg"
                  >
                    {isConnected ? 'Enter Arena Now' : 'Connect Wallet'}
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

                {/* Trust indicators or key benefits */}
                <div className="mt-12 pt-12 border-t border-primary/40 flex flex-col sm:flex-row gap-8 justify-center items-center">
                  <div className="text-center">
                    <p className="text-3xl font-black text-accent mb-1">100%</p>
                    <p className="text-sm text-gray-400">On-Chain Verified</p>
                  </div>
                  <div className="w-px h-12 bg-border hidden sm:block"></div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-primary mb-1">Real</p>
                    <p className="text-sm text-gray-400">Cryptocurrency Rewards</p>
                  </div>
                  <div className="w-px h-12 bg-border hidden sm:block"></div>
                  <div className="text-center">
                    <p className="text-3xl font-black text-accent mb-1">24/7</p>
                    <p className="text-sm text-gray-400">Global Competition</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 py-16 text-center text-gray-500 text-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="mb-12">
              <div className="flex items-center justify-center gap-4 text-xs font-semibold tracking-widest mb-8 flex-wrap">
                <span className="text-gray-300">SOMNIA ARENA</span>
                <span className="text-gray-700">•</span>
                <span className="text-gray-300">CHAIN 50312</span>
                <span className="text-gray-700">•</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400">LIVE</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border/40 pt-8">
              <p className="text-gray-400 max-w-2xl mx-auto">
                Competitive gaming reimagined on blockchain. Built on Somnia. Open to everyone.
              </p>
              <p className="mt-4 text-xs text-gray-600">
                Smart contracts verified on Somnia Testnet. Play at your own risk.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

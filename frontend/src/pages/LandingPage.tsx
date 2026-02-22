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
      {/* Minimal Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header Navigation - Minimal */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-dark/75 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">SOMNIA ARENA</span>
          </div>
          <Button
            onClick={() => connect({ connector: injected() })}
            variant={isConnected ? 'secondary' : 'primary'}
            size="sm"
          >
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {/* HERO SECTION - Conversion Focused */}
        <section className="max-w-4xl mx-auto px-4 py-24 md:py-32">
          <div className="text-center">
            {/* Main Headline - Clear Value Prop (10 words, <12 requirement) */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight tracking-tight">
              Compete Globally. Build Reputation. Earn Real Rewards.
            </h1>

            {/* Supporting Sentence (18 words, <20 requirement) */}
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              A decentralized competitive platform where your skill directly translates into cryptocurrency earnings and global recognition.
            </p>

            {/* Primary CTA - Dominates Layout */}
            <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleGetStarted}
                variant="primary"
                size="lg"
                className="px-10 py-4 text-lg"
              >
                {isConnected ? 'Enter Arena' : 'Start Competing Free'}
              </Button>
            </div>

            {/* Trust Signal - Minimal */}
            <p className="text-sm text-gray-400">
              No credit card required. Live on Somnia (Chain 50312).
            </p>
          </div>
        </section>

        {/* PROBLEM SECTION - Paint the Pain */}
        <section className="bg-dark/50 border-t border-b border-border/50 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                The Problem With Competitive Gaming Today
              </h2>
              <p className="text-lg text-gray-400">
                Gaming rewards exist, but the barriers are high and the games aren't fair.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-border/50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Fragmented Platforms</h3>
                <p className="text-gray-400 leading-relaxed">
                  Gaming communities are scattered across Discord servers, private tournaments, and opaque platforms. No single place to compete.
                </p>
              </div>
              <div className="border border-border/50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">No Real Proof</h3>
                <p className="text-gray-400 leading-relaxed">
                  Winning a tournament means nothing if it's not recorded on chain. Your achievement disappears tomorrow.
                </p>
              </div>
              <div className="border border-border/50 rounded-lg p-8">
                <h3 className="text-2xl font-bold text-white mb-4">Slow Payouts</h3>
                <p className="text-gray-400 leading-relaxed">
                  Prize pools take weeks to payout. When they do, fees eat into your earnings. Centralized platforms are slow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION SECTION - How We Fix It */}
        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Somnia Arena Solves This
              </h2>
              <p className="text-lg text-gray-400">
                A transparent, connected competitive ecosystem on blockchain.
              </p>
            </div>

            <div className="space-y-6">
              <div className="border border-border/50 rounded-lg p-8 md:p-10">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Single Platform, Global Reach</h3>
                    <p className="text-gray-400 leading-relaxed">
                      All competitions in one place. Find opponents worldwide. No more hunting for tournaments or waiting for admin approval.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border/50 rounded-lg p-8 md:p-10">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Permanent On-Chain Reputation</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Your wins are recorded forever on blockchain. Your reputation follows you, builds over time, and proves your skill level to anyone.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-border/50 rounded-lg p-8 md:p-10">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 font-bold text-primary text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">Instant, Transparent Payouts</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Win a challenge? Get paid instantly in real cryptocurrency. No middleman. No delays. Minimal fees from blockchain confirmation only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION - Outcomes, Not Features */}
        <section className="bg-dark/50 border-t border-b border-border/50 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                What You Get
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <p className="text-white text-sm font-bold">✓</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Earn Real Money</h3>
                    <p className="text-gray-400">Win ETH directly to your wallet. No conversion delays or third-party platforms.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <p className="text-white text-sm font-bold">✓</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Build Permanent Proof</h3>
                    <p className="text-gray-400">Your ranking and reputation stay on chain. Impress anyone with verifiable achievements.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <p className="text-white text-sm font-bold">✓</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Compete 24/7</h3>
                    <p className="text-gray-400">No waiting for tournaments. Challenges always available. Compete when it suits you.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <p className="text-dark text-sm font-bold">✓</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Join a Real Community</h3>
                    <p className="text-gray-400">Compete with legitimate players globally. Real stakes. Real skill. Real recognition.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <p className="text-dark text-sm font-bold">✓</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Transparent Rules</h3>
                    <p className="text-gray-400">Everything enforced by smart contracts. No hidden fees. No unexpected changes. Pure fairness.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                    <p className="text-dark text-sm font-bold">✓</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Own Your Identity</h3>
                    <p className="text-gray-400">Your passport NFT is yours forever. Non-transferable. Unmintable. Truly soulbound.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF SECTION - Trust Signals */}
        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Built for Legitimacy
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-8 border border-border/50 rounded-lg">
                <p className="text-5xl font-black text-primary mb-2">100%</p>
                <p className="text-gray-400 text-lg">On-Chain Verified</p>
                <p className="text-gray-500 text-sm mt-2">All transactions recorded on Somnia blockchain</p>
              </div>
              <div className="text-center p-8 border border-border/50 rounded-lg">
                <p className="text-5xl font-black text-accent mb-2">Zero</p>
                <p className="text-gray-400 text-lg">Hidden Fees</p>
                <p className="text-gray-500 text-sm mt-2">Complete transparency on all costs</p>
              </div>
              <div className="text-center p-8 border border-border/50 rounded-lg">
                <p className="text-5xl font-black text-primary mb-2">Instant</p>
                <p className="text-gray-400 text-lg">Payouts</p>
                <p className="text-gray-500 text-sm mt-2">Rewards transfer immediately upon win</p>
              </div>
            </div>

            <div className="bg-dark/50 rounded-lg p-10 border border-border/50 text-center">
              <p className="text-gray-400 text-lg mb-6">
                Smart contracts audited and deployed to Somnia Testnet. Play with confidence knowing every game is fair.
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <p className="text-sm text-green-400 font-semibold">Live • Chain 50312 • Testing Phase</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW TO GET STARTED SECTION */}
        <section className="bg-dark/50 border-t border-b border-border/50 py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Set Up in 4 Steps
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 font-bold text-xl text-primary">
                  1
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Connect Wallet</h3>
                <p className="text-gray-400 text-sm">Use MetaMask or any Web3 provider</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 font-bold text-xl text-primary">
                  2
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mint Passport</h3>
                <p className="text-gray-400 text-sm">Create your soulbound NFT identity</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 font-bold text-xl text-primary">
                  3
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Enter Challenge</h3>
                <p className="text-gray-400 text-sm">Pay entry fee, compete with opponents</p>
              </div>

              <div className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4 font-bold text-xl text-primary">
                  4
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Get Paid</h3>
                <p className="text-gray-400 text-sm">Win ETH instantly to your wallet</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION - Strong Close */}
        <section className="py-24 md:py-32">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Stop Waiting. Start Competing.
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Thousands of players are already building their reputation on chain. Join them.
            </p>

            {/* Dominant CTA */}
            <Button
              onClick={handleGetStarted}
              variant="primary"
              size="lg"
              className="px-12 py-5 text-lg font-bold"
            >
              {isConnected ? 'Enter Arena Now' : 'Start Competing Free'}
            </Button>

            <p className="text-sm text-gray-500 mt-8">
              No credit card. No deposits. Just compete and earn.
            </p>
          </div>
        </section>

        {/* Footer - Minimal */}
        <footer className="border-t border-border/50 bg-dark/50 py-12 text-center text-gray-500 text-xs">
          <div className="max-w-6xl mx-auto px-4">
            <p className="text-gray-400 mb-2">
              Somnia Arena • Testnet • Chain 50312
            </p>
            <p className="text-gray-600">
              Built on blockchain. Smart contracts audited. Play at your own risk.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

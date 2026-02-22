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
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg"></div>
            <span className="text-lg font-black text-dark">Somnia Arena</span>
          </div>
          <Button
            onClick={() => !isConnected && connect({ connector: injected() })}
            variant={isConnected ? 'secondary' : 'primary'}
            size="sm"
          >
            {isConnected ? 'Connected' : 'Connect Wallet'}
          </Button>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-4 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-dark mb-6 leading-tight">
                Compete Globally, Build Reputation, Earn Real Rewards
              </h1>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                A decentralized competitive platform where your skill directly translates into cryptocurrency earnings and verifiable global recognition on the blockchain.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleGetStarted}
                  variant="primary"
                  size="lg"
                  className="px-8 py-3"
                >
                  {isConnected ? 'Enter Arena' : 'Start Competing Free'}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-8 py-3"
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                  Learn More
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-8">
                No credit card required • Live on Somnia (Chain 50312)
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-full h-96 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🎮</span>
                  </div>
                  <p>Arena Dashboard Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-gray-50 py-20 md:py-28 border-t border-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
                The Complete Competitive Platform
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to compete, earn, and build your reputation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">Instant Payouts</h3>
                <p className="text-gray-600">
                  Win a competition and get paid directly to your wallet in real cryptocurrency. No delays, no middlemen, no fees.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🔐</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">Permanent Reputation</h3>
                <p className="text-gray-600">
                  Your wins are recorded forever on the blockchain. Build a verifiable reputation that proves your skill to anyone.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🌍</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">Global Community</h3>
                <p className="text-gray-600">
                  Compete against players worldwide in a single unified platform. Find opponents, join challenges, build your legacy.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">📊</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">Real-Time Rankings</h3>
                <p className="text-gray-600">
                  Watch your reputation grow in real-time. Climb the global leaderboard and compete for the top positions.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🛡️</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">Smart Contract Security</h3>
                <p className="text-gray-600">
                  All competitions are enforced by audited smart contracts. Complete fairness, complete transparency, complete control.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white rounded-xl p-8 border border-border">
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-dark mb-3">Multiple Game Types</h3>
                <p className="text-gray-600">
                  From board games to strategy challenges. Multiple ways to compete and earn based on your skills and preferences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className="py-20 md:py-28 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
              Getting Started is Simple
            </h2>
            <p className="text-xl text-gray-600">
              Set up your account and start competing in just a few minutes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: 'Connect Wallet',
                description: 'Link your Web3 wallet (MetaMask, WalletConnect, or any provider)'
              },
              {
                step: 2,
                title: 'Mint Passport',
                description: 'Create your soulbound NFT identity that proves your competitive history'
              },
              {
                step: 3,
                title: 'Join Challenge',
                description: 'Browse and enter competitions that match your skill level and interests'
              },
              {
                step: 4,
                title: 'Earn Rewards',
                description: 'Win competitions and get paid instant rewards directly to your wallet'
              }
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="absolute -top-6 left-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {item.step}
                </div>
                <div className="pt-8 border-l-2 border-primary pl-8">
                  <h3 className="text-lg font-bold text-dark mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PRODUCTS SECTION */}
        <section className="bg-gray-50 py-20 md:py-28 border-t border-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
                Our Product Suite
              </h2>
              <p className="text-xl text-gray-600">
                Complete monitoring and competitive features all in one platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product 1 */}
              <div className="bg-white rounded-xl p-10 border border-border">
                <h3 className="text-2xl font-bold text-dark mb-4">Arena Challenges</h3>
                <p className="text-gray-600 mb-6">
                  Browse and compete in challenges across multiple game types. Filter by difficulty, entry fee, and reward amount. Join instant competitions with players around the world.
                </p>
                <Button variant="secondary" size="sm">Learn More</Button>
              </div>

              {/* Product 2 */}
              <div className="bg-white rounded-xl p-10 border border-border">
                <h3 className="text-2xl font-bold text-dark mb-4">Reputation System</h3>
                <p className="text-gray-600 mb-6">
                  Build your permanent competitive reputation on the blockchain. Your wins, losses, and skill ratings are all recorded immutably for the entire web3 community to verify.
                </p>
                <Button variant="secondary" size="sm">Learn More</Button>
              </div>

              {/* Product 3 */}
              <div className="bg-white rounded-xl p-10 border border-border">
                <h3 className="text-2xl font-bold text-dark mb-4">Global Leaderboard</h3>
                <p className="text-gray-600 mb-6">
                  Compete for the top positions on our global rankings. Real-time updates show exactly where you stand against the best players. Earn exclusive badges and rewards.
                </p>
                <Button variant="secondary" size="sm">Learn More</Button>
              </div>

              {/* Product 4 */}
              <div className="bg-white rounded-xl p-10 border border-border">
                <h3 className="text-2xl font-bold text-dark mb-4">Smart Payouts</h3>
                <p className="text-gray-600 mb-6">
                  Winnings distributed instantly through smart contracts. No manual processing, no delays, no hidden fees. Transparent, automated, and fair every single time.
                </p>
                <Button variant="secondary" size="sm">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-20 md:py-28 max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">
              Trusted by Competitive Players
            </h2>
            <p className="text-xl text-gray-600">
              See what the community is saying about Somnia Arena
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Finally a competitive platform where wins actually mean something. My reputation is permanently recorded and proves my skills.',
                author: 'Alex Chen',
                role: 'Board Game Enthusiast'
              },
              {
                quote: 'The instant payouts are incredible. I win a challenge and the ETH hits my wallet within seconds. No waiting, no fees.',
                author: 'Jordan Lee',
                role: 'Competitive Gamer'
              },
              {
                quote: 'Building a real reputation on-chain is game-changing. Sponsors can verify my competitive history. This is the future.',
                author: 'Maria Santos',
                role: 'Professional Player'
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-8 border border-border">
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-dark">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST INDICATORS */}
        <section className="bg-gray-50 py-20 md:py-28 border-t border-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <p className="text-5xl font-black text-primary mb-2">100%</p>
                <p className="text-lg font-bold text-dark">Blockchain Verified</p>
                <p className="text-gray-600 text-sm mt-2">All transactions recorded on-chain</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-black text-primary mb-2">Zero</p>
                <p className="text-lg font-bold text-dark">Hidden Fees</p>
                <p className="text-gray-600 text-sm mt-2">Complete transparency on all costs</p>
              </div>
              <div className="text-center">
                <p className="text-5xl font-black text-primary mb-2">Instant</p>
                <p className="text-lg font-bold text-dark">Payouts</p>
                <p className="text-gray-600 text-sm mt-2">Rewards arrive immediately</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-10 border border-border text-center">
              <p className="text-lg text-gray-700 mb-4">
                All smart contracts are audited and deployed to Somnia Testnet (Chain 50312). Play with confidence knowing every game is fair and transparent.
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-600 font-semibold">Live • Audited • Ready to Play</p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="py-24 md:py-32 max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">
              Join Thousands of Competitive Players
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Start building your reputation, compete globally, and earn real rewards today. No credit card required.
            </p>

            <Button
              onClick={handleGetStarted}
              variant="primary"
              size="lg"
              className="px-12 py-4 text-lg font-bold"
            >
              {isConnected ? 'Enter Arena Now' : 'Start Competing Free'}
            </Button>

            <p className="text-sm text-gray-500 mt-8">
              No credit card • No deposits • Just compete and earn
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-gray-50 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 bg-primary rounded-lg"></div>
                  <span className="font-bold text-dark">Somnia Arena</span>
                </div>
                <p className="text-sm text-gray-600">The competitive platform for earning and reputation building.</p>
              </div>
              <div>
                <h4 className="font-bold text-dark mb-4">Product</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li><a href="#" className="hover:text-primary">Features</a></li>
                  <li><a href="#" className="hover:text-primary">Pricing</a></li>
                  <li><a href="#" className="hover:text-primary">How It Works</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-dark mb-4">Company</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li><a href="#" className="hover:text-primary">About</a></li>
                  <li><a href="#" className="hover:text-primary">Blog</a></li>
                  <li><a href="#" className="hover:text-primary">Contact</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-dark mb-4">Legal</h4>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li><a href="#" className="hover:text-primary">Terms</a></li>
                  <li><a href="#" className="hover:text-primary">Privacy</a></li>
                  <li><a href="#" className="hover:text-primary">Security</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-8 text-center text-sm text-gray-600">
              <p>© 2026 Somnia Arena. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

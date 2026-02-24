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
      <header className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-soft">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-r from-primary to-accent rounded-lg text-white font-black flex items-center justify-center text-sm">S</div>
            <span className="text-lg font-black text-dark">Somnia Arena</span>
          </div>
          <Button
            onClick={() => {
              if (!isConnected) {
                connect({ connector: injected() });
              }
            }}
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
              <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
                <Button
                  onClick={handleGetStarted}
                  variant="primary"
                  size="lg"
                >
                  {isConnected ? 'Enter Arena' : 'Start Competing Free'}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
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
              <div className="w-full h-96 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Trophy & Competition Illustration */}
                <svg viewBox="0 0 400 400" className="w-full h-full max-w-md max-h-md">
                  {/* Background Elements */}
                  <defs>
                    <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#10B981', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
                    </linearGradient>
                    <linearGradient id="podiumGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: '#34D399', stopOpacity: 0.3}} />
                      <stop offset="100%" style={{stopColor: '#10B981', stopOpacity: 0.1}} />
                    </linearGradient>
                  </defs>
                  
                  {/* Podium 1st Place (Center - Tallest) */}
                  <rect x="165" y="240" width="70" height="120" fill="url(#podiumGradient)" stroke="#10B981" strokeWidth="2" rx="4"/>
                  <text x="200" y="270" fontSize="16" fontWeight="bold" textAnchor="middle" fill="#059669">1st</text>
                  <circle cx="200" cy="200" r="20" fill="url(#trophyGradient)" stroke="#10B981" strokeWidth="2"/>
                  <path d="M 200 175 L 200 165 M 190 170 L 210 170 M 195 165 L 205 165" stroke="#10B981" strokeWidth="2" fill="none"/>
                  
                  {/* Podium 2nd Place (Right) */}
                  <rect x="260" y="280" width="70" height="80" fill="url(#podiumGradient)" stroke="#34D399" strokeWidth="2" rx="4"/>
                  <text x="295" y="305" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#059669">2nd</text>
                  <circle cx="295" cy="250" r="16" fill="#34D399" stroke="#10B981" strokeWidth="1.5" opacity="0.8"/>
                  
                  {/* Podium 3rd Place (Left) */}
                  <rect x="70" y="300" width="70" height="60" fill="url(#podiumGradient)" stroke="#34D399" strokeWidth="2" rx="4"/>
                  <text x="105" y="320" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#059669">3rd</text>
                  <circle cx="105" cy="270" r="14" fill="#34D399" stroke="#10B981" strokeWidth="1.5" opacity="0.8"/>
                  
                  {/* Rising Stars/Participants Indicators */}
                  <g opacity="0.6">
                    <circle cx="100" cy="120" r="8" fill="#10B981"/>
                    <line x1="100" y1="128" x2="100" y2="160" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
                  </g>
                  <g opacity="0.6">
                    <circle cx="300" cy="140" r="8" fill="#10B981"/>
                    <line x1="300" y1="148" x2="300" y2="180" stroke="#10B981" strokeWidth="2" strokeDasharray="3,3"/>
                  </g>
                  
                  {/* Upward Arrow showing growth */}
                  <g>
                    <line x1="50" y1="200" x2="350" y2="200" stroke="#E5E7EB" strokeWidth="1" opacity="0.3"/>
                    <path d="M 60 280 L 100 240 L 140 180 L 200 120 L 260 160 L 320 100" stroke="#10B981" strokeWidth="3" fill="none" opacity="0.5"/>
                    <polygon points="320,85 315,100 330,95" fill="#10B981" opacity="0.7"/>
                  </g>
                  
                  {/* Sparkles for dynamic feel */}
                  <g opacity="0.7">
                    <circle cx="220" cy="150" r="2" fill="#fbbf24"/>
                    <circle cx="180" cy="130" r="2" fill="#fbbf24"/>
                    <circle cx="240" cy="220" r="2" fill="#fbbf24"/>
                    <circle cx="160" cy="240" r="2" fill="#fbbf24"/>
                  </g>
                </svg>
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
                  <span className="text-xl"></span>
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
                </div>76
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

            <div className="flex justify-center">
              <Button
                onClick={handleGetStarted}
                variant="primary"
                size="lg"
                className="px-12 py-4 text-lg font-bold"
              >
                {isConnected ? 'Enter Arena Now' : 'Start Competing Free'}
              </Button>
            </div>

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

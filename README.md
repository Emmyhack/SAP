# Somnia Arena Passport - Full Stack DApp

A production-ready decentralized application (DApp) for the Somnia blockchain featuring passport minting, arena challenges, and reputation tracking.

##  Architecture

### Smart Contracts (Solidity 0.8.24)
- **SomniaPassport**: ERC-721 soulbound NFTs for passport management
- **ArenaEngine**: Challenge creation and management system
- **ReputationCore**: Reputation scoring and leaderboard system

### Frontend (React + TypeScript)
- **Home Page**: Wallet connection, passport minting, and user stats display
- **Arena Page**: Challenge listing, participation, and leaderboard
- **Web3 Integration**: Wagmi + Viem for contract interaction

##  Deployed Contracts (Somnia Testnet)

| Contract | Address |
|----------|---------|
| SomniaPassport | `0x4EA2810Ac8940336Ca3622Ce8363f61D87444dD6` |
| ArenaEngine | `0x871Ba70245D1f25BDA5eB394C56A05d576c83875` |
| ReputationCore | `0x301f106a714cD1b5524D9F9EEa6241fE4BBF14d0` |

##  Getting Started

### Prerequisites
- Node.js 18+ and npm
- Hardhat (for smart contracts)
- A Web3 wallet (MetaMask, etc.)

### Backend Setup (Smart Contracts)
```bash
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network somnia-testnet
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev          # Start development server (http://localhost:5173)
npm run build        # Build for production
npm run preview      # Preview production build
```

##  Configuration

### Network Configuration
The project is configured for **Somnia Testnet**:
- Chain ID: `50312`
- RPC URL: `https://dream-rpc.somnia.network`
- Explorer: `https://testnet-explorer.somnia.network`

### Environment Variables
Create a `.env.local` file in the frontend directory:
```env
VITE_SOMNIA_TESTNET_RPC_URL=https://dream-rpc.somnia.network
VITE_SOMNIA_TESTNET_CHAIN_ID=50312
VITE_SOMNIA_TESTNET_EXPLORER_URL=https://testnet-explorer.somnia.network
```

##  Features

### Home Page
- ✅ Wallet connection/disconnection
- ✅ Passport minting (if user doesn't have one)
- ✅ User stats display (reputation, arena points, wins, participation)
- ✅ Rank display

### Arena Page
- ✅ Challenge listing with difficulty levels
- ✅ Challenge entry system
- ✅ Live leaderboard (top 10 users)
- ✅ Challenge details modal
- ✅ Responsive design

##  Testing

### Smart Contracts
```bash
# Run all tests (98 total tests)
npx hardhat test

# Run with gas reporting
REPORT_GAS=true npx hardhat test
```

**Test Coverage:**
- SomniaPassport: 29 tests (minting, burning, querying)
- ArenaEngine: 45 tests (challenges, scoring, participation)
- ReputationCore: 24 tests (reputation calculation, ranking)

##  Project Structure

```
├── contracts/              # Smart contracts (Solidity)
│   ├── SomniaPassport.sol
│   ├── ArenaEngine.sol
│   └── ReputationCore.sol
├── test/                   # Contract tests
├── scripts/                # Deployment scripts
├── frontend/               # React TypeScript frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks (Web3)
│   │   ├── config/         # Configuration (wagmi, contracts)
│   │   └── App.tsx         # Root component
│   └── public/             # Static assets
└── README.md
```

##  Key Technologies

### Backend
- **Solidity** 0.8.24 - Smart contract language
- **OpenZeppelin** 4.9.3 - Security libraries
- **Hardhat** 2.22.2 - Development framework
- **Ethers.js** v6 - Web3 library

### Frontend
- **React** 19.2.0 - UI framework
- **TypeScript** - Type safety
- **Vite** 8.0 - Build tool
- **Wagmi** 3.5.0 - Wallet/contract hooks
- **Viem** 2.46.2 - Ethereum utilities
- **Tailwind CSS** 3 - Styling
- **TanStack Query** 5 - Data fetching

##  Security Features

### Smart Contracts
- ✅ Nonreentrancy guards (OpenZeppelin)
- ✅ Checks-Effects-Interactions pattern
- ✅ Access control mechanisms
- ✅ Safe math operations
- ✅ Comprehensive test coverage

### Frontend
- ✅ No sensitive data in client code
- ✅ .env variables for secrets
- ✅ Safe contract interaction patterns
- ✅ User input validation

##  Usage

### Mint a Passport
1. Connect your wallet on the Home page
2. Click "Mint Passport" button
3. Confirm transaction in your wallet
4. Your passport will be displayed

### Enter a Challenge
1. Navigate to Arena page
2. Select a challenge from the list
3. Click "Join Challenge"
4. Complete the challenge (off-chain)
5. Earn reputation points

### View Leaderboard
- Open Arena page
- See top 10 users ranked by score
- Highlight shows your position

##  Deployment

The project includes a complete deployment script that:
1. Deploys all three contracts in the correct order
2. Updates `.env` with deployed contract addresses
3. Logs deployment details
4. Verifies contract deployment

```bash
npx hardhat run scripts/deploy.js --network somnia-testnet
```

##  License

MIT License - See LICENSE file for details

##  Contributing

Contributions welcome! Please follow conventional commits and add tests for new features.

##  Support

For issues or questions, please open a GitHub issue or check the documentation.



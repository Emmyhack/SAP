import { createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';

// Somnia Testnet Configuration
export const somniaChain = {
  id: 50312,
  name: 'Somnia Testnet',
  network: 'somnia-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Somnia',
    symbol: 'SMN',
  },
  rpcUrls: {
    default: {
      http: ['https://dream-rpc.somnia.network'],
    },
    public: {
      http: ['https://dream-rpc.somnia.network'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Blockscout',
      url: 'https://testnet-explorer.somnia.network',
    },
  },
} as any;

export const config = createConfig({
  chains: [somniaChain, mainnet, sepolia],
  transports: {
    [somniaChain.id]: http('https://dream-rpc.somnia.network'),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

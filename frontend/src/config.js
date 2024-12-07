import { http, createConfig } from 'wagmi'
import { baseSepolia, polygonAmoy, bscTestnet } from 'wagmi/chains'
import { metaMask } from 'wagmi/connectors'
import { coinbaseWallet } from 'wagmi/connectors';

export const config = createConfig({
  chains: [baseSepolia, polygonAmoy, bscTestnet],
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: 'onchainkit',
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [bscTestnet.id]: http(),
  },
})
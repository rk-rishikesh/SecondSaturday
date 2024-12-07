import {defineChain} from 'viem';

export const supra = defineChain({
  id: 231, // Replace this with your chain's ID
  name: 'Supra EVM',
  network: 'supra-evm',
  rpcUrls: {
    default: {
      http: ['https://rpc-evmstaging.supra.com/rpc/v1/eth'],
    },
  },
});

export const bnb = defineChain({
  id: 97,
  name: 'BNB Smart Chain Testnet',
  network: 'tBNB',
  rpcUrls: {
    default: {
      http: ['https://api.zan.top/bsc-testnet'],
      webSocket: ['wss://bsc-testnet-rpc.publicnode.com'],
    },
  },
});

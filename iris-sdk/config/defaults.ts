// config/defaults.ts

/**
 * Default configuration values for the IRIS SDK.
 * Can be overridden by user-provided config or environment variables.
 */
export const DEFAULT_CONFIG = {
  rpcUrl: "https://evmrpc-testnet.0g.ai",           // Default Base testnet RPC
  indexerRpcUrl: "https://indexer-storage-testnet-turbo.0g.ai", // Default 0G Indexer
  storageUrl: "https://storage-testnet.0g.ai",     // Optional 0G storage gateway
  chainId: 84531,                                   // Default Base testnet chain ID
};

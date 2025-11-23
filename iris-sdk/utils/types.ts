// types.ts

/**
 * Global configuration for IrisClient
 */
export type IrisConfig = {
  privateKey: string;

  // Where metadata & identity packets get pinned
  rpcUrl?: string;            // EVM RPC (e.g. Base, 0G EVM)
  indexerRpcUrl?: string;     // 0G Indexer

  // Optional chain-level registry interactions
  agentRegistryAddress?: string;

  // Optional: x402 integration
  x402ApiKey?: string;
  x402Endpoint?: string;
};

/**
 * Raw agent metadata (unsigned)
 * This is what the agent creator provides.
 */
export type AgentMetadata = {
  name: string;
  version: string;
  description?: string;
  capabilities: string[];
  modelType?: string;         // GPT, Llama, Proprietary
  categories?: string[];      // For marketplace filters
  website?: string;
  image?: string;             // Agent avatar
  webhook?: string;           // If the agent is Web2-executable

  // Custom extensions allowed
  [key: string]: any;
};

/**
 * IRIS Identity Packet
 * This is what is signed and uploaded to 0G Storage.
 */
export type IdentityPacket = {
  metadata: AgentMetadata;
  creator: string;        // Wallet address of agent creator
  timestamp: number;      // ms
  signature: string;      // EIP-191 signature
  agentId: string;        // Deterministic hash of metadata
};

/**
 * Response after uploading an identity packet to 0G Storage.
 */
export type StorageUploadResult = {
  rootHash: string;
  txHash: string;
  url: string;            // Download URL for the identity packet
};

/**
 * A registered onchain agent (read from registry)
 */
export type RegisteredAgent = {
  agentId: string;
  creator: string;
  metadataUrl: string;
  active: boolean;
  reputationScore?: number;
};

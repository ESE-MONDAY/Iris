/**
 * Core configuration for the IRIS SDK.
 * Used across all modules (Identity, Storage, Registry, Payments, Reputation)
 */
export type IrisConfig = {
  privateKey: string;          // Wallet private key (server-side only)
  rpcUrl: string;              // EVM RPC URL (Base testnet/mainnet)
  indexerRpcUrl: string;       // 0G Indexer RPC URL
  storageUrl?: string;         // Optional: 0G Storage write endpoint
  chainId?: number;  
  contractAddress: string;          // Optional: EVM chain ID (defaults to Base)

  // NEW: Reputation/Feedback settings
  minReputationScore?: number;     // Minimum score before suspension (default 50)
  autoReputationCheck?: boolean;   // Enable automatic suspension via keeper
};

/**
 * Metadata describing an agent.
 * Flexible fields to allow custom capabilities.
 */
export type AgentMetadata = {
  name: string;
  version: string;
  description?: string;
  capabilities: string[];
  [key: string]: any; // custom fields
};

/**
 * Signed identity packet for the agent.
 * Uploaded to 0G and optionally registered on-chain.
 */
export type IdentityPacket = {
  agentId: string;             // keccak256 hash of canonicalized metadata
  metadata: AgentMetadata;     // Agent metadata
  creator: string;             // Wallet address that created it
  timestamp: number;           // milliseconds since epoch
  signature: string;           // EIP-191 signature
};

/**
 * Feedback submitted by users about an agent
 */
export type Feedback = {
  agentId: string;        // ID of the agent being reviewed
  reviewer: string;       // Wallet address of the reviewer
  score: number;          // 0–100
  comment?: string;       // Optional text feedback
  timestamp: number;      // milliseconds since epoch
};

/**
 * Reputation object for an agent
 */
export type Reputation = {
  agentId: string;
  score: number;         // 0–100
  lastUpdated: number;   // milliseconds since epoch
};


// types/irisRegistry.ts
import { BaseContract, ContractTransaction } from "ethers";

export interface IRISRegistryContract extends BaseContract {
  
  registerAgent(name: string, metadataURI: string): Promise<ContractTransaction>;
  getAgent(agentId: number): Promise<{ name: string; metadataURI: string; exists: boolean }>;
  nextAgentId(): Promise<bigint>;
}

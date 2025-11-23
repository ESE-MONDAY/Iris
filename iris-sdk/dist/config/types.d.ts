/**
 * Core configuration for the IRIS SDK.
 * Used across all modules (Identity, Storage, Registry, Payments, Reputation)
 */
export type IrisConfig = {
    privateKey: string;
    rpcUrl: string;
    indexerRpcUrl: string;
    storageUrl?: string;
    chainId?: number;
    contractAddress: string;
    minReputationScore?: number;
    autoReputationCheck?: boolean;
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
    [key: string]: any;
};
/**
 * Signed identity packet for the agent.
 * Uploaded to 0G and optionally registered on-chain.
 */
export type IdentityPacket = {
    agentId: string;
    metadata: AgentMetadata;
    creator: string;
    timestamp: number;
    signature: string;
};
/**
 * Feedback submitted by users about an agent
 */
export type Feedback = {
    agentId: string;
    reviewer: string;
    score: number;
    comment?: string;
    timestamp: number;
};
/**
 * Reputation object for an agent
 */
export type Reputation = {
    agentId: string;
    score: number;
    lastUpdated: number;
};
import { BaseContract, ContractTransaction } from "ethers";
export interface IRISRegistryContract extends BaseContract {
    registerAgent(name: string, metadataURI: string): Promise<ContractTransaction>;
    getAgent(agentId: number): Promise<{
        name: string;
        metadataURI: string;
        exists: boolean;
    }>;
    nextAgentId(): Promise<bigint>;
}

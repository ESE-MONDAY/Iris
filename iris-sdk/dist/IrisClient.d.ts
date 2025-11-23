import { IdentityModule } from "./modules/identity/identity";
import { StorageModule } from "./modules/storage/storage";
import { IRISRegistryModule } from "./modules/registry/registry";
import type { AgentMetadata } from "./config/types";
import { JsonRpcProvider } from "ethers";
export declare class IRISClient {
    identity: IdentityModule;
    storage: StorageModule;
    registry: IRISRegistryModule;
    provider: JsonRpcProvider;
    constructor(config: {
        privateKey: string;
        baseRpcUrl: string;
        storageRpcUrl: string;
        contractAddress: string;
        chainId?: number;
        indexerRpcUrl?: string;
    });
    registerAgent(name: string, metadata: AgentMetadata): Promise<{
        identity: import("./config/types").IdentityPacket;
        storageResult: {
            dataHash: any;
            txHash: any;
            downloadUrl: string;
        };
        tx: import("ethers").ContractTransaction;
    }>;
    getAgent(agentId: number): Promise<import("./modules/registry/registry").Agent>;
    nextAgentId(): Promise<bigint>;
    uploadReview(review: {
        score: number;
        comment: string;
        reviewer: string;
    }): Promise<{
        dataHash: any;
        txHash: any;
        downloadUrl: string;
    }>;
}

import { Wallet, JsonRpcProvider, ContractTransaction } from "ethers";
export interface Agent {
    name: string;
    metadataURI: string;
    exists: boolean;
}
export interface RegistryModuleParams {
    wallet?: Wallet;
    provider: JsonRpcProvider;
    contractAddress: string;
}
export declare class IRISRegistryModule {
    private contract;
    private wallet?;
    constructor(params: RegistryModuleParams);
    /** Register a new AI agent */
    registerAgent(name: string, metadataURI: string): Promise<ContractTransaction>;
    /** Fetch agent info */
    getAgent(agentId: number): Promise<Agent>;
    /** Get next available agent ID */
    nextAgentId(): Promise<bigint>;
}

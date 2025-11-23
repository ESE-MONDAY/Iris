type IrisConfig = {
    privateKey: string;
    rpcUrl?: string;
    indexerRpcUrl?: string;
};
type AgentMetadata = {
    name: string;
    version: string;
    description?: string;
    capabilities: string[];
    [key: string]: any;
};
type IdentityPacket = {
    metadata: AgentMetadata;
    creator: string;
    signature: string;
    timestamp: number;
};

declare class StorageModule {
    private indexer;
    private signer;
    private evmRpcUrl;
    constructor(config: IrisConfig);
    /**
     * Low-level upload: Uploads a file from disk
     */
    private uploadFile;
    /**
     * Helper: Writes JSON to a temp file, uploads it, then deletes the file.
     */
    uploadJSON(data: unknown): Promise<{
        rootHash: string | null | undefined;
        txHash: {
            txHash: string;
            rootHash: string;
        };
        url: string;
    }>;
}

declare class IdentityModule {
    private signer;
    constructor(privateKey: string);
    /**
     * Creates a cryptographically signed packet for the agent.
     */
    createPacket(metadata: AgentMetadata): Promise<IdentityPacket>;
    /**
     * Verifies if an Identity Packet is authentic.
     */
    verifyPacket(packet: IdentityPacket): boolean;
}

declare class IrisClient {
    storage: StorageModule;
    identity: IdentityModule;
    constructor(config: IrisConfig);
    /**
     * Register Agent: Signs the metadata -> Uploads to 0G
     */
    registerAgent(metadata: AgentMetadata): Promise<{
        packet: IdentityPacket;
        rootHash: string | null | undefined;
        txHash: {
            txHash: string;
            rootHash: string;
        };
        url: string;
    }>;
}

export { IrisClient };

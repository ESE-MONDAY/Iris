import type { AgentMetadata, IdentityPacket } from "../../config/types";
export declare class IdentityModule {
    private signer;
    constructor(privateKey: string);
    /**
     * Creates a cryptographically signed packet for the agent
     */
    createPacket(metadata: AgentMetadata): Promise<IdentityPacket>;
    /**
     * Verifies if an Identity Packet is authentic
     */
    verifyPacket(packet: IdentityPacket): boolean;
    /**
     * Compute deterministic agentId from metadata
     */
    computeAgentId(metadata: AgentMetadata): string;
}

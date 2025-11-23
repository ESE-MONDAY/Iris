"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityModule = void 0;
// modules/identity/identity.ts
const ethers_1 = require("ethers");
class IdentityModule {
    constructor(privateKey) {
        this.signer = new ethers_1.Wallet(privateKey);
    }
    /**
     * Creates a cryptographically signed packet for the agent
     */
    async createPacket(metadata) {
        const creator = await this.signer.getAddress();
        const timestamp = Date.now();
        // Payload includes metadata + timestamp + creator
        const payload = { metadata, timestamp, creator };
        const message = JSON.stringify(payload);
        const signature = await this.signer.signMessage(message);
        // Compute deterministic agentId
        const agentId = (0, ethers_1.keccak256)((0, ethers_1.toUtf8Bytes)(JSON.stringify(metadata)));
        return {
            agentId,
            metadata,
            creator,
            timestamp,
            signature,
        };
    }
    /**
     * Verifies if an Identity Packet is authentic
     */
    verifyPacket(packet) {
        try {
            const payload = {
                metadata: packet.metadata,
                timestamp: packet.timestamp,
                creator: packet.creator,
            };
            const recovered = (0, ethers_1.verifyMessage)(JSON.stringify(payload), packet.signature);
            return recovered === packet.creator;
        }
        catch {
            return false;
        }
    }
    /**
     * Compute deterministic agentId from metadata
     */
    computeAgentId(metadata) {
        return (0, ethers_1.keccak256)((0, ethers_1.toUtf8Bytes)(JSON.stringify(metadata)));
    }
}
exports.IdentityModule = IdentityModule;

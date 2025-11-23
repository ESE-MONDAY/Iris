"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRISClient = void 0;
// modules/client/client.ts
const identity_1 = require("./modules/identity/identity");
const storage_1 = require("./modules/storage/storage");
const registry_1 = require("./modules/registry/registry");
const ethers_1 = require("ethers");
class IRISClient {
    constructor(config) {
        // -----------------------------
        // 1️⃣ Identity module
        // -----------------------------
        this.identity = new identity_1.IdentityModule(config.privateKey);
        // -----------------------------
        // 2️⃣ Storage module
        // -----------------------------
        this.storage = new storage_1.StorageModule({
            privateKey: config.privateKey,
            rpcUrl: config.storageRpcUrl,
            indexerRpcUrl: config.indexerRpcUrl || "https://indexer-storage-testnet-turbo.0g.ai",
            contractAddress: config.contractAddress,
            chainId: config.chainId,
        });
        // -----------------------------
        // 3️⃣ Base provider & wallet
        // -----------------------------
        this.provider = new ethers_1.JsonRpcProvider(config.baseRpcUrl, config.chainId);
        const wallet = new ethers_1.Wallet(config.privateKey, this.provider);
        // -----------------------------
        // 4️⃣ Registry module
        // -----------------------------
        this.registry = new registry_1.IRISRegistryModule({
            wallet,
            provider: this.provider,
            contractAddress: config.contractAddress,
        });
    }
    // ---------------------------------------------------------------
    // Full agent registration: Identity → Storage → Registry
    // ---------------------------------------------------------------
    async registerAgent(name, metadata) {
        // 1️⃣ Create identity packet
        const identity = await this.identity.createPacket(metadata);
        // 2️⃣ Upload identity to 0G
        const storageResult = await this.storage.uploadJSON(identity);
        // 3️⃣ Register agent on-chain (Base)
        const tx = await this.registry.registerAgent(name, storageResult.dataHash);
        return { identity, storageResult, tx };
    }
    // ---------------------------------------------------------------
    // Fetch agent info from registry
    // ---------------------------------------------------------------
    async getAgent(agentId) {
        return this.registry.getAgent(agentId);
    }
    // ---------------------------------------------------------------
    // Get next agent ID
    // ---------------------------------------------------------------
    async nextAgentId() {
        return this.registry.nextAgentId();
    }
    // ---------------------------------------------------------------
    // Upload a review to 0G (off-chain)
    // ---------------------------------------------------------------
    async uploadReview(review) {
        return this.storage.uploadReview(review);
    }
}
exports.IRISClient = IRISClient;

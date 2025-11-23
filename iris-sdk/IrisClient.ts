// modules/client/client.ts
import { IdentityModule } from "./modules/identity/identity";
import { StorageModule } from "./modules/storage/storage";
import { IRISRegistryModule } from "./modules/registry/registry";
import type { IrisConfig, AgentMetadata } from "./config/types";
import { Wallet, JsonRpcProvider } from "ethers";

export class IRISClient {
  public identity: IdentityModule;
  public storage: StorageModule;
  public registry: IRISRegistryModule;
  public provider: JsonRpcProvider;

  constructor(config: {
    privateKey: string;
    baseRpcUrl: string;          // Registry RPC (Base chain)
    storageRpcUrl: string;       // 0G Storage RPC
    contractAddress: string;     // Registry contract
    chainId?: number;
    indexerRpcUrl?: string;
  }) {
    // -----------------------------
    // 1️⃣ Identity module
    // -----------------------------
    this.identity = new IdentityModule(config.privateKey);

    // -----------------------------
    // 2️⃣ Storage module
    // -----------------------------
    this.storage = new StorageModule({
      privateKey: config.privateKey,
      rpcUrl: config.storageRpcUrl,
      indexerRpcUrl: config.indexerRpcUrl || "https://indexer-storage-testnet-turbo.0g.ai",
      contractAddress: config.contractAddress,
      chainId: config.chainId,
    });

    // -----------------------------
    // 3️⃣ Base provider & wallet
    // -----------------------------
    this.provider = new JsonRpcProvider(config.baseRpcUrl, config.chainId);
    const wallet = new Wallet(config.privateKey, this.provider);

    // -----------------------------
    // 4️⃣ Registry module
    // -----------------------------
    this.registry = new IRISRegistryModule({
      wallet,
      provider: this.provider,
      contractAddress: config.contractAddress,
    });
  }

  // ---------------------------------------------------------------
  // Full agent registration: Identity → Storage → Registry
  // ---------------------------------------------------------------
  async registerAgent(name: string, metadata: AgentMetadata) {
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
  async getAgent(agentId: number) {
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
  async uploadReview(review: { score: number; comment: string; reviewer: string }) {
    return this.storage.uploadReview(review);
  }
}

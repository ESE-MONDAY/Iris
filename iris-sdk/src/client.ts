import { StorageModule } from "./modules/storage";
import { IdentityModule } from "./modules/identity";
import { IrisConfig, AgentMetadata } from "../utils/types";

export class IrisClient {
  public storage: StorageModule;
  public identity: IdentityModule;

  constructor(config: IrisConfig) {
    this.storage = new StorageModule(config);
    this.identity = new IdentityModule(config.privateKey);
  }

  /**
   * Register Agent: Signs the metadata -> Uploads to 0G
   */
  async registerAgent(metadata: AgentMetadata) {
    console.log("1. Signing Identity Packet...");
    const packet = await this.identity.createPacket(metadata);

    console.log("2. Uploading to 0G Storage...");
    const result = await this.storage.uploadJSON(packet);

    return {
      ...result,
      packet // Returns the full signed packet
    };
  }
}
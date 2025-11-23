// modules/identity/identity.ts
import { Wallet, verifyMessage, keccak256, toUtf8Bytes } from "ethers";
import type { AgentMetadata, IdentityPacket } from "../../config/types";

export class IdentityModule {
  private signer: Wallet;

  constructor(privateKey: string) {
    this.signer = new Wallet(privateKey);
  }

  /**
   * Creates a cryptographically signed packet for the agent
   */
  async createPacket(metadata: AgentMetadata): Promise<IdentityPacket> {
    const creator = await this.signer.getAddress();
    const timestamp = Date.now();

    // Payload includes metadata + timestamp + creator
    const payload = { metadata, timestamp, creator };
    const message = JSON.stringify(payload);

    const signature = await this.signer.signMessage(message);

    // Compute deterministic agentId
    const agentId = keccak256(toUtf8Bytes(JSON.stringify(metadata)));

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
  verifyPacket(packet: IdentityPacket): boolean {
    try {
      const payload = {
        metadata: packet.metadata,
        timestamp: packet.timestamp,
        creator: packet.creator,
      };

      const recovered = verifyMessage(JSON.stringify(payload), packet.signature);
      return recovered === packet.creator;
    } catch {
      return false;
    }
  }

  /**
   * Compute deterministic agentId from metadata
   */
  computeAgentId(metadata: AgentMetadata): string {
    return keccak256(toUtf8Bytes(JSON.stringify(metadata)));
  }
}

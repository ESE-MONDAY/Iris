import { Wallet, verifyMessage } from "ethers";
import { AgentMetadata, IdentityPacket } from "../../utils/types";

export class IdentityModule {
  private signer: Wallet;

  constructor(privateKey: string) {
    this.signer = new Wallet(privateKey);
  }

  /**
   * Creates a cryptographically signed packet for the agent.
   */
  async createPacket(metadata: AgentMetadata): Promise<IdentityPacket> {
    const address = await this.signer.getAddress();
    const timestamp = Date.now();

    // We sign the combination of metadata + timestamp + creator
    // This ensures the signature is unique to this specific event and author
    const payload = {
      metadata,
      timestamp,
      creator: address
    };

    // Sign the stringified payload (EIP-191 standard)
    const messageString = JSON.stringify(payload);
    const signature = await this.signer.signMessage(messageString);

    return {
      metadata,
      creator: address,
      timestamp,
      signature
    };
  }

  /**
   * Verifies if an Identity Packet is authentic.
   */
  verifyPacket(packet: IdentityPacket): boolean {
    try {
      const payload = {
        metadata: packet.metadata,
        timestamp: packet.timestamp,
        creator: packet.creator
      };
      
      // Recover the address that signed the message
      const recoveredAddress = verifyMessage(JSON.stringify(payload), packet.signature);
      
      // It is valid if the signer matches the declared creator
      return recoveredAddress === packet.creator;
    } catch (e) {
      return false;
    }
  }
}
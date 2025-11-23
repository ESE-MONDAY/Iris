// src/modules/storage.ts
import { ZgFile, Indexer } from "@0glabs/0g-ts-sdk";
import { Wallet, JsonRpcProvider } from "ethers";
import * as fs from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
var StorageModule = class {
  constructor(config) {
    this.evmRpcUrl = config.rpcUrl || "https://evmrpc-testnet.0g.ai";
    const provider = new JsonRpcProvider(this.evmRpcUrl);
    this.signer = new Wallet(config.privateKey, provider);
    const indexerUrl = config.indexerRpcUrl || "https://indexer-storage-testnet-standard.0g.ai";
    this.indexer = new Indexer(indexerUrl);
  }
  /**
   * Low-level upload: Uploads a file from disk
   */
  async uploadFile(filePath) {
    try {
      await fs.access(filePath);
    } catch {
      throw new Error(`File not found at: ${filePath}`);
    }
    let file = null;
    try {
      file = await ZgFile.fromFilePath(filePath);
      const [tree, treeErr] = await file.merkleTree();
      if (treeErr) throw new Error(`Merkle tree error: ${treeErr}`);
      const rootHash = tree?.rootHash();
      const [tx, uploadErr] = await this.indexer.upload(
        file,
        this.evmRpcUrl,
        this.signer
      );
      if (uploadErr) throw new Error(`Upload failed: ${uploadErr}`);
      return {
        rootHash,
        txHash: tx,
        url: `https://storage-testnet.0g.ai/download/${rootHash}`
      };
    } finally {
      if (file) await file.close();
    }
  }
  /**
   * Helper: Writes JSON to a temp file, uploads it, then deletes the file.
   */
  async uploadJSON(data) {
    const tempPath = join(tmpdir(), `iris-${randomUUID()}.json`);
    try {
      await fs.writeFile(tempPath, JSON.stringify(data));
      return await this.uploadFile(tempPath);
    } finally {
      try {
        await fs.unlink(tempPath);
      } catch {
      }
    }
  }
};

// src/modules/identity.ts
import { Wallet as Wallet2, verifyMessage } from "ethers";
var IdentityModule = class {
  constructor(privateKey) {
    this.signer = new Wallet2(privateKey);
  }
  /**
   * Creates a cryptographically signed packet for the agent.
   */
  async createPacket(metadata) {
    const address = await this.signer.getAddress();
    const timestamp = Date.now();
    const payload = {
      metadata,
      timestamp,
      creator: address
    };
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
  verifyPacket(packet) {
    try {
      const payload = {
        metadata: packet.metadata,
        timestamp: packet.timestamp,
        creator: packet.creator
      };
      const recoveredAddress = verifyMessage(JSON.stringify(payload), packet.signature);
      return recoveredAddress === packet.creator;
    } catch (e) {
      return false;
    }
  }
};

// src/client.ts
var IrisClient = class {
  constructor(config) {
    this.storage = new StorageModule(config);
    this.identity = new IdentityModule(config.privateKey);
  }
  /**
   * Register Agent: Signs the metadata -> Uploads to 0G
   */
  async registerAgent(metadata) {
    console.log("1. Signing Identity Packet...");
    const packet = await this.identity.createPacket(metadata);
    console.log("2. Uploading to 0G Storage...");
    const result = await this.storage.uploadJSON(packet);
    return {
      ...result,
      packet
      // Returns the full signed packet
    };
  }
};
export {
  IrisClient
};

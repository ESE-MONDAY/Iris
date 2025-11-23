// modules/storage/storage.ts
import { ZgFile, Indexer } from "@0glabs/0g-ts-sdk";
import { Wallet, JsonRpcProvider } from "ethers";
import * as fs from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import type { IrisConfig } from "../../config/types";

/**
 * StorageModule
 * - Uploads files or JSON objects to 0G Storage
 * - Returns dataHash, txHash, downloadUrl
 */
export class StorageModule {
  private indexer: Indexer;
  private signer: Wallet;
  private rpcUrl: string;

  constructor(config: IrisConfig) {
    this.rpcUrl = config.rpcUrl || "https://evmrpc-testnet.0g.ai";

    const provider = new JsonRpcProvider(this.rpcUrl);
    this.signer = new Wallet(config.privateKey, provider);

    const indexerUrl =
      config.indexerRpcUrl || "https://indexer-storage-testnet-turbo.0g.ai";
    this.indexer = new Indexer(indexerUrl);
  }

  /** Upload a JSON object to 0G */
  async uploadJSON(data: unknown) {
    const tempPath = join(tmpdir(), `iris-${randomUUID()}.json`);

    try {
      await fs.writeFile(tempPath, JSON.stringify(data));
      return await this.uploadFile(tempPath);
    } finally {
      try {
        await fs.unlink(tempPath);
      } catch {}
    }
  }

  /** Upload a review object (score, comment, reviewer) */
  async uploadReview(review: { score: number; comment: string; reviewer: string }) {
    return this.uploadJSON({
      ...review,
      createdAt: Date.now(),
    });
  }

  /** Low-level file upload */
  private async uploadFile(filePath: string) {
    let file: ZgFile | null = null;

    try {
      await fs.access(filePath);
      file = await ZgFile.fromFilePath(filePath);

      const [tree, treeErr] = await file.merkleTree();
      if (treeErr) throw new Error(`Merkle tree error: ${treeErr}`);

      const dataHash = tree?.rootHash();
      if (!dataHash) throw new Error("Unable to compute dataHash");

      const [txHash, uploadErr] = await this.indexer.upload(file, this.rpcUrl, this.signer as any);
      if (uploadErr) throw new Error(`Upload failed: ${uploadErr}`);

      return {
        dataHash,
        txHash,
        downloadUrl: `https://storage-testnet.0g.ai/download/${dataHash}`,
      };
    } finally {
      if (file) await file.close();
    }
  }
}

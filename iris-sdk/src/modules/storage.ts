import { ZgFile, Indexer } from '@0glabs/0g-ts-sdk';
import { Wallet, JsonRpcProvider } from "ethers";
import * as fs from "fs/promises";
import { join } from "path";
import { tmpdir } from "os";
import { randomUUID } from "crypto";
import {IrisConfig} from "../../utils/types";

export class StorageModule {
  private indexer: Indexer;
  private signer: Wallet;
  private evmRpcUrl: string;

  constructor(config: IrisConfig) {
    this.evmRpcUrl = config.rpcUrl || "https://evmrpc-testnet.0g.ai";
    const provider = new JsonRpcProvider(this.evmRpcUrl);
    this.signer = new Wallet(config.privateKey, provider);
    
    const indexerUrl = config.indexerRpcUrl || "https://indexer-storage-testnet-turbo.0g.ai";
    this.indexer = new Indexer(indexerUrl);
  }

  /**
   * Low-level upload: Uploads a file from disk
   */
  private async uploadFile(filePath: string) {
    try {
      await fs.access(filePath);
    } catch {
      throw new Error(`File not found at: ${filePath}`);
    }

    let file: ZgFile | null = null;

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
  async uploadJSON(data: unknown) {
    const tempPath = join(tmpdir(), `iris-${randomUUID()}.json`);
    try {
      await fs.writeFile(tempPath, JSON.stringify(data));
      return await this.uploadFile(tempPath);
    } finally {
      // Cleanup temp file
      try { await fs.unlink(tempPath); } catch {}
    }
  }
}
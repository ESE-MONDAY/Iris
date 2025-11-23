"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client.ts
var client_exports = {};
__export(client_exports, {
  IrisClient: () => IrisClient
});
module.exports = __toCommonJS(client_exports);

// src/modules/storage.ts
var import_g_ts_sdk = require("@0glabs/0g-ts-sdk");
var import_ethers = require("ethers");
var fs = __toESM(require("fs/promises"));
var import_path = require("path");
var import_os = require("os");
var import_crypto = require("crypto");
var StorageModule = class {
  constructor(config) {
    this.evmRpcUrl = config.rpcUrl || "https://evmrpc-testnet.0g.ai";
    const provider = new import_ethers.JsonRpcProvider(this.evmRpcUrl);
    this.signer = new import_ethers.Wallet(config.privateKey, provider);
    const indexerUrl = config.indexerRpcUrl || "https://indexer-storage-testnet-standard.0g.ai";
    this.indexer = new import_g_ts_sdk.Indexer(indexerUrl);
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
      file = await import_g_ts_sdk.ZgFile.fromFilePath(filePath);
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
    const tempPath = (0, import_path.join)((0, import_os.tmpdir)(), `iris-${(0, import_crypto.randomUUID)()}.json`);
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
var import_ethers2 = require("ethers");
var IdentityModule = class {
  constructor(privateKey) {
    this.signer = new import_ethers2.Wallet(privateKey);
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
      const recoveredAddress = (0, import_ethers2.verifyMessage)(JSON.stringify(payload), packet.signature);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IrisClient
});

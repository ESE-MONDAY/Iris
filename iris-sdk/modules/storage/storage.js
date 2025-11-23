"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageModule = void 0;
// modules/storage/storage.ts
const _0g_ts_sdk_1 = require("@0glabs/0g-ts-sdk");
const ethers_1 = require("ethers");
const fs = __importStar(require("fs/promises"));
const path_1 = require("path");
const os_1 = require("os");
const crypto_1 = require("crypto");
/**
 * StorageModule
 * - Uploads files or JSON objects to 0G Storage
 * - Returns dataHash, txHash, downloadUrl
 */
class StorageModule {
    constructor(config) {
        this.rpcUrl = config.rpcUrl || "https://evmrpc-testnet.0g.ai";
        const provider = new ethers_1.JsonRpcProvider(this.rpcUrl);
        this.signer = new ethers_1.Wallet(config.privateKey, provider);
        const indexerUrl = config.indexerRpcUrl || "https://indexer-storage-testnet-turbo.0g.ai";
        this.indexer = new _0g_ts_sdk_1.Indexer(indexerUrl);
    }
    /** Upload a JSON object to 0G */
    async uploadJSON(data) {
        const tempPath = (0, path_1.join)((0, os_1.tmpdir)(), `iris-${(0, crypto_1.randomUUID)()}.json`);
        try {
            await fs.writeFile(tempPath, JSON.stringify(data));
            return await this.uploadFile(tempPath);
        }
        finally {
            try {
                await fs.unlink(tempPath);
            }
            catch { }
        }
    }
    /** Upload a review object (score, comment, reviewer) */
    async uploadReview(review) {
        return this.uploadJSON({
            ...review,
            createdAt: Date.now(),
        });
    }
    /** Low-level file upload */
    async uploadFile(filePath) {
        let file = null;
        try {
            await fs.access(filePath);
            file = await _0g_ts_sdk_1.ZgFile.fromFilePath(filePath);
            const [tree, treeErr] = await file.merkleTree();
            if (treeErr)
                throw new Error(`Merkle tree error: ${treeErr}`);
            const dataHash = tree?.rootHash();
            if (!dataHash)
                throw new Error("Unable to compute dataHash");
            const [txHash, uploadErr] = await this.indexer.upload(file, this.rpcUrl, this.signer);
            if (uploadErr)
                throw new Error(`Upload failed: ${uploadErr}`);
            return {
                dataHash,
                txHash,
                downloadUrl: `https://storage-testnet.0g.ai/download/${dataHash}`,
            };
        }
        finally {
            if (file)
                await file.close();
        }
    }
}
exports.StorageModule = StorageModule;

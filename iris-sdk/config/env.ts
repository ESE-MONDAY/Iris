// config/env.ts
import { DEFAULT_CONFIG } from "./defaults";
import type { IrisConfig } from "./types";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

/**
 * Loads environment variables and merges them with defaults.
 * Throws if required variables are missing.
 */
export function loadConfig(): IrisConfig {
  const privateKey = process.env.IRIS_PRIVATE_KEY;
  if (!privateKey) throw new Error("IRIS_PRIVATE_KEY is required in .env");

  return {
    privateKey,
    rpcUrl: process.env.IRIS_RPC_URL || DEFAULT_CONFIG.rpcUrl,
    indexerRpcUrl: process.env.IRIS_INDEXER_RPC_URL || DEFAULT_CONFIG.indexerRpcUrl,
    storageUrl: process.env.IRIS_STORAGE_URL || DEFAULT_CONFIG.storageUrl,
    chainId: process.env.IRIS_CHAIN_ID ? Number(process.env.IRIS_CHAIN_ID) : DEFAULT_CONFIG.chainId,
  };
}

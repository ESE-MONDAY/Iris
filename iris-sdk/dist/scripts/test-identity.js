"use strict";
// // scripts/test-client.ts
// import { IRISClient } from "../IrisClient";
// import * as dotenv from "dotenv";
// dotenv.config();
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
// async function main() {
//   // -----------------------------
//   // 1️⃣ Initialize client
//   // -----------------------------
//   const client = new IRISClient({
//     privateKey: process.env.PRIVATE_KEY!,
//     baseRpcUrl: process.env.BASE_RPC_URL!,
//     storageRpcUrl: process.env.STORAGE_RPC_URL!,
//     contractAddress: process.env.REGISTRY_ADDRESS!,
//     chainId: Number(process.env.CHAIN_ID!) || 84532, // Base testnet
//     indexerRpcUrl: process.env.INDEXER_URL,
//   });
//   console.log("Provider chainId:", await client.provider.getNetwork().then(n => n.chainId));
//   // -----------------------------
//   // 2️⃣ Register a new agent
//   // -----------------------------
//   const metadata = {
//     name: "GPT Agent",
//     version: "1.0",
//     description: "Test AI agent",
//     capabilities: ["chat", "code"],
//   };
//   console.log("Registering new agent...");
//   const { tx, identity } = await client.registerAgent("GPT Agent", metadata);
//   console.log("Agent identity packet:", identity);
//   console.log("Transaction hash:", tx);
//   // -----------------------------
//   // 3️⃣ Fetch agent info
//   // -----------------------------
//   const agent = await client.getAgent(0);
//   console.log("Fetched agent:", agent);
//   // -----------------------------
//   // 4️⃣ Next agent ID
//   // -----------------------------
//   const nextId = await client.nextAgentId();
//   console.log("Next agent ID:", nextId.toString());
//   // -----------------------------
//   // 5️⃣ Upload a review
//   // -----------------------------
//   const review = {
//     score: 95,
//     comment: "Excellent agent!",
//     reviewer: identity.creator,
//   };
//   const reviewUpload = await client.uploadReview(review);
//   console.log("Uploaded review to 0G:", reviewUpload);
// }
// main()
//   .then(() => console.log("Test completed successfully"))
//   .catch((err) => console.error("Error:", err));
const IrisClient_1 = require("../IrisClient");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function main() {
    // -----------------------------
    // 1️⃣ Client configuration
    // -----------------------------
    const client = new IrisClient_1.IRISClient({
        privateKey: 'b28532f91ec11c94e377dfd28fa8214a85ff15084f52ba0c9705ee9ebb40f122',
        baseRpcUrl: "https://sepolia.base.org", // Base chain RPC
        storageRpcUrl: 'https://evmrpc-testnet.0g.ai', // 0G storage RPC
        contractAddress: '0x149Cf858cB6300b2AFDA519188E939CD42e238A0', // Registry contract on Base
    });
    // -----------------------------
    // 2️⃣ Agent metadata
    // -----------------------------
    const metadata = {
        name: "GPT Agent",
        version: "1.0",
        description: "My AI agent",
        capabilities: ["chat", "compute"],
    };
    // -----------------------------
    // 3️⃣ Register agent
    // -----------------------------
    console.log("Registering agent...");
    const { identity, storageResult, tx } = await client.registerAgent(metadata.name, metadata);
    console.log("Identity packet:", identity);
    console.log("Storage result:", storageResult);
    console.log("Registry tx hash:", tx);
    // Wait for transaction to be mined
    const receipt = await tx;
    console.log("Transaction mined in block:", receipt);
    // -----------------------------
    // 4️⃣ Fetch agent from registry
    // -----------------------------
    const agentInfo = await client.getAgent(0);
    console.log("Fetched agent info:", agentInfo);
    // -----------------------------
    // 5️⃣ Check next agent ID
    // -----------------------------
    const nextId = await client.nextAgentId();
    console.log("Next available agent ID:", nextId.toString());
}
main()
    .then(() => console.log("Test completed successfully"))
    .catch((err) => console.error("Error during test:", err));

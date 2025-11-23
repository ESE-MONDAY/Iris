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
const registry_1 = require("../modules/registry/registry");
const ethers_1 = require("ethers");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function main() {
    // -----------------------------
    // 1️⃣ Setup provider & wallet
    // -----------------------------
    const provider = new ethers_1.JsonRpcProvider("https://sepolia.base.org");
    const wallet = new ethers_1.Wallet("b28532f91ec11c94e377dfd28fa8214a85ff15084f52ba0c9705ee9ebb40f122", provider);
    // -----------------------------
    // 2️⃣ Initialize RegistryModule
    // -----------------------------
    const registry = new registry_1.IRISRegistryModule({
        wallet,
        provider,
        contractAddress: "0x149Cf858cB6300b2AFDA519188E939CD42e238A0",
    });
    // -----------------------------
    // 3️⃣ Register a new agent
    // -----------------------------
    console.log("Registering new agent...");
    console.log("Provider chainId:", (await provider.getNetwork()).chainId);
    const tx = await registry.registerAgent("GPT Agent", "zgs://QmMetadataHash");
    const receipt = await tx;
    console.log("Agent registered in tx:", receipt);
    // -----------------------------
    // 4️⃣ Fetch agent info
    // -----------------------------
    const agent = await registry.getAgent(0);
    console.log("Fetched agent:", agent);
    // -----------------------------
    // 5️⃣ Check next agent ID
    // -----------------------------
    const nextId = await registry.nextAgentId();
    console.log("Next agent ID:", nextId.toString());
}
main()
    .then(() => console.log("Test completed successfully"))
    .catch((err) => console.error("Error:", err));

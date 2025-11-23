"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRISRegistryModule = void 0;
const ethers_1 = require("ethers");
const abi_json_1 = __importDefault(require("./abi.json"));
class IRISRegistryModule {
    constructor(params) {
        this.wallet = params.wallet;
        this.contract = new ethers_1.Contract(params.contractAddress, abi_json_1.default, params.wallet || params.provider);
    }
    /** Register a new AI agent */
    async registerAgent(name, metadataURI) {
        if (!this.wallet)
            throw new Error("Wallet not initialized");
        // ✅ Correct TS-friendly call
        return this.contract.registerAgent(name, metadataURI);
    }
    /** Fetch agent info */
    async getAgent(agentId) {
        return this.contract.getAgent(agentId);
    }
    /** Get next available agent ID */
    async nextAgentId() {
        return this.contract.nextAgentId();
    }
}
exports.IRISRegistryModule = IRISRegistryModule;

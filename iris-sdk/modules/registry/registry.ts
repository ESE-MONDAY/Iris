import { Wallet, Contract, JsonRpcProvider, ContractTransaction } from "ethers";
import irisRegistryABI from "./abi.json";

export interface Agent {
  name: string;
  metadataURI: string;
  exists: boolean;
}

export interface RegistryModuleParams {
  wallet?: Wallet;
  provider: JsonRpcProvider;
  contractAddress: string;
}

export class IRISRegistryModule {
  private contract: Contract;
  private wallet?: Wallet;

  constructor(params: RegistryModuleParams) {
    this.wallet = params.wallet;
    this.contract = new Contract(params.contractAddress, irisRegistryABI, params.wallet || params.provider);
  }

  /** Register a new AI agent */
  async registerAgent(name: string, metadataURI: string): Promise<ContractTransaction> {
    if (!this.wallet) throw new Error("Wallet not initialized");

    // ✅ Correct TS-friendly call
    return (this.contract as any).registerAgent(name, metadataURI);
    
  }

  /** Fetch agent info */
  async getAgent(agentId: number): Promise<Agent> {
    return (this.contract as any).getAgent(agentId);
  }

  /** Get next available agent ID */
  async nextAgentId(): Promise<bigint> {
    return (this.contract as any).nextAgentId();
  }
}

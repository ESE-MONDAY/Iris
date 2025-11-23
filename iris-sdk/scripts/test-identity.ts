import { IRISClient } from "../IrisClient";
import * as dotenv from "dotenv";
import type { AgentMetadata } from "../config/types";

dotenv.config();

async function main() {
  // -----------------------------
  // 1️⃣ Client configuration
  // -----------------------------
  const client = new IRISClient({
    privateKey: '',
    baseRpcUrl: "",          // Base chain RPC
    storageRpcUrl: '',    // 0G storage RPC
    contractAddress: '',// Registry contract on Base
  });

  // -----------------------------
  // 2️⃣ Agent metadata
  // -----------------------------
  const metadata: AgentMetadata = {
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

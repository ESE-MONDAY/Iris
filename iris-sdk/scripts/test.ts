import { IRISRegistryModule } from "../modules/registry/registry"
import { Wallet, JsonRpcProvider } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
async function main() {
  // -----------------------------
  // 1️⃣ Setup provider & wallet
  // -----------------------------
  const provider = new JsonRpcProvider("https://sepolia.base.org");
  const wallet = new Wallet(PRIVATE_KEY, provider);

  // -----------------------------
  // 2️⃣ Initialize RegistryModule
  // -----------------------------
  const registry = new IRISRegistryModule({
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
  const receipt = await tx
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

import {IrisClient } from './src/client'

async function main() {
  // REPLACE with your private key
  const PRIVATE_KEY = "b28532f91ec11c94e377dfd28fa8214a85ff15084f52ba0c9705ee9ebb40f122";
  
  if (!PRIVATE_KEY ) {
    console.error("❌ Set PRIVATE_KEY in test-iris.ts");
    return;
  }

  const iris = new IrisClient({ privateKey: PRIVATE_KEY });

  console.log("🤖 Initializing IRIS Agent Registration...");

  const myAgent = {
    name: "Iris Search Agent",
    version: "0.1.0-alpha",
    description: "An autonomous agent that searches 0G storage",
    capabilities: ["search", "index", "retrieve"]
  };

  try {
    const receipt = await iris.registerAgent(myAgent);

    console.log("\n✅ Agent Registered Successfully!");
    console.log("-----------------------------------");
    console.log("🆔 Creator:", receipt.packet.creator);
    console.log("✍️  Signature:", receipt.packet.signature.slice(0, 20) + "...");
    console.log("📦 0G Root Hash:", receipt.rootHash);
    console.log("🔗 Transaction:", receipt.txHash);
    console.log("🌐 URL:", receipt.url);
    
  } catch (err) {
    console.error("❌ Failed:", err);
  }
}

main();
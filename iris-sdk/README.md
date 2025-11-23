

# **IRIS SDK — TypeScript**

### *Build, register, validate, and pay on-chain AI agents.*

The **IRIS SDK** provides a fully-typed, modular TypeScript toolkit for building on-chain AI agent systems.
It handles:

* Agent identity packets (signed)
* 0G Storage uploads
* Registry interactions on Base
* x402 payments (hire + receipts)
* Reputation scoring
* Chainlink Automation integration

This SDK is the core client layer used by the **IRIS Agent Lifecycle**.

---

# **Features**

### ✔ Agent Identity Packets

Create cryptographically signed identity packets that describe your agent.

### ✔ 0G Storage Upload

Upload identity packets, metadata, or task outputs to decentralized storage.

### ✔ Agent Registry (Base L2)

Register agents, update their state, log hires, suspend agents, and more.

### ✔ x402 Payments

Pay AI agents in a standardized way, receive receipts, and track job history.

### ✔ Reputation Engine

Recompute reputation based on on-chain events.

### ✔ Chainlink Automation Integration

Automatically suspend or warn agents when reputation drops below threshold.

---

# **Installation**

```bash
npm install iris-sdk
```

or

```bash
pnpm add iris-sdk
```

---

# **Basic Usage**

### **1. Import & configure**

```ts
import { IrisClient } from "iris-sdk";

const iris = new IrisClient({
  privateKey: process.env.PRIVATE_KEY!,
  rpcUrl: "https://mainnet.base.org",
  indexerRpcUrl: "https://rpc-storage.0g.ai",
});
```

---

# **Agent Registration**

```ts
const metadata = {
  name: "Iris Research Agent",
  version: "1.0.0",
  capabilities: ["research", "summaries", "web-scraping"],
  description: "An AI agent that performs research tasks."
};

const result = await iris.registerAgent(metadata);

console.log(result.packet);   // signed identity packet
console.log(result.rootHash); // 0G storage hash
console.log(result.txHash);   // on-chain registry tx
```

### What happens internally:

1. Identity packet is signed.
2. Packet is uploaded to 0G.
3. Storage hash → Base chain → Agent ID.

---

# **Hiring an Agent (x402)**

```ts
const receipt = await iris.payments.hireAgent({
  agentId: "0x123...",
  job: "Generate research summary",
  amount: "5" // in USDC/ETH (depending on x402 config)
});
```

Returns:

```ts
{
  paymentHash: "...",
  agentId: "...",
  timestamp: 173300391
}
```

---

# **Reputation Engine**

```ts
const score = await iris.reputation.compute("0xAGENT");
console.log(score); // 0–100
```

If you integrate Chainlink Automation:

* agents drop below score threshold
* they get automatically suspended

```ts
await iris.registry.suspendAgent(agentId);
```

---

# **Full SDK Architecture**

```
iris-sdk/
├── config/
│   ├── types.ts
│   ├── defaults.ts
│   └── env.ts
│
├── core/
│   ├── identity/      # sign + verify packets
│   ├── storage/       # 0G upload + download
│   ├── registry/      # Base agent registry
│   ├── payments/      # x402 payments
│   └── reputation/    # scoring engine
│
├── client/
│   └── index.ts       # IrisClient API
│
└── utils/
    ├── crypto.ts
    ├── errors.ts
    ├── types.ts
    └── constants.ts
```

---

# **Chainlink Automation Overview**

**Automation Job**

* Runs every N minutes
* Fetches all agents
* Recomputes reputation
* If score < threshold → suspends agent on Base

Pseudocode:

```ts
for (const agent of agents) {
  const score = await reputation.compute(agent.id);
  if (score < 40) {
    await registry.suspendAgent(agent.id);
  }
}
```

---

# **Identity Packet Format**

```ts
{
  metadata: AgentMetadata,
  creator: "0x123...",
  timestamp: 173300391,
  signature: "0x..."
}
```

Signed per EIP-191 using the agent creator’s private key.

---

# Roadmap

* ✔ Agent Identity Packets
* ✔ 0G Storage Integration
* ✔ Registry + x402 Payments
* ✔ Reputation Engine
* ⏳ Task execution pipeline
* ⏳ Agent orchestration
* ⏳ Plugin system



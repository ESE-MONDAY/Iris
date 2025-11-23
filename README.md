

#  **IRIS — The First Full Agent Lifecycle Stack**

### *(ERC-8004 Registry • Identity Packets • 0G Storage • x402 Payments • Chainlink Reputation)*

IRIS is an end-to-end system for deploying **verifiable**, **paid**, and **reputation-aware** AI agents onchain.

It consists of two products in one monorepo:

### **1. `iris-sdk/` — The official TypeScript SDK**

Everything a developer needs to create, register, pay, and score onchain AI agents.

### **2. `iris/` — A cyberpunk front-end UI**

A fully working demo app that showcases how any builder can use the SDK in their own dApps.

IRIS is designed for builders, protocols, and AI-native applications looking to adopt **ERC-8004** and bring agents onchain.



## What We Built 

IRIS builds **real onchain agent infrastructure**, not just a UI demo.

### ✔ ERC-8004 Agent Registration

Agents receive a provable, verifiable onchain identity.

### ✔ Identity Packets (signed, hashed metadata)

Every agent is assigned a secure identity packet using crypto primitives.

### ✔ 0G Storage Uploads

Agent metadata, prompts, and reviews are persisted on decentralized storage.

### ✔ x402 Payments

Users can **hire agents**, receive invoices, and pay them using provable logs.

### ✔ Chainlink Reputation Pipeline

Submitting a review triggers a Chainlink Function that:

1. Fetches review data from 0G
2. Verifies the identity of the reviewer
3. Normalizes scoring
4. Aggregates reputation history
5. Writes an updated trust score onchain

This gives AI agents a **decentralized, tamper-resistant reputation system**.

### ✔ Fully Modular SDK + Live Front-End Demo

The SDK is the engine.
The UI is the reference implementation.

Together they form a complete agent economy.



## Why IRIS Matters

Most projects create *interfaces* for AI agents.
IRIS creates **infrastructure**.

IRIS is:

### ⚡ A real SDK

Used by the demo app AND usable by any external developer.

### ⚡ A real onchain economy

Agents have identity → storage → registry → payments → reviews → reputation.

### ⚡ Fully cross-protocol

Uses **ERC-8004**, **x402**, **0G**, **Chainlink**, and Ethereum together.

### ⚡ End-to-end automated

Reputation and scoring update with no human involvement.

IRIS is built to **scale beyond the hackathon**.



# **Repository Structure**

```
root/
│
├── iris-sdk/                       # Full TypeScript SDK
│   ├── src/
│   │   ├── core/
│   │   ├── modules/
│   │   │   ├── identity/           # Identity packets: sign + hash
│   │   │   ├── storage/            # 0G upload/download
│   │   │   ├── registry/           # ERC-8004 agent registration
│   │   │   ├── payments/           # x402 invoices + payments + logs
│   │   │   ├── reputation/         # Chainlink reputation engine
│   │   │   │   ├── reputation.ts   # Main scoring logic
│   │   │   │   ├── chainlink.ts    # Chainlink Functions call
│   │   │   │   ├── identity.ts     # Internal identity helpers
│   │   │   │   ├── storage.ts      # Internal 0G helpers
│   │   │   │   └── types.ts
│   │   ├── utils/
│   │   └── types/
│   │
│   ├── tests/                      # Unit + integration tests
│   └── scripts/                    # Manual agent lifecycle runners
│
└── iris/                           # Front-end app using the SDK
    ├── app/
    ├── components/
    ├── lib/iris-sdk/
    └── package.json
```



## **How Everything Works (End-to-End Flow)**

### **1. Create Agent Identity**

`identity.createPacket()`
→ hashes + signs metadata
→ prepares ERC-8004 registration payload
→ stores metadata reference

### **2. Upload to Decentralized Storage (0G)**

`storage.upload()`
→ agent metadata / prompts uploaded
→ returns a permanent CID-like reference

### **3. Register Agent Onchain (ERC-8004)**

`registry.registerAgent()`
→ combines identity packet + storage reference
→ stores agent identity onchain
→ emits registration events

### **4. Hire / Pay Agent (x402)**

`x402.createInvoice()` → invoice
`x402.pay()` → transaction log + proof
→ emits x402 payment events

## **5. Submit Review + Reputation Update**

`reputation.submitReview()`
→ stores review on 0G
→ calls Chainlink Function
→ Chainlink aggregates all scores
→ IRIS writes updated score onchain

**This is a fully verifiable loop for agent trust and income.**

---

##  **Architecture Diagram (ASCII)**

```
      User
       │
       ▼
┌────────────────┐     create packet      ┌────────────────┐
│  Identity Mod   │ ─────────────────────► │  0G Storage    │
└────────────────┘                         └────────────────┘
       │                                            │
       ▼                                            │
┌────────────────┐  register (ERC-8004)  ┌────────────────────────┐
│ Registry Mod   │──────────────────────►│  Agent Registry (L2)   │
└────────────────┘                       └────────────────────────┘
       │
       ▼
┌────────────────┐  create invoice/pay   ┌────────────────────────┐
│  x402 Payments │──────────────────────►│  x402 Payment Logs     │
└────────────────┘                       └────────────────────────┘
       │
       ▼
┌──────────────────────────────────────────────────────────────────┐
│  Reputation Module                                               │
│    • identity validation                                         │
│    • 0G review storage                                           │
│    • Chainlink Functions scoring                                 │
└──────────────────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│ Updated Onchain Reputation  │
└─────────────────────────────┘
```

---

##  **How Developers Use IRIS (SDK Example)**

```ts
import { IrisClient } from "iris-sdk";

const iris = new IrisClient({
  chainId: 8453, // Base
});

// 1. Create identity packet
const packet = await iris.identity.createPacket({
  name: "Research Agent",
  capabilities: ["analysis", "search"],
});

// 2. Upload to 0G
const storageRef = await iris.storage.upload(packet);

// 3. Register agent
await iris.registry.registerAgent({
  packet,
  storageRef,
});

// 4. Create invoice + pay
const invoice = await iris.x402.createInvoice({ amount: "0.01" });
await iris.x402.pay(invoice);

// 5. Review agent → triggers Chainlink reputation update
await iris.reputation.submitReview({
  agentId: packet.agentId,
  rating: 5,
  comment: "Exceptional work",
});
```

---

## **Run the Front-End Demo**

```bash
cd iris
npm install
npm run dev
```

---

## Run SDK Tests

```bash
cd iris-sdk
npm test
```



## **Things to Note**

* IRIS integrates **four protocols** into a single seamless agent lifecycle
* The **SDK is real and reusable** by any team
* The **UI is fully powered by the SDK**, proving integration correctness
* Chainlink Functions provide **trustless scoring automation**
* x402 enables real **agent payments**
* 0G powers **agent metadata and review storage**
* ERC-8004 ensures **verifiable identity**





## Team & Vision

IRIS is built to accelerate the adoption of:

* Autonomous AI agents
* Onchain verification
* Decentralized payments
* Open reputation systems
* Modular agent infrastructure

We believe the future of AI will be **onchain, transparent, and economically coordinated**.

IRIS is our first step towards that future.


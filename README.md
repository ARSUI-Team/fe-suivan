# ARCHA - Arisan Onchain

<div align="center">
  <img src="public/logo Archa.png" alt="Archa Logo" width="200"/>

  **Decentralized Rotating Savings with AI Yield Optimizer**

  Built on Mantle Network for [Mantle Global Hackathon 2025](https://www.mantle.xyz/hackathon)

  [![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://arisanonchain.vercel.app)
  [![Mantle](https://img.shields.io/badge/network-Mantle-65B3AE)](https://www.mantle.xyz)
  [![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
</div>

---

## What is Archa?

**Archa** brings the traditional Indonesian *arisan* (rotating savings and credit association) to the blockchain. For decades, arisan has proven that trust can be built without banks. Now, we're taking it to the next level with **AI that optimizes yield** and **smart contracts that cannot lie**.

### The Problem with Traditional Arisan

| Problem | Description |
|---------|-------------|
| Run-away Risk | Participants flee after getting the first turn |
| Idle Money | Collected funds don't generate anything |
| Manual Records | Easy to manipulate and not transparent |
| Limited Scale | Only possible with family or close friends |

### Archa's Solution

| Solution | Description |
|----------|-------------|
| Collateral System | Deposit collateral upfront, returned + yield if consistent |
| AI Yield Optimizer | AI automatically selects best DeFi protocols for maximum yield |
| 100% On-Chain | Everything recorded on blockchain, cannot be manipulated |
| Global Scale | Arisan with anyone, anywhere in the world |

---

## How It Works

```
1. Choose Pool    2. Deposit        3. Monthly         4. Get Your      5. Yield Bonus
   Arisan           Collateral        Deposits           Turn             at End
      |                 |                 |                 |                 |
      v                 v                 v                 v                 v
   [Select]  --->  [Lock USDC]  --->  [AI Invests]  --->  [Win Pot]  --->  [Everyone
    Pool           as safety          to best DeFi        + Yield          gets bonus]
```

### Step by Step

1. **Choose Arisan Pool** - Select a pool based on deposit amount (10/50/100 USDC) and participants (5/10/20 people)
2. **Deposit Collateral** - Deposit USDC collateral. Your collateral also generates yield during the arisan!
3. **Monthly Deposits** - Deposit USDC monthly. AI automatically invests funds to DeFi protocols with best APY
4. **Get Your Turn** - Turn randomly determined by smart contract. Your turn = receive that month's deposits + accumulated yield
5. **Yield Bonus at End** - Arisan complete: collateral back + collateral yield + pool yield share for everyone!

---

## Key Features

| Feature | Description |
|---------|-------------|
| **AI Yield Optimizer** | Real-time analysis and automatic selection of best DeFi protocols |
| **Double Yield** | Yield from pool fund + yield from collateral = two passive income sources |
| **Anti Run-away** | Collateral system guarantees commitment. Run away = lose collateral + yield |
| **100% Transparent** | All transactions and yield recorded on blockchain, verifiable by anyone |
| **USDC Stablecoin** | Use USDC with stable value, yield in stablecoin too |
| **Low Fees** | Built on Mantle Network with very low transaction fees |
| **Leaderboard** | Community rankings showing top earners, win rates, and pool participation |
| **FAQ Section** | Comprehensive help center with multi-language support (EN/ID) |
| **Testnet Faucet** | Easy MNT testnet token access for testing (USDC faucet planned) |

---

## Pool Templates

Collateral = 125% × Deposit × (Participants - 1)

| Pool Type | Monthly Deposit | Participants | Collateral | Cycle Duration | Total Duration |
|-----------|-----------------|--------------|------------|----------------|----------------|
| Small Pool | 10 USDC | 5 people | 50 USDC | 30 days | ~5 months |
| Medium Pool | 50 USDC | 10 people | 563 USDC | 30 days | ~10 months |
| Large Pool | 100 USDC | 20 people | 2,375 USDC | 30 days | ~20 months |

> **How Cycles Work:** Each pool operates on a 30-day cycle. Total duration = 30 days × number of participants. For example, a 5-person pool runs for 5 cycles (150 days ≈ 5 months).

> **Anti Run-away Protection:** The 125% multiplier ensures there's no economic benefit from winning early and leaving. Even if you receive your pot first and disappear, you'll lose more in collateral than you gained.

---

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **wagmi v2** - React hooks for Ethereum
- **viem** - TypeScript Ethereum library
- **WalletConnect** - Multi-wallet support

### Smart Contracts
- **Solidity ^0.8.20** - Smart contract language
- **Foundry** - Development framework
- **OpenZeppelin** - Security standards

### Blockchain
- **Mantle Network** - Low-cost L2 blockchain
- **USDC** - Stablecoin for deposits

---

## Getting Started

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- Foundry (for smart contracts)

### Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yt2025id-lab/Archa.git
cd Archa

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Smart Contract Setup

```bash
# Navigate to contracts directory
cd contracts

# Install Foundry dependencies
forge install

# Run tests
forge test -vvv

# Deploy to Mantle Sepolia Testnet
forge script script/Deploy.s.sol:DeployScript --rpc-url mantle-sepolia --broadcast
```

---

## Contract Addresses

### Mantle Sepolia Testnet (Live ✅)
| Contract | Address |
|----------|---------|
| ArisanFactory | `0x41AB8122110588682358F9B23A01761C2064F1d0` |
| AIYieldStrategy | `0x9A951AAbE94134Cc4df4eAACD6117d94c8e4A2ea` |
| MockUSDC | `0x3e647B4E693B73bBa709cCF26E557698BE603a32` |
| Small Pool (10 USDC) | `0xa5fe7e4db7cc25a6aeb67f787be0c3da6a4e1b05` |
| Medium Pool (50 USDC) | `0x71560fc237b64a7625a6056c7d02e303652ef1b7` |
| Large Pool (100 USDC) | `0x98e5733617b661aa7bb5dd71185174ee8d519d76` |

**Explorer:** [explorer.sepolia.mantle.xyz](https://explorer.sepolia.mantle.xyz)

> **Note for Testers:** To get MNT testnet tokens, visit the [Mantle Sepolia Faucet](https://faucet.sepolia.mantle.xyz). For MockUSDC tokens, please contact the team via [Telegram](https://t.me/archaonchain) (automated faucet coming soon).

### Mantle Mainnet (Coming Soon)
| Contract | Address |
|----------|---------|
| ArisanFactory | `TBD` |
| AIYieldStrategy | `TBD` |
| USDC | `0x09Bc4E0D10e52467B7e7b1bB0467eB27d93c1C7e` |

---

## Project Structure

```
archa/
├── src/
│   ├── app/                 # Next.js pages
│   │   ├── page.tsx         # Landing page
│   │   ├── pools/           # Pool explorer
│   │   │   ├── page.tsx     # Pool list
│   │   │   └── [address]/   # Pool detail page
│   │   ├── ai/              # AI Yield Optimizer dashboard
│   │   ├── leaderboard/     # Community rankings
│   │   ├── faq/             # FAQ page with multi-language
│   │   └── api/             # API routes
│   │       ├── yields/      # Yield data endpoints
│   │       └── strategy/    # Strategy recommendation
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── HowItWorksSection.tsx
│   │   ├── AdvantagesSection.tsx
│   │   └── ConnectWallet.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useContracts.ts  # Smart contract interactions
│   │   └── useAI.ts         # AI recommendation hooks
│   ├── lib/                 # Utilities
│   │   └── ai-optimizer.ts  # AI yield optimization engine
│   ├── providers/           # React providers
│   │   └── Web3Provider.tsx # Wagmi/Web3 configuration
│   ├── context/             # React context
│   │   └── LanguageContext.tsx
│   └── config/              # Configuration
│       ├── contracts.ts
│       └── abis.ts
├── contracts/
│   ├── src/
│   │   ├── ArisanPool.sol       # Pool contract
│   │   ├── ArisanFactory.sol    # Factory contract
│   │   ├── AIYieldStrategy.sol  # Yield optimizer
│   │   └── mocks/
│   │       └── MockUSDC.sol     # Test token
│   ├── test/
│   │   └── ArisanPool.t.sol     # Comprehensive tests
│   └── script/
│       └── Deploy.s.sol         # Deployment scripts
├── docs/                    # Documentation
│   ├── pitch-deck/          # Pitch deck
│   └── video-recording-guide.md
└── public/                  # Static assets
```

---

## Roadmap

### Phase 1: Foundation ✅
- [x] Smart contract development
- [x] Frontend landing page
- [x] Wallet connection integration
- [x] Pool explorer UI
- [x] Testnet deployment (Mantle Sepolia)

### Phase 2: Core Features ✅
- [x] Pool creation flow
- [x] Join pool mechanism
- [x] Pool detail page with participants
- [x] Pool templates (Small/Medium/Large)
- [x] Leaderboard with community rankings
- [x] FAQ page with multi-language support
- [ ] Monthly deposit automation
- [ ] Winner selection system (VRF)

### Phase 3: AI Integration ✅
- [x] Yield strategy contract
- [x] AI optimizer backend
- [x] APY optimization algorithm
- [x] AI Dashboard with recommendations
- [x] Multi-protocol analysis (Lendle, Merchant Moe, Agni, Minterest, KTX)

### Phase 4: Launch ✅
- [x] Multi-language support (EN/ID)
- [x] MNT testnet faucet integration
- [ ] USDC faucet for easy testing (planned)
- [ ] Security audit
- [ ] Mantle mainnet deployment
- [ ] Community building

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Links

- **Website**: [arisanonchain.vercel.app](https://arisanonchain.vercel.app)
- **Twitter**: [@archaonchain](https://twitter.com/archaonchain)
- **Discord**: [discord.gg/archa](https://discord.gg/archa)
- **Telegram**: [t.me/archaonchain](https://t.me/archaonchain)
- **GitHub**: [github.com/yt2025id-lab/Archa](https://github.com/yt2025id-lab/Archa)

---

<div align="center">
  <p>Built with love for <strong>Mantle Global Hackathon 2025</strong></p>
  <img src="https://www.mantle.xyz/logo-light.svg" alt="Mantle" width="150"/>
</div>

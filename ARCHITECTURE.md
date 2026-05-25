# Suivan Architecture — Sui Overflow 2026

## Winning Thesis

Suivan takes the proven ROSCA + AI yield optimization concept from Archa (EVM/Mantle)
and rebuilds it natively on Sui, leveraging Sui-unique features for 10x better UX.

| Factor | Archa (EVM) | Suivan (Sui) |
|--------|-------------|--------------|
| Onboarding | Must install MetaMask | **zkLogin** — Google login, no wallet |
| Gas fee | User pays gas | **Sponsored Transaction** — gasless |
| Yield routing | AI routes to Lendle/Agni | DeFiLlama + simulated routing |
| Pool metadata | On-chain only | **Walrus** — blob storage (WIP) |
| Identity | `0x...` address | **SuiNS** — planned |
| Speed | EVM sequential | Sui parallel execution |
| Cost | ~$0.01-0.05/tx | ~$0.0001/tx |

---

## Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| zkLogin (Google login) | ✅ **Done** | Via @mysten/dapp-kit `useConnectWallet` |
| Sui wallet integration | ✅ **Done** | Via @mysten/dapp-kit `useCurrentAccount` |
| Pool explorer (read) | ✅ **Done** | via `useSuiClient.getObject` |
| Pool join / deposit | ✅ **Done** | via `useSignAndExecuteTransaction` |
| DeFiLlama yield proxy | ✅ **Done** | `/api/yields` route + `/ai` dashboard |
| Brutalist design system | ✅ **Done** | border-2 + shadow-[Xpx] pattern |
| GSAP animations | ✅ **Done** | Landing page only (ScrollTrigger + stagger) |
| Lenis smooth scroll | ✅ **Done** | Landing page only |
| Dark mode | ✅ **Done** | Toggle in Header + OS detection |
| i18n EN/ID | ✅ **Done** | LanguageProvider + context |
| FAQ | ✅ **Done** | 8 items + accordion |
| Leaderboard | ✅ **Done** | Sortable mock data |
| Interactive demo walkthrough | ✅ **Done** | 5-step guide |
| Sponsored transaction (gasless) | ⚡ **Backend** | `/api/sponsor` route, needs deploy + env key |
| Walrus blob storage | ⚡ **Backend** | `/api/walrus` route, frontend ready |
| Smart contract audit fixes | ✅ **Done** | All 7 issues fixed (critical→low) |
| Contracts deployed to testnet | ⏳ **Needed** | Package IDs are `0x...` placeholders |
| DeepBook routing | ❌ **Planned** | Needs real DeFi integration |
| SuiNS human-readable names | ❌ **Planned** | Needs SDK integration |

---

## System Architecture

```
                         FRONTEND (fe-suivan)
   Next.js 16 + React 19 + TypeScript + Tailwind 4 + GSAP + Lenis

   ┌──────────┐ ┌─────────┐ ┌─────────┐ ┌────────────┐ ┌──────────┐
   │  Landing  │ │  Pools   │ │  Detail  │ │ AI Signals │ │   Demo   │
   │  Page     │ │ Explorer │ │  Pool    │ │ Dashboard  │ │Walkthrough│
   └──────────┘ └─────────┘ └─────────┘ └────────────┘ └──────────┘

   ┌────────────────────────────────────────────────────────────┐
   │                    SUI INTEGRATION LAYER                    │
   │ @mysten/dapp-kit  │ @mysten/sui  │ @mysten/walrus         │
   │ zkLogin / Wallet  │ TxBlock      │ Blob Storage (WIP)      │
   │ Sponsored Tx (WIP)│              │                         │
   └────────────────────────────────────────────────────────────┘
                             │
                             ▼
                       SUI NETWORK
   ┌──────────────┐  ┌───────────┐  ┌────────────────────┐
   │ arisan_factory│  │arisan_pool│  │  yield_strategy    │
   │ create pool   │  │ join      │  │  Simulated yield   │
   │ list pools    │  │contribute │  │  (no real DeFi yet)│
   │ templates     │  │ payout    │  │                    │
   └──────────────┘  └───────────┘  └────────────────────┘
   ┌──────────────┐  ┌───────────┐  ┌────────────────────┐
   │protocol_vault│  │ test_usdc │  │  Walrus Blobs      │
   │ vault logic  │  │ faucet    │  │  Pool Metadata (WIP)│
   └──────────────┘  └───────────┘  └────────────────────┘
                             │
                   ┌─────────┴──────────┐
                   ▼                     ▼
          ┌──────────────┐    ┌──────────────────┐
          │  DeepBook    │    │  DeFiLlama / API  │
          │  (planned)   │    │  Yield Data Feed  │
          └──────────────┘    └──────────────────┘
```

---

## Layer 1: Frontend (fe-suivan)

### Directory Structure

```
fe-suivan/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout (SuiProvider > LanguageProvider > ToastProvider)
│   │   ├── page.tsx             # Landing page (SuivanLanding + AboutSection + HowItWorksSection + AdvantagesSection)
│   │   ├── globals.css          # Tailwind + dark mode + animations
│   │   ├── loading.tsx          # Loading animation
│   │   ├── pools/
│   │   │   ├── page.tsx         # Pool explorer (Sui hooks)
│   │   │   └── [address]/
│   │   │       └── page.tsx     # Pool detail (no approve flow)
│   │   ├── ai/
│   │   │   └── page.tsx         # AI yield dashboard (live DeFiLlama API)
│   │   ├── demo/
│   │   │   └── page.tsx         # Interactive walkthrough (5-step)
│   │   ├── faq/
│   │   │   └── page.tsx         # FAQ with i18n
│   │   ├── leaderboard/
│   │   │   └── page.tsx         # Leaderboard (mock data)
│   │   └── api/
│   │       ├── yields/route.ts  # DeFiLlama proxy
│   │       ├── sponsor/route.ts # Gasless tx backend
│   │       └── walrus/route.ts  # Walrus blob proxy
│   ├── components/
│   │   ├── Header.tsx           # Nav + ConnectSuiWallet + dark mode toggle
│   │   ├── Footer.tsx           # Footer
│   │   ├── SuivanLanding.tsx    # Landing page (GSAP + Lenis)
│   │   ├── SuivanLogo.tsx       # SVG Logo
│   │   ├── SuiFeeProfile.tsx    # Gas comparison widget
│   │   ├── ConnectSuiWallet.tsx # Wallet + zkLogin
│   │   ├── PoolAnalyticsChart.tsx # SVG chart
│   │   ├── SharePool.tsx        # Social sharing
│   │   ├── Toast.tsx            # Toast notifications
│   │   ├── LoadingSpinner.tsx   # Spinner
│   │   ├── LoadingAnimation.tsx # Logo assembly
│   │   └── SuivanWaterDrop.tsx  # Brand icon
│   ├── providers/
│   │   └── SuiProvider.tsx      # SuiClientProvider + WalletProvider
│   ├── hooks/
│   │   ├── useSuiContracts.ts   # ALL Sui contract hooks (read/write)
│   │   └── useAI.ts             # AI yield hooks
│   ├── config/
│   │   ├── sui.ts               # Package IDs, object IDs
│   │   └── networkConfig.ts     # Sui network config
│   ├── context/
│   │   └── LanguageContext.tsx   # i18n EN/ID
│   └── lib/
│       ├── ai-optimizer.ts      # Yield engine + DeFiLlama fetch
│       ├── sponsor.ts           # Sponsored transaction client
│       └── walrus.ts            # Walrus blob client
├── .env.example                 # Environment variables template
├── ARCHITECTURE.md
├── package.json
└── README.md
```

### Routing

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | ROSCA explainer + Sui branding + About + HowItWorks + Advantages |
| `/pools` | Pool explorer | Grid + filters + create |
| `/pools/[address]` | Pool detail | Stats, participants, yield |
| `/ai` | AI dashboard | Live yield signals from DeFiLlama |
| `/demo` | Walkthrough | Interactive 5-step tutorial |
| `/faq` | FAQ | Accordion with i18n |
| `/leaderboard` | Leaderboard | Rank by earnings (mock) |

---

## Layer 2: Sui Integration

### 1. zkLogin — Google Login, No Wallet
- ✅ **Implemented**: Via `@mysten/dapp-kit` `useConnectWallet`
- User signs in with Google → can explore pools immediately
- Wallet only required for on-chain transactions

### 2. Sponsored Transaction — Gasless UX
- ⚡ **Backend built**: `/api/sponsor` route
- Suivan backend pays gas fees via Ed25519 keypair
- User joins a pool without needing SUI tokens
- Needs: env key configured, contract deployed

### 3. DeFiLlama Yield Data
- ✅ **Implemented**: `/api/yields` route fetches real Sui protocol APY
- Protocols tracked: Cetus, NAVI, Scallop, Aftermath, Turbos, Bluefin, Suilend

### 4. Walrus — Pool Object Storage
- ⚡ **Backend built**: `/api/walrus` route
- Pool metadata stored in Walrus blobs
- Contract stores blob ID for cheap gas

### 5. Dark Mode
- ✅ **Implemented**: Toggle in Header + `prefers-color-scheme` detection
- CSS variables swap between light/dark palettes

---

## Layer 3: Smart Contracts (sc-suivan)

### Contracts

| Contract | File | Description | Status |
|----------|------|-------------|--------|
| `arisan_factory` | `sources/arisan_factory.move` | Create/list pool templates | ✅ Audited & fixed |
| `arisan_pool` | `sources/arisan_pool.move` | Core pool: join, contribute, payout | ✅ Audited & fixed |
| `protocol_vault` | `sources/protocol_vault.move` | Yield vault routing | ✅ Audited & fixed |
| `yield_strategy` | `sources/yield_strategy.move` | Simulated yield strategy | ✅ Audited & fixed |
| `test_usdc` | `sources/test_usdc.move` | Testnet USDC faucet | ✅ Clean |

### Audit Fixes Applied (all 7 issues)

| Issue | Severity | Fix |
|-------|----------|-----|
| Yield inflation breaks withdrawals | 🔴 Critical | `simulate_yield` no longer inflates `total_deposits` |
| Factory fails to track pool IDs | 🟠 High | `create_pool` returns `ID`, factory stores it |
| `end_pool` locks remaining funds | 🟠 High | Distributes remaining pool_funds + yield to active participants |
| `select_winner` event after mutation | 🟡 Medium | Event emitted before `end_pool` |
| `is_cycle_complete` underflow | 🟡 Medium | Guard: `current_time_ms < pool_start_time_ms` |
| `max_participants` = 1 stuck pool | 🟡 Medium | `assert!(max_participants >= 2)` |
| `collateral_multiplier` = 0 allowed | 🔵 Low | `assert!(collateral_multiplier >= 100)` |

### Tests

| Test File | Tests | Status |
|-----------|-------|--------|
| `arisan_pool_tests.move` | 31 | ✅ All pass |
| `protocol_vault_tests.move` | 7 | ✅ All pass |
| `yield_strategy_tests.move` | 10 | ✅ All pass |

---

## Why Suivan Wins #1

| Judge Criteria | Suivan | Readiness |
|----------------|--------|-----------|
| **Sui-native** (not EVM fork) | zkLogin, SponsoredTx, Walrus (WIP) | ✅ / ⚡ |
| **Real product, not prototype** | Contracts audited, frontend running | Needs testnet deploy |
| **Real-world impact** | ROSCA = 100M+ global users | ✅ |
| **AI integration** | DeFiLlama yield optimization | ✅ |
| **Clean UI/UX** | Brutalist premium + motion design + dark mode | ✅ |
| **Technical complexity** | Multi-contract, sponsored tx, Walrus | ⚡ WIP |
| **Sui ecosystem alignment** | Walrus, zkLogin | ⚡ WIP |
| **Product completeness** | Pools, yield, demo, leaderboard, i18n | ✅ |

---

## Implementation Status

| Phase | Deliverable | Status |
|-------|-------------|--------|
| Fase 1 — Foundation | wagmi → @mysten/dapp-kit, zkLogin | ✅ Done |
| Fase 2 — Contracts Bridge | useSuiContracts.ts, sponsored tx | ✅ / ⚡ |
| Fase 3 — UI Adapt | Archa components, dark mode, motion | ✅ Done |
| Fase 4 — Content | DeFiLlama API, i18n, demo walkthrough | ✅ Done |
| Fase 5 — Deploy | Contracts to testnet | ⏳ Needed |
| Fase 6 — Polish | GSAP across routes, responsive | ⌛ Ongoing |

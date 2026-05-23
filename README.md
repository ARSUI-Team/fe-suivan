# Suivan Frontend

Suivan is a Sui-native frontend direction for a global ROSCA protocol. ROSCA stands for Rotating Savings and Credit Association. Arisan is treated as a local expression of the same collective savings model, while the product language stays global-first and English-first.

This repository contains the Suivan frontend direction: a cleaner hackathon-grade interface, GSAP motion, Sui-oriented copy, and modular frontend boundaries for future backend and contract integration.

## Current Focus

- Landing page with Suivan branding and English copy
- ROSCA education for a global audience
- Pool object mockups and cycle progress surfaces
- APY and yield signals as frontend modules
- GSAP and Lenis motion inspired by Pivy and Zentry-style storytelling
- Reusable frontend structure that can later connect to the new backend and Sui smart contracts

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- GSAP
- Lenis
- lucide-react
- wagmi and viem are retained temporarily while the final Sui wallet adapter is not yet wired

## Important Product Notes

- Do not treat legacy ABI, contract addresses, chain assumptions, or API shapes as final.
- Smart contract and backend integration are still expected to change.
- Frontend work should stay modular so Sui wallet, API, and contract adapters can be swapped in later.
- User-facing copy should stay in English.
- Avoid emoji in UI copy, README content, and new source files.

## Local Development

```bash
npm install
npm run dev
```

Open the local app at:

```text
http://127.0.0.1:3000
```

## Build

```bash
npm run build
```

## Key Routes

- `/` Suivan landing page
- `/pools` Pool explorer prepared for future Suivan API and contract adapters
- `/pools/[address]` Pool detail prepared for member state, contribution, payout, collateral, and yield data
- `/faq` Suivan FAQ and ROSCA education

## Community Links

- Telegram: `https://t.me/suivan`
- Discord: `https://discord.gg/suivan`

Update these URLs when the official community channels are finalized.

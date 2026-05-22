# Suivan Frontend

Suivan is a Sui-native frontend direction for a global ROSCA protocol. ROSCA stands for Rotating Savings and Credit Association. Arisan is treated as a local expression of the same collective savings model, while the product language stays global-first and English-first.

This repository currently uses the Archa frontend as a baseline, then rebuilds the user-facing landing experience for Suivan with a stronger hackathon-grade interface, GSAP motion, Sui-oriented copy, and modular frontend boundaries.

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
- wagmi and viem retained from the Archa baseline for now

## Important Product Notes

- Do not treat old Archa ABI, contract addresses, Mantle assumptions, or API shapes as final.
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
- `/pools` Pool explorer inherited from the Archa baseline and pending Suivan migration
- `/pools/[address]` Pool detail inherited from the Archa baseline and pending Suivan migration
- `/faq` FAQ route pending full Suivan rewrite

## Community Links

- Telegram: `https://t.me/suivan`
- Discord: `https://discord.gg/suivan`

Update these URLs when the official community channels are finalized.

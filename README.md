# 🏔️ WildTrail — Explore the Wild, Craft Your Legacy

**Pixel-Art Outdoor Adventure Game** — A retro-styled nature exploration RPG where every hike earns XP, every expedition discovers wildlife, and every climb forges legendary survival gear.

## 🎮 Features

- **Expedition System** — Hike, climb, kayak, camp, and track wildlife across untamed biomes
- **4 Explorer Classes** — Ranger (trails), Mountaineer (peaks), Naturalist (wildlife), Survivalist (crafting)
- **Gear Crafting** — Gather Wood, Stone, Rope, Herbs, Crystals from expeditions → craft Common to Legendary survival equipment
- **Free Activities** — Trail hiking, rock climbing, river kayaking, wild camping, wildlife tracking, lake swimming
- **Nature Log** — Wildlife discoveries, weather tracking, AI trail advisor
- **XP & Leveling** — Earn XP from expeditions, level up, unlock rewards
- **Leaderboard** — Weekly rankings with podium and bonus loot for top 3
- **Reward Shop** — Spend XP on boosts, loot boxes, cosmetics, and hidden quests
- **Base Camp** — Camp upgrades: firepit, shelter, crafting bench, herb garden

## 🤖 MiMo AI Integration

| Model | Feature | How It Works |
|-------|---------|-------------|
| **MiMo Flash** | Trail Tips | AI chat during expeditions for real-time navigation |
| **MiMo Pro** | Route Plans | Personalized expedition plans based on stats + biome |
| **MiMo VL** | Nature ID | Camera-based wildlife and plant identification |
| **MiMo ASR** | Voice Log | Voice-controlled expedition tracking |
| **MiMo TTS** | Audio Guide | Spoken guidance during outdoor activities |

## 🏗️ Tech Stack

- **Next.js 14** (App Router)
- **TypeScript** — strict type safety
- **Tailwind CSS** — custom pixel-art dark theme
- **Framer Motion** — chunky step-based animations
- **Zustand** — lightweight state management
- **Lucide React** — icon system
- **Press Start 2P** — pixel font

## 🎨 Pixel Art Design

- **Zero border-radius** — everything square/pixelated
- **Press Start 2P font** — authentic retro typography
- **Step-based animations** — chunky, discrete keyframe transitions
- **Scanline overlay** — CRT-style screen effect
- **Pixel borders & shadows** — 3D depth with inset highlights and drop shadows
- **8-bit color palette** — forest greens, earth browns, sky blues, sunset oranges

## 📄 Pages (13)

| Page | Route | Description |
|------|-------|-------------|
| Landing | `/` | Pixel hero with mountains, stars, classes showcase |
| Auth | `/auth` | Email authentication |
| Onboarding | `/onboarding` | 3-step: class → biome → ready |
| Dashboard | `/dashboard` | Stats, streak, XP bar, active expeditions |
| Map | `/map` | Filterable expedition list with pixel world map |
| Quest Detail | `/quest/[id]` | Expedition details, challenges, loot rewards |
| Free Activity | `/activity` | Guided outdoor activities with timer |
| Nature Log | `/journal` | Wildlife discoveries, weather, AI advisor |
| Inventory | `/inventory` | Craft survival gear, manage materials |
| Leaderboard | `/leaderboard` | Weekly XP rankings + podium |
| Rewards | `/rewards` | XP redemption shop |
| Progress | `/progress` | Stat bars, milestones, streak calendar |
| Base Camp | `/basecamp` | Camp upgrades and bonuses |

## 🚀 Getting Started

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 📦 Deploy

```bash
npm run build
npx vercel --prod
```

## 📜 License

MIT — Built for MiMo Orbit 100T Token Creator Program

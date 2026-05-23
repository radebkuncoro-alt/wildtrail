# 🏔️ WildTrail — Explore the Wild, Craft Your Legacy

**Pixel-Art Outdoor Adventure Game** — A retro-styled nature exploration RPG where every hike earns XP, every expedition discovers wildlife, and every climb forges legendary survival gear. Built with Next.js 14 + TypeScript + Tailwind CSS, styled in authentic 8-bit pixel art aesthetic.

🔗 **Live Demo:** [wildtrail-pixel.vercel.app](https://wildtrail-pixel.vercel.app)

---

## 🎮 Features

### 🥾 Expedition System
Choose from 8 unique expeditions across 5 biomes (forest, mountain, coast, tundra, desert). Each expedition has different difficulty levels (easy → legendary), rewards, and survival challenges. Track your progress as you conquer trails, scale peaks, and navigate rivers.

### 🏹 4 Explorer Classes
- **Ranger** 🏹 — Master of trails and forest paths. Bonus to hiking and wildlife tracking. `END+3 NAV+2`
- **Mountaineer** 🧗 — Conqueror of peaks and cliffs. Bonus to climbing and endurance. `END+4 SUR+1`
- **Naturalist** 🔬 — Student of nature. Bonus to wildlife discovery and herb gathering. `SUR+3 NAV+2`
- **Survivalist** 🔥 — Master of wilderness survival. Bonus to crafting and resource gathering. `SUR+2 END+3`

### 🎒 Gear Crafting
Gather 6 types of materials (Wood, Stone, Rope, Herbs, Animal Fur, Crystal) from expeditions and craft survival equipment:
- Trail Backpack → +10% loot
- All-Weather Tent → +15% camping XP
- Climbing Rope → +20% climbing XP
- True Compass → +10% navigation
- Eagle Binoculars → +25% wildlife discovery
- Survival Knife → +15% survival

### 🥾 Free Activities
6 guided outdoor activities with built-in timer:
Trail Hiking, Rock Climbing, River Kayaking, Wild Camping, Wildlife Tracking, Lake Swimming. Earn XP based on activity duration.

### 📖 Nature Log
- **Wildlife Discoveries** — Track and catalog rare species (common → legendary rarity)
- **Weather Tracking** — Real-time conditions for each biome
- **AI Trail Advisor** — MiMo-powered recommendations for optimal expedition conditions

### 📊 Progress & Stats
- **3 Explorer Stats** — Endurance, Survival, Navigation (level up to 50)
- **Milestones** — 5 achievement tiers from "First Steps" to "Legendary Explorer"
- **Streak Calendar** — 28-day visual streak tracker
- **XP & Leveling** — Progressive XP curve (1.5x per level)

### 🏆 Leaderboard
Weekly rankings with animated podium for top 3. Compete with fellow explorers across all classes.

### 🎁 Reward Shop
Spend XP on boosts (Trail Map+, Energy Potion), loot boxes, cosmetics (Pixel Campfire, Eagle Companion), and hidden quests.

### 🏕️ Base Camp
Upgrade 6 camp facilities: Campfire Pit, Log Shelter, Crafting Bench, Herb Garden, Trail Flag, Map Board. Each upgrade provides passive bonuses (+XP regen, -weather penalty, +craft bonus, etc.).

---

## 🤖 MiMo AI Integration (5 Models)

| Model | Feature | How It Works |
|-------|---------|-------------|
| **MiMo Flash** | Trail Tips | AI chat during expeditions for real-time navigation and survival advice |
| **MiMo Pro** | Route Plans | Personalized expedition plans based on explorer stats + biome conditions |
| **MiMo VL** | Nature ID | Camera-based wildlife and plant identification during hikes |
| **MiMo ASR** | Voice Log | Voice-controlled expedition tracking and nature journal entries |
| **MiMo TTS** | Audio Guide | Spoken guidance during outdoor activities and camp setup |

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 14** | App Router, static export, server components |
| **TypeScript** | Strict type safety across all modules |
| **Tailwind CSS** | Utility-first styling with custom pixel-art theme |
| **Framer Motion** | Chunky step-based animations (discrete keyframes) |
| **Zustand** | Lightweight state management (expeditions, materials, gear, wildlife) |
| **Lucide React** | Consistent icon system |
| **Press Start 2P** | Authentic retro pixel font from Google Fonts |

---

## 🎨 Pixel Art Design System

WildTrail uses a distinctive retro pixel art aesthetic throughout:

- **Zero border-radius** — All elements are square/pixelated (`border-radius: 0 !important`)
- **Press Start 2P font** — Authentic 8-bit typography at small sizes (7-12px)
- **Step-based animations** — Chunky discrete keyframes (`ease: 'linear'`, `steps(3)`, `steps(5)`)
- **Scanline overlay** — CRT-style screen effect via repeating linear gradient
- **Pixel borders & shadows** — 3D depth with inset highlights + 4px drop shadows
- **8-bit color palette** — Forest green (#2d5a27), Bark brown (#5c3a1e), Sky blue (#4a90d9), Sand (#d4a574), Sunset orange (#f4a460)
- **Pixel grid background** — 16×16px subtle grid pattern
- **Pixel scrollbar** — Custom styled retro scrollbars with green/brown theme
- **Pixelated image rendering** — `image-rendering: pixelated` on all elements

---

## 📄 Pages (14 Routes)

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Pixel art hero with CSS mountains, twinkling stars, swaying trees, class showcase |
| **Auth** | `/auth` | Email authentication with pixel-styled inputs |
| **Onboarding** | `/onboarding` | 3-step flow: choose class → select home biome → ready screen |
| **Dashboard** | `/dashboard` | Base camp overview: XP bar, streak badge, stats, active expeditions, recent wildlife |
| **Map** | `/map` | Filterable expedition board with pixel world map visualization and markers |
| **Quest Detail** | `/quest/[id]` | Full expedition info: description, difficulty, loot table, survival challenges, start/complete actions |
| **Free Activity** | `/activity` | 6 outdoor activities with biome selector, live timer, pause/resume, XP calculation |
| **Nature Log** | `/journal` | Wildlife collection with rarity tiers, weather conditions, AI trail advisor |
| **Inventory** | `/inventory` | Material inventory grid + gear crafting with recipe requirements and equip system |
| **Leaderboard** | `/leaderboard` | Weekly rankings with animated podium (gold/silver/bronze) and your current position |
| **Rewards** | `/rewards` | XP shop with 8 items across 5 categories (boost, loot, cosmetic, quest, unlock) |
| **Progress** | `/progress` | Skill bars (END/SUR/NAV), milestone tracker, 28-day streak calendar, overview stats |
| **Base Camp** | `/basecamp` | 6 camp upgrades with level progress, upgrade costs, and passive bonus display |
| **404** | `/_not-found` | Default Next.js not-found page |

---

## 🗂️ Project Structure

```
wildtrail/
├── app/
│   ├── globals.css          # Pixel art theme, scanline overlay, utilities
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Landing page (hero + features + classes)
│   ├── auth/page.tsx        # Authentication
│   ├── onboarding/page.tsx  # Class + biome selection
│   ├── dashboard/page.tsx   # Main dashboard
│   ├── map/page.tsx         # Expedition board
│   ├── quest/[id]/page.tsx  # Expedition detail
│   ├── activity/page.tsx    # Free activities with timer
│   ├── journal/page.tsx     # Nature log
│   ├── inventory/page.tsx   # Gear crafting
│   ├── leaderboard/page.tsx # Rankings
│   ├── rewards/page.tsx     # XP shop
│   ├── progress/page.tsx    # Stats & milestones
│   └── basecamp/page.tsx    # Camp upgrades
├── components/
│   ├── NavBar.tsx           # Sidebar (desktop) + bottom bar (mobile)
│   ├── ExpeditionCard.tsx   # Expedition preview card
│   ├── XPBar.tsx            # Pixel progress bar
│   ├── StreakBadge.tsx      # Day streak display
│   └── BaseCampStatus.tsx   # Camp overview widget
├── lib/
│   └── store.ts             # Zustand state (expeditions, materials, gear, wildlife)
├── tailwind.config.ts       # Custom pixel-art theme + animations
├── package.json
└── README.md
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/radebkuncoro-alt/wildtrail.git
cd wildtrail

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000
```

## 📦 Production Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

---

## 📜 License

MIT — Built for MiMo Orbit 100T Token Creator Program

---

🔗 **Live:** [wildtrail-pixel.vercel.app](https://wildtrail-pixel.vercel.app)
📦 **Source:** [github.com/radebkuncoro-alt/wildtrail](https://github.com/radebkuncoro-alt/wildtrail)

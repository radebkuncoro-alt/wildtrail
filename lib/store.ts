import { create } from "zustand";

export type ExplorerClass = "ranger" | "mountaineer" | "naturalist" | "survivalist";
export type Biome = "forest" | "mountain" | "coast" | "tundra" | "desert";

export interface Material {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface Gear {
  id: string;
  name: string;
  icon: string;
  equipped: boolean;
  bonus: string;
  crafted: boolean;
}

export interface Expedition {
  id: string;
  title: string;
  description: string;
  type: "hiking" | "climbing" | "kayaking" | "camping" | "wildlife";
  difficulty: "easy" | "medium" | "hard" | "legendary";
  xpReward: number;
  distance: string;
  biome: Biome;
  completed: boolean;
  active: boolean;
  loot: string[];
  icon: string;
}

export interface WildlifeEntry {
  id: string;
  name: string;
  icon: string;
  discoveredAt: string;
  biome: Biome;
  rarity: "common" | "uncommon" | "rare" | "legendary";
}

interface ExplorerState {
  auth: { email: string; loggedIn: boolean };
  explorer: {
    name: string;
    className: ExplorerClass;
    level: number;
    xp: number;
    xpToNext: number;
    streak: number;
    lastActive: string;
    homeBiome: Biome;
  };
  stats: { endurance: number; survival: number; navigation: number };
  expeditions: Expedition[];
  materials: Material[];
  gear: Gear[];
  wildlife: WildlifeEntry[];
  activeTab: string;

  setAuth: (email: string) => void;
  logout: () => void;
  setClass: (cls: ExplorerClass) => void;
  setExplorerName: (name: string) => void;
  setHomeBiome: (biome: Biome) => void;
  addXP: (amount: number) => void;
  setActiveTab: (tab: string) => void;
  startExpedition: (id: string) => void;
  completeExpedition: (id: string) => void;
  craftGear: (id: string) => void;
  equipGear: (id: string) => void;
  addMaterial: (id: string, amount: number) => void;
  addWildlife: (entry: WildlifeEntry) => void;
}

const initialExpeditions: Expedition[] = [
  { id: "exp-1", title: "Whispering Pines Trail", description: "A gentle 5km hike through ancient pine forests. Listen for woodpeckers and watch for deer along the mossy path.", type: "hiking", difficulty: "easy", xpReward: 50, distance: "5 km", biome: "forest", completed: false, active: false, loot: ["wood", "herbs"], icon: "🌲" },
  { id: "exp-2", title: "Eagle Peak Ascent", description: "Scale the treacherous Eagle Peak. Ice patches and loose scree make this a real test of mountaineering skill.", type: "climbing", difficulty: "hard", xpReward: 200, distance: "8 km", biome: "mountain", completed: false, active: false, loot: ["stone", "crystal"], icon: "🏔️" },
  { id: "exp-3", title: "Crystal River Run", description: "Kayak down the Crystal River through Class III rapids. Keep an eye out for otters playing in the shallows.", type: "kayaking", difficulty: "medium", xpReward: 120, distance: "12 km", biome: "coast", completed: false, active: false, loot: ["rope", "crystal"], icon: "🚣" },
  { id: "exp-4", title: "Stargazer's Camp", description: "Set up camp on the mesa and observe the night sky. Rare nocturnal wildlife emerges after dark.", type: "camping", difficulty: "easy", xpReward: 80, distance: "2 km", biome: "desert", completed: false, active: false, loot: ["herbs", "stone"], icon: "⛺" },
  { id: "exp-5", title: "Bear Valley Tracking", description: "Track a family of bears through the valley. Requires stealth, patience, and knowledge of animal behavior.", type: "wildlife", difficulty: "medium", xpReward: 150, distance: "7 km", biome: "forest", completed: false, active: false, loot: ["animal_fur", "herbs"], icon: "🐻" },
  { id: "exp-6", title: "Glacier Traverse", description: "Cross the ancient glacier with crampons and ice axes. Hidden crevasses lurk beneath the snow.", type: "hiking", difficulty: "legendary", xpReward: 350, distance: "15 km", biome: "tundra", completed: false, active: false, loot: ["crystal", "stone", "rope"], icon: "🧊" },
  { id: "exp-7", title: "Canopy Walk", description: "Navigate the forest canopy via rope bridges and ziplines. Spot rare birds from the treetops.", type: "hiking", difficulty: "medium", xpReward: 100, distance: "4 km", biome: "forest", completed: false, active: false, loot: ["wood", "herbs", "rope"], icon: "🌿" },
  { id: "exp-8", title: "Tidal Pool Expedition", description: "Explore coastal tide pools teeming with life. Document starfish, anemones, and hermit crabs.", type: "wildlife", difficulty: "easy", xpReward: 60, distance: "3 km", biome: "coast", completed: false, active: false, loot: ["rope", "herbs"], icon: "🦀" },
];

const initialMaterials: Material[] = [
  { id: "wood", name: "Wood", icon: "🪵", count: 5 },
  { id: "stone", name: "Stone", icon: "🪨", count: 3 },
  { id: "rope", name: "Rope", icon: "🪢", count: 2 },
  { id: "herbs", name: "Herbs", icon: "🌿", count: 4 },
  { id: "animal_fur", name: "Animal Fur", icon: "🧶", count: 1 },
  { id: "crystal", name: "Crystal", icon: "💎", count: 0 },
];

const initialGear: Gear[] = [
  { id: "backpack", name: "Trail Backpack", icon: "🎒", equipped: true, bonus: "+10% loot", crafted: true },
  { id: "tent", name: "All-Weather Tent", icon: "⛺", equipped: false, bonus: "+15% camping XP", crafted: false },
  { id: "climbing_rope", name: "Climbing Rope", icon: "🪢", equipped: false, bonus: "+20% climbing XP", crafted: false },
  { id: "compass", name: "True Compass", icon: "🧭", equipped: false, bonus: "+10% navigation", crafted: false },
  { id: "binoculars", name: "Eagle Binoculars", icon: "🔭", equipped: false, bonus: "+25% wildlife discovery", crafted: false },
  { id: "survival_knife", name: "Survival Knife", icon: "🔪", equipped: false, bonus: "+15% survival", crafted: false },
];

const initialWildlife: WildlifeEntry[] = [
  { id: "wl-1", name: "White-Tailed Deer", icon: "🦌", discoveredAt: "2026-05-20", biome: "forest", rarity: "common" },
  { id: "wl-2", name: "Red-Tailed Hawk", icon: "🦅", discoveredAt: "2026-05-21", biome: "mountain", rarity: "uncommon" },
];

export const useStore = create<ExplorerState>((set, get) => ({
  auth: { email: "", loggedIn: false },
  explorer: { name: "", className: "ranger", level: 1, xp: 0, xpToNext: 100, streak: 7, lastActive: "2026-05-22", homeBiome: "forest" },
  stats: { endurance: 12, survival: 8, navigation: 10 },
  expeditions: initialExpeditions,
  materials: initialMaterials,
  gear: initialGear,
  wildlife: initialWildlife,
  activeTab: "dashboard",

  setAuth: (email) => set({ auth: { email, loggedIn: true } }),
  logout: () => set({ auth: { email: "", loggedIn: false } }),
  setClass: (cls) => set((s) => ({ explorer: { ...s.explorer, className: cls } })),
  setExplorerName: (name) => set((s) => ({ explorer: { ...s.explorer, name } })),
  setHomeBiome: (biome) => set((s) => ({ explorer: { ...s.explorer, homeBiome: biome } })),
  setActiveTab: (tab) => set({ activeTab: tab }),

  addXP: (amount) => set((s) => {
    let newXP = s.explorer.xp + amount;
    let newLevel = s.explorer.level;
    let xpToNext = s.explorer.xpToNext;
    while (newXP >= xpToNext) {
      newXP -= xpToNext;
      newLevel += 1;
      xpToNext = Math.floor(xpToNext * 1.5);
    }
    return { explorer: { ...s.explorer, xp: newXP, level: newLevel, xpToNext } };
  }),

  startExpedition: (id) => set((s) => ({
    expeditions: s.expeditions.map((e) => e.id === id ? { ...e, active: true } : e),
  })),

  completeExpedition: (id) => set((s) => {
    const exp = s.expeditions.find((e) => e.id === id);
    if (!exp) return s;
    const newMats = [...s.materials];
    exp.loot.forEach((matId) => {
      const mat = newMats.find((m) => m.id === matId);
      if (mat) mat.count += Math.floor(Math.random() * 3) + 1;
    });
    return {
      expeditions: s.expeditions.map((e) => e.id === id ? { ...e, completed: true, active: false } : e),
      materials: newMats,
    };
  }),

  craftGear: (id) => set((s) => ({
    gear: s.gear.map((g) => g.id === id ? { ...g, crafted: true } : g),
  })),

  equipGear: (id) => set((s) => ({
    gear: s.gear.map((g) => g.id === id ? { ...g, equipped: !g.equipped } : g),
  })),

  addMaterial: (id, amount) => set((s) => ({
    materials: s.materials.map((m) => m.id === id ? { ...m, count: m.count + amount } : m),
  })),

  addWildlife: (entry) => set((s) => ({
    wildlife: [...s.wildlife, entry],
  })),
}));

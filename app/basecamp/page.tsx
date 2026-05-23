'use client';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { useStore } from '@/lib/store';

const campUpgrades = [
  { id: 'firepit', name: 'Campfire Pit', icon: '🔥', level: 3, maxLevel: 5, desc: 'Faster energy recovery between expeditions', effect: '+10% XP regen' },
  { id: 'shelter', name: 'Log Shelter', icon: '🛖', level: 2, maxLevel: 5, desc: 'Protects from weather events', effect: '-20% weather penalty' },
  { id: 'workbench', name: 'Crafting Bench', icon: '🪵', level: 1, maxLevel: 5, desc: 'Unlock advanced gear recipes', effect: '+15% craft bonus' },
  { id: 'garden', name: 'Herb Garden', icon: '🌱', level: 1, maxLevel: 3, desc: 'Grow herbs passively over time', effect: '+2 herbs/day' },
  { id: 'flag', name: 'Trail Flag', icon: '🚩', level: 2, maxLevel: 3, desc: 'Attract rare wildlife to camp', effect: '+10% rare sightings' },
  { id: 'mapboard', name: 'Map Board', icon: '🗺️', level: 1, maxLevel: 3, desc: 'Reveal hidden expedition routes', effect: 'Unlock secret trails' },
];

const biomeEmoji: Record<string, string> = {
  forest: '🌲', mountain: '🏔️', coast: '🌊', tundra: '❄️', desert: '🏜️',
};

export default function BaseCampPage() {
  const { explorer } = useStore();

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-pixel text-lg text-wt-leaf mb-1">🏕️ BASE CAMP</h1>
          <p className="font-pixel text-[8px] text-gray-400 mb-6">
            {biomeEmoji[explorer.homeBiome]} {explorer.homeBiome.toUpperCase()} BIOME · Home sweet wilderness
          </p>
        </motion.div>

        {/* Camp Visualization */}
        <motion.div className="pixel-card p-6 mb-6 text-center"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <div className="text-6xl mb-4 space-x-2">
            <span className="animate-campfire">🔥</span>
            <span>🛖</span>
            <span>🌲</span>
            <span className="animate-tree-sway inline-block">🌲</span>
          </div>
          <p className="font-pixel text-[9px] text-wt-leaf">CAMP LEVEL 3</p>
          <div className="w-48 h-3 bg-[#1a1a2e] border-2 border-wt-bark mx-auto mt-2 overflow-hidden">
            <div className="h-full bg-wt-leaf" style={{ width: '60%' }} />
          </div>
          <p className="font-pixel text-[6px] text-gray-500 mt-1">600 / 1000 camp XP to Level 4</p>
        </motion.div>

        {/* Upgrades Grid */}
        <h3 className="font-pixel text-[9px] text-wt-sunset mb-4">⚡ CAMP UPGRADES</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {campUpgrades.map((u, i) => {
            const progress = (u.level / u.maxLevel) * 100;
            return (
              <motion.div key={u.id} className="pixel-card p-5"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{u.icon}</span>
                  <div className="flex-1">
                    <h4 className="font-pixel text-[8px] text-white mb-1">{u.name}</h4>
                    <p className="font-pixel text-[6px] text-gray-500">{u.desc}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-pixel text-[7px] text-wt-leaf">Lv.{u.level}/{u.maxLevel}</span>
                  <span className="font-pixel text-[6px] text-wt-sky">{u.effect}</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a2e] border border-wt-bark overflow-hidden mb-3">
                  <div className="h-full bg-wt-forest" style={{ width: `${progress}%` }} />
                </div>
                {u.level < u.maxLevel ? (
                  <button className="pixel-btn text-[6px] py-1 px-3 w-full">
                    UPGRADE (50 🪵 + 30 🪨)
                  </button>
                ) : (
                  <span className="font-pixel text-[6px] text-amber-400 text-center block">★ MAX LEVEL</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Camp Stats */}
        <motion.div className="pixel-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="font-pixel text-[9px] text-wt-leaf mb-4">📊 CAMP BONUSES</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'XP Bonus', value: '+25%', icon: '⭐' },
              { label: 'Loot Rate', value: '+15%', icon: '📦' },
              { label: 'Weather Shield', value: '60%', icon: '🛡️' },
              { label: 'Wildlife Lure', value: '+10%', icon: '🐾' },
            ].map(b => (
              <div key={b.label} className="bg-[#1a1a2e] border-2 border-wt-bark p-3 text-center">
                <span className="text-xl block mb-1">{b.icon}</span>
                <p className="font-pixel text-[9px] text-wt-sunset">{b.value}</p>
                <p className="font-pixel text-[6px] text-gray-500">{b.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

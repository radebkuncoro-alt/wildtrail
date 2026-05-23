'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { useStore } from '@/lib/store';

const rarityColor: Record<string, string> = {
  common: 'border-gray-500 text-gray-300',
  uncommon: 'border-green-500 text-green-300',
  rare: 'border-blue-500 text-blue-300',
  legendary: 'border-amber-500 text-amber-300',
};

const gearRecipes: Record<string, { material: string; count: number }[]> = {
  tent: [{ material: 'wood', count: 5 }, { material: 'rope', count: 3 }],
  climbing_rope: [{ material: 'rope', count: 6 }, { material: 'animal_fur', count: 2 }],
  compass: [{ material: 'crystal', count: 2 }, { material: 'stone', count: 3 }],
  binoculars: [{ material: 'crystal', count: 3 }, { material: 'wood', count: 2 }],
  survival_knife: [{ material: 'stone', count: 4 }, { material: 'wood', count: 2 }, { material: 'animal_fur', count: 1 }],
};

const gearRarity: Record<string, string> = {
  backpack: 'common', tent: 'uncommon', climbing_rope: 'uncommon',
  compass: 'rare', binoculars: 'rare', survival_knife: 'legendary',
};

export default function InventoryPage() {
  const { materials, gear, craftGear, equipGear } = useStore();
  const [tab, setTab] = useState<'gear' | 'materials'>('gear');

  const canCraft = (gearId: string) => {
    const recipe = gearRecipes[gearId];
    if (!recipe) return false;
    return recipe.every(r => {
      const mat = materials.find(m => m.id === r.material);
      return mat && mat.count >= r.count;
    });
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-pixel text-lg text-wt-sunset mb-1">🎒 SURVIVAL PACK</h1>
            <p className="font-pixel text-[8px] text-gray-400">Craft gear from gathered materials</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTab('gear')}
              className={`pixel-btn text-[7px] py-1 ${tab === 'gear' ? 'bg-wt-sunset border-wt-sand' : ''}`}>
              ⚔ GEAR
            </button>
            <button onClick={() => setTab('materials')}
              className={`pixel-btn text-[7px] py-1 ${tab === 'materials' ? 'bg-wt-trail border-wt-sand' : ''}`}>
              📦 MATS
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === 'materials' && (
            <motion.div key="mats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {materials.map(m => (
                <div key={m.id} className="pixel-card p-4 text-center">
                  <span className="text-3xl block mb-2">{m.icon}</span>
                  <p className="font-pixel text-[7px] text-gray-300 mb-1">{m.name}</p>
                  <p className="font-pixel text-lg text-wt-leaf">{m.count}</p>
                </div>
              ))}
            </motion.div>
          )}

          {tab === 'gear' && (
            <motion.div key="gear" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {gear.map((g, i) => {
                const recipe = gearRecipes[g.id];
                const craftable = canCraft(g.id);
                const rarity = gearRarity[g.id] || 'common';

                return (
                  <motion.div key={g.id} className={`pixel-card p-5 border-2 ${rarityColor[rarity]}`}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className="flex items-start gap-4">
                      <span className="text-3xl">{g.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-pixel text-[9px] text-white">{g.name}</h3>
                          <span className={`font-pixel text-[6px] px-2 py-0.5 border ${rarityColor[rarity]} uppercase`}>{rarity}</span>
                        </div>
                        <p className="font-pixel text-[7px] text-wt-sky mb-2">{g.bonus}</p>
                        {recipe && !g.crafted && (
                          <div className="flex flex-wrap gap-2 text-[6px] font-pixel">
                            {recipe.map(r => {
                              const mat = materials.find(m => m.id === r.material);
                              const has = mat && mat.count >= r.count;
                              return (
                                <span key={r.material} className={`px-2 py-1 border ${has ? 'border-green-600 text-green-300 bg-green-900/20' : 'border-red-600 text-red-300 bg-red-900/20'}`}>
                                  {mat?.icon} {mat?.count || 0}/{r.count}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      <div>
                        {g.crafted ? (
                          <button onClick={() => equipGear(g.id)}
                            className={`pixel-btn text-[7px] py-1 px-3 ${g.equipped ? 'bg-wt-leaf border-wt-leaf' : ''}`}>
                            {g.equipped ? '✓ ON' : 'EQUIP'}
                          </button>
                        ) : (
                          <button onClick={() => craftable && craftGear(g.id)}
                            disabled={!craftable}
                            className={`pixel-btn text-[7px] py-1 px-3 ${craftable ? 'bg-wt-trail border-wt-sand' : 'opacity-40 cursor-not-allowed'}`}>
                            🔨 CRAFT
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

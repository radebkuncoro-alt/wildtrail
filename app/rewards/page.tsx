'use client';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { useStore } from '@/lib/store';
import { useState } from 'react';

const rewards = [
  { id: 'r1', name: 'TRAIL MAP+', desc: 'Reveals hidden paths on expeditions', cost: 100, icon: '🗺️', type: 'boost' },
  { id: 'r2', name: 'ENERGY POTION', desc: '+50% XP for next 3 expeditions', cost: 200, icon: '🧪', type: 'boost' },
  { id: 'r3', name: 'LOOT BOX', desc: 'Random materials (3-8 per type)', cost: 300, icon: '📦', type: 'loot' },
  { id: 'r4', name: 'PIXEL CAMPFIRE', desc: 'Exclusive camp animation for base camp', cost: 150, icon: '🔥', type: 'cosmetic' },
  { id: 'r5', name: 'EAGLE COMPANION', desc: 'Eagle follows you on expeditions', cost: 500, icon: '🦅', type: 'cosmetic' },
  { id: 'r6', name: 'HIDDEN QUEST', desc: 'Unlock a secret legendary expedition', cost: 400, icon: '❓', type: 'quest' },
  { id: 'r7', name: 'BIOME TOKEN', desc: 'Unlock a new biome for exploration', cost: 350, icon: '🌍', type: 'unlock' },
  { id: 'r8', name: 'REST BONUS', desc: 'Auto-complete next easy expedition', cost: 250, icon: '💤', type: 'boost' },
];

const typeColor: Record<string, string> = {
  boost: 'border-green-500 text-green-400',
  loot: 'border-amber-500 text-amber-400',
  cosmetic: 'border-purple-500 text-purple-400',
  quest: 'border-red-500 text-red-400',
  unlock: 'border-blue-500 text-blue-400',
};

export default function RewardsPage() {
  const { explorer, addXP } = useStore();
  const [purchased, setPurchased] = useState<string[]>([]);

  const buy = (id: string, cost: number) => {
    if (explorer.xp >= cost && !purchased.includes(id)) {
      setPurchased([...purchased, id]);
      addXP(-cost);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-pixel text-lg text-amber-400 mb-1">🎁 TRAIL SHOP</h1>
            <p className="font-pixel text-[8px] text-gray-400">Spend XP on rewards and boosts</p>
          </div>
          <div className="pixel-card px-4 py-2">
            <span className="font-pixel text-[9px] text-wt-sunset">★ {explorer.xp} XP</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {rewards.map((r, i) => {
            const bought = purchased.includes(r.id);
            const affordable = explorer.xp >= r.cost;
            return (
              <motion.div key={r.id} className={`pixel-card p-5 border-2 ${typeColor[r.type]}`}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{r.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-pixel text-[9px] text-white mb-1">{r.name}</h3>
                    <p className="font-pixel text-[7px] text-gray-400 mb-2">{r.desc}</p>
                    <span className={`font-pixel text-[6px] px-2 py-0.5 border ${typeColor[r.type]} uppercase`}>{r.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-pixel text-[9px] text-wt-sunset mb-2">{r.cost} XP</p>
                    {bought ? (
                      <span className="font-pixel text-[7px] text-green-400">✓ CLAIMED</span>
                    ) : (
                      <button onClick={() => buy(r.id, r.cost)} disabled={!affordable}
                        className={`pixel-btn text-[7px] py-1 px-3 ${affordable ? '' : 'opacity-40 cursor-not-allowed'}`}>
                        BUY
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

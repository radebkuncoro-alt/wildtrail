'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import ExpeditionCard from '@/components/ExpeditionCard';
import { useStore } from '@/lib/store';

const filters = ['all', 'hiking', 'climbing', 'kayaking', 'camping', 'wildlife'];
const biomeMap: Record<string, { x: number; y: number; color: string }> = {
  forest: { x: 20, y: 35, color: '#2d5a27' },
  mountain: { x: 50, y: 20, color: '#757575' },
  coast: { x: 80, y: 60, color: '#4a90d9' },
  tundra: { x: 65, y: 10, color: '#e8e8e8' },
  desert: { x: 35, y: 70, color: '#d4a574' },
};

export default function MapPage() {
  const [filter, setFilter] = useState('all');
  const { expeditions, startExpedition, addXP } = useStore();
  const filtered = filter === 'all' ? expeditions : expeditions.filter((e) => e.type === filter);

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, ease: 'linear' }} className="mb-6">
          <h1 className="font-pixel text-lg text-wt-leaf flex items-center gap-3">🗺️ EXPEDITION MAP</h1>
          <p className="font-pixel text-[8px] text-gray-400 mt-1">Explore the wilderness. Choose your adventure.</p>
        </motion.div>

        {/* Pixel Map */}
        <motion.div
          className="pixel-card p-6 mb-6 relative overflow-hidden"
          style={{ minHeight: '280px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, delay: 0.1, ease: 'linear' }}
        >
          {/* Map background - pixel grid */}
          <div className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(45,90,39,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(45,90,39,0.3) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Biome markers */}
          {Object.entries(biomeMap).map(([biome, pos]) => (
            <motion.div
              key={biome}
              className="absolute flex flex-col items-center"
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'steps(4)' }}
            >
              <div className="w-6 h-6 flex items-center justify-center text-lg border-2" style={{ borderColor: pos.color, background: '#0f0f1a' }}>
                {biome === 'forest' ? '🌲' : biome === 'mountain' ? '🏔️' : biome === 'coast' ? '🌊' : biome === 'tundra' ? '❄️' : '🏜️'}
              </div>
              <span className="font-pixel text-[6px] text-gray-400 mt-1 uppercase">{biome}</span>
            </motion.div>
          ))}

          {/* Trail lines (pixel-style dotted) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
            <line x1="22%" y1="40%" x2="52%" y2="25%" stroke="#2d5a27" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="52%" y1="25%" x2="82%" y2="65%" stroke="#2d5a27" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="37%" y1="75%" x2="22%" y2="40%" stroke="#2d5a27" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="67%" y1="15%" x2="52%" y2="25%" stroke="#2d5a27" strokeWidth="2" strokeDasharray="4 4" />
          </svg>

          {/* Expedition markers on map */}
          {expeditions.map((exp, i) => {
            const biome = biomeMap[exp.biome];
            const offsetX = (i % 3) * 8 - 8;
            const offsetY = Math.floor(i / 3) * 6 - 3;
            return (
              <motion.div
                key={exp.id}
                className="absolute cursor-pointer"
                style={{ left: `${biome.x + offsetX}%`, top: `${biome.y + offsetY + 15}%` }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2, ease: 'steps(2)' }}
                title={exp.title}
              >
                <span className="text-sm">{exp.icon}</span>
                {exp.completed && <span className="absolute -top-1 -right-1 text-[8px]">✅</span>}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`font-pixel text-[7px] px-3 py-2 border-2 uppercase ${
                filter === f
                  ? 'border-wt-leaf bg-wt-forest text-white'
                  : 'border-gray-700 text-gray-400 hover:border-wt-bark'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Expedition list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((exp, i) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: i * 0.05, ease: 'linear' }}
            >
              <ExpeditionCard
                expedition={exp}
                onStart={() => { startExpedition(exp.id); addXP(10); }}
              />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl">🏕️</span>
            <p className="font-pixel text-[9px] text-gray-400 mt-4">No expeditions found</p>
          </div>
        )}
      </main>
    </div>
  );
}

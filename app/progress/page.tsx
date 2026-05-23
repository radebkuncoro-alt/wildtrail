'use client';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { useStore } from '@/lib/store';

const classEmoji: Record<string, string> = { ranger: '🏹', mountaineer: '🧗', naturalist: '🔬', survivalist: '🔥' };

export default function ProgressPage() {
  const { explorer, stats, expeditions, materials, wildlife } = useStore();
  const completed = expeditions.filter(e => e.completed).length;
  const totalDistance = completed * 8;
  const totalMats = materials.reduce((a, m) => a + m.count, 0);

  const statList = [
    { label: 'ENDURANCE', value: stats.endurance, max: 50, color: 'bg-red-500' },
    { label: 'SURVIVAL', value: stats.survival, max: 50, color: 'bg-wt-forest' },
    { label: 'NAVIGATION', value: stats.navigation, max: 50, color: 'bg-wt-sky' },
  ];

  const milestones = [
    { xp: 100, name: 'First Steps', icon: '🥾', done: explorer.xp >= 100 },
    { xp: 500, name: 'Trail Walker', icon: '🚶', done: explorer.xp >= 500 },
    { xp: 1000, name: 'Path Finder', icon: '🧭', done: explorer.xp >= 1000 },
    { xp: 2500, name: 'Mountain Climber', icon: '🏔️', done: explorer.xp >= 2500 },
    { xp: 5000, name: 'Legendary Explorer', icon: '⭐', done: explorer.xp >= 5000 },
  ];

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-pixel text-lg text-wt-leaf mb-1">📊 EXPLORER STATS</h1>
          <p className="font-pixel text-[8px] text-gray-400 mb-6">
            {classEmoji[explorer.className]} {explorer.name || 'Explorer'} · Lv.{explorer.level} {explorer.className.toUpperCase()}
          </p>
        </motion.div>

        {/* Overview Cards */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          {[
            { label: 'TOTAL XP', value: explorer.xp.toLocaleString(), icon: '⭐' },
            { label: 'EXPEDITIONS', value: `${completed}/${expeditions.length}`, icon: '🗺️' },
            { label: 'DISTANCE', value: `${totalDistance} km`, icon: '🥾' },
            { label: 'MATERIALS', value: totalMats, icon: '📦' },
          ].map(s => (
            <div key={s.label} className="pixel-card p-4 text-center">
              <span className="text-2xl block mb-2">{s.icon}</span>
              <p className="font-pixel text-sm text-white">{s.value}</p>
              <p className="font-pixel text-[6px] text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div className="pixel-card p-5 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="font-pixel text-[9px] text-wt-leaf mb-4">SKILL LEVELS</h3>
          <div className="space-y-4">
            {statList.map(s => (
              <div key={s.label}>
                <div className="flex justify-between mb-1">
                  <span className="font-pixel text-[7px] text-gray-300">{s.label}</span>
                  <span className="font-pixel text-[8px] text-white">{s.value}/{s.max}</span>
                </div>
                <div className="w-full h-3 bg-[#1a1a2e] border-2 border-wt-bark overflow-hidden">
                  <motion.div className={`h-full ${s.color}`}
                    initial={{ width: 0 }} animate={{ width: `${(s.value / s.max) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'linear' }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div className="pixel-card p-5 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h3 className="font-pixel text-[9px] text-amber-400 mb-4">🏆 MILESTONES</h3>
          <div className="space-y-3">
            {milestones.map(m => (
              <div key={m.xp} className={`flex items-center gap-3 p-3 border-2 ${m.done ? 'border-wt-leaf bg-wt-forest/10' : 'border-wt-bark bg-[#1a1a2e]'}`}>
                <span className="text-xl">{m.icon}</span>
                <div className="flex-1">
                  <p className={`font-pixel text-[8px] ${m.done ? 'text-wt-leaf' : 'text-gray-500'}`}>{m.name}</p>
                  <p className="font-pixel text-[6px] text-gray-600">{m.xp} XP required</p>
                </div>
                {m.done ? <span className="font-pixel text-[7px] text-green-400">✓</span> : <span className="font-pixel text-[7px] text-gray-600">🔒</span>}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Streak Calendar (simplified) */}
        <motion.div className="pixel-card p-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="font-pixel text-[9px] text-wt-sunset mb-4">🔥 STREAK: {explorer.streak} DAYS</h3>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 28 }).map((_, i) => {
              const active = i < explorer.streak;
              return <div key={i} className={`h-6 border ${active ? 'bg-wt-leaf border-wt-forest' : 'bg-[#1a1a2e] border-wt-bark'}`} />;
            })}
          </div>
          <p className="font-pixel text-[6px] text-gray-600 mt-2">Last 4 weeks · Green = active day</p>
        </motion.div>
      </main>
    </div>
  );
}

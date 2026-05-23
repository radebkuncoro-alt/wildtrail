'use client';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import XPBar from '@/components/XPBar';
import StreakBadge from '@/components/StreakBadge';
import BaseCampStatus from '@/components/BaseCampStatus';
import ExpeditionCard from '@/components/ExpeditionCard';
import { useStore } from '@/lib/store';
import { Mountain, Footprints, Compass, Heart, TrendingUp } from 'lucide-react';

const statIcons = [
  { key: 'endurance', label: 'ENDURANCE', icon: Heart, color: 'text-red-400' },
  { key: 'survival', label: 'SURVIVAL', icon: Mountain, color: 'text-wt-leaf' },
  { key: 'navigation', label: 'NAVIGATION', icon: Compass, color: 'text-wt-sky' },
];

export default function DashboardPage() {
  const { explorer, stats, expeditions, addXP, startExpedition } = useStore();
  const activeExpeditions = expeditions.filter((e) => e.active);
  const recentExpeditions = expeditions.filter((e) => !e.completed).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15, ease: 'linear' }}
          className="mb-8"
        >
          <h1 className="font-pixel text-lg text-wt-leaf flex items-center gap-3">
            🏕️ BASE CAMP
          </h1>
          <p className="font-pixel text-[8px] text-gray-400 mt-1">
            Welcome back, {explorer.name || 'Explorer'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* XP & Streak */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                className="pixel-card p-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, ease: 'linear' }}
              >
                <XPBar current={explorer.xp} max={explorer.xpToNext} level={explorer.level} />
                <div className="flex justify-between mt-2">
                  <span className="font-pixel text-[7px] text-gray-500 capitalize">{explorer.className}</span>
                  <span className="font-pixel text-[7px] text-wt-sunset">{explorer.xpToNext - explorer.xp} XP to next</span>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.15, ease: 'linear' }}
              >
                <StreakBadge days={explorer.streak} />
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              className="pixel-card p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.1, ease: 'linear' }}
            >
              <h3 className="font-pixel text-[9px] text-wt-leaf mb-4 flex items-center gap-2">
                <TrendingUp size={14} /> EXPLORER STATS
              </h3>
              <div className="space-y-4">
                {statIcons.map((s) => (
                  <div key={s.key}>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-pixel text-[7px] ${s.color} flex items-center gap-2`}>
                        <s.icon size={12} /> {s.label}
                      </span>
                      <span className="font-pixel text-[8px] text-white">
                        {stats[s.key as keyof typeof stats]}
                      </span>
                    </div>
                    <div className="w-full h-3 bg-[#1a1a2e] border-[2px] border-wt-bark overflow-hidden">
                      <motion.div
                        className={`h-full ${s.key === 'endurance' ? 'bg-red-500' : s.key === 'survival' ? 'bg-wt-forest' : 'bg-wt-sky'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats[s.key as keyof typeof stats] / 50) * 100}%` }}
                        transition={{ duration: 0.5, ease: 'linear' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Active Expeditions */}
            {activeExpeditions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15, delay: 0.2, ease: 'linear' }}
              >
                <h3 className="font-pixel text-[9px] text-wt-sunset mb-3 flex items-center gap-2">
                  ⚡ ACTIVE EXPEDITIONS
                </h3>
                <div className="space-y-3">
                  {activeExpeditions.map((exp) => (
                    <ExpeditionCard
                      key={exp.id}
                      expedition={exp}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recommended */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15, delay: 0.3, ease: 'linear' }}
            >
              <h3 className="font-pixel text-[9px] text-wt-sky mb-3 flex items-center gap-2">
                <Footprints size={14} /> RECOMMENDED TRAILS
              </h3>
              <div className="space-y-3">
                {recentExpeditions.map((exp) => (
                  <ExpeditionCard
                    key={exp.id}
                    expedition={exp}
                    onStart={() => {
                      startExpedition(exp.id);
                      addXP(10);
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: 0.1, ease: 'linear' }}
            >
              <BaseCampStatus />
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="pixel-card p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: 0.2, ease: 'linear' }}
            >
              <h3 className="font-pixel text-[9px] text-wt-leaf mb-3">⚡ QUICK ACTIONS</h3>
              <div className="space-y-2">
                <a href="/activity" className="block pixel-btn text-[7px] text-center py-2 w-full">
                  🥾 START A TREK
                </a>
                <a href="/map" className="block pixel-btn text-[7px] text-center py-2 w-full" style={{ background: '#8b6914', borderColor: '#d4a574' }}>
                  🗺️ VIEW MAP
                </a>
                <a href="/journal" className="block pixel-btn text-[7px] text-center py-2 w-full" style={{ background: '#4a90d9', borderColor: '#6ab0f9' }}>
                  📖 NATURE LOG
                </a>
              </div>
            </motion.div>

            {/* Wildlife Recent */}
            <motion.div
              className="pixel-card p-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: 0.3, ease: 'linear' }}
            >
              <h3 className="font-pixel text-[9px] text-wt-sunset mb-3">🐾 RECENT DISCOVERIES</h3>
              <div className="space-y-2">
                {useStore.getState().wildlife.slice(0, 3).map((w) => (
                  <div key={w.id} className="flex items-center gap-2">
                    <span className="text-xl">{w.icon}</span>
                    <span className="font-pixel text-[7px] text-gray-300">{w.name}</span>
                    <span className="font-pixel text-[6px] text-gray-600 ml-auto capitalize">{w.rarity}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}

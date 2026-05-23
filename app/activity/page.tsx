'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { useStore } from '@/lib/store';

const activities = [
  { id: 'hiking', name: 'TRAIL HIKING', icon: '🥾', desc: 'Follow marked trails through varied terrain', duration: '30-120 min', xpRate: '2 XP/min', color: 'bg-wt-forest' },
  { id: 'climbing', name: 'ROCK CLIMBING', icon: '🧗', desc: 'Scale natural rock formations and cliff faces', duration: '45-90 min', xpRate: '3 XP/min', color: 'bg-wt-bark' },
  { id: 'kayaking', name: 'RIVER KAYAKING', icon: '🚣', desc: 'Paddle through rivers and coastal waters', duration: '60-180 min', xpRate: '2.5 XP/min', color: 'bg-wt-sky' },
  { id: 'camping', name: 'WILD CAMPING', icon: '⛺', desc: 'Set up camp and survive the wilderness overnight', duration: '120+ min', xpRate: '1.5 XP/min', color: 'bg-wt-trail' },
  { id: 'tracking', name: 'WILDLIFE TRACKING', icon: '🐾', desc: 'Follow animal trails and observe wildlife behavior', duration: '60-120 min', xpRate: '2 XP/min', color: 'bg-wt-leaf' },
  { id: 'swimming', name: 'LAKE SWIMMING', icon: '🏊', desc: 'Swim across mountain lakes and natural pools', duration: '30-60 min', xpRate: '3 XP/min', color: 'bg-wt-water' },
];

const biomes = ['forest', 'mountain', 'coast', 'tundra', 'desert'] as const;
const biomeIcons: Record<string, string> = { forest: '🌲', mountain: '🏔️', coast: '🌊', tundra: '❄️', desert: '🏜️' };

export default function ActivityPage() {
  const { addXP, explorer } = useStore();
  const [active, setActive] = useState<string | null>(null);
  const [selectedBiome, setSelectedBiome] = useState<string>(explorer.homeBiome);
  const [timer, setTimer] = useState(0);
  const [running, setRunning] = useState(false);

  const startActivity = (id: string) => {
    setActive(id);
    setTimer(0);
    setRunning(true);
  };

  const stopActivity = () => {
    if (active) {
      const xp = Math.floor(timer / 60) * 15;
      if (xp > 0) addXP(xp);
    }
    setActive(null);
    setRunning(false);
    setTimer(0);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
          <h1 className="font-pixel text-lg text-wt-leaf mb-1">🥾 FREE TREK</h1>
          <p className="font-pixel text-[8px] text-gray-400 mb-6">Choose an activity and explore the wild</p>
        </motion.div>

        {/* Biome Selector */}
        <motion.div className="pixel-card p-4 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <h3 className="font-pixel text-[8px] text-wt-sunset mb-3">BIOME</h3>
          <div className="flex gap-2 flex-wrap">
            {biomes.map((b) => (
              <button key={b} onClick={() => setSelectedBiome(b)}
                className={`pixel-btn text-[7px] py-1 px-3 ${selectedBiome === b ? 'bg-wt-leaf border-wt-leaf' : ''}`}>
                {biomeIcons[b]} {b.toUpperCase()}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Active Timer */}
        {active && (
          <motion.div className="pixel-card p-6 mb-6 text-center pixel-glow" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <span className="text-4xl block mb-3">{activities.find(a => a.id === active)?.icon}</span>
            <h3 className="font-pixel text-sm text-wt-leaf mb-2">{activities.find(a => a.id === active)?.name}</h3>
            <p className="font-pixel text-2xl text-wt-sunset my-4">
              {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
            </p>
            <p className="font-pixel text-[7px] text-gray-400 mb-4">XP earned: ~{Math.floor(timer / 60) * 15}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setRunning(!running)} className="pixel-btn text-[8px] py-2 px-6">
                {running ? '⏸ PAUSE' : '▶ RESUME'}
              </button>
              <button onClick={stopActivity} className="pixel-btn text-[8px] py-2 px-6" style={{ background: '#8b2020', borderColor: '#cc3333' }}>
                ■ END
              </button>
            </div>
          </motion.div>
        )}

        {/* Timer interval (simulated) */}
        {running && <TimerTick onTick={() => setTimer(t => t + 1)} />}

        {/* Activity Grid */}
        {!active && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((a, i) => (
              <motion.div key={a.id} className="pixel-card p-5 cursor-pointer hover:brightness-110 transition-none"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.15 }}
                onClick={() => startActivity(a.id)}>
                <span className="text-3xl block mb-3">{a.icon}</span>
                <h3 className="font-pixel text-[9px] text-wt-leaf mb-2">{a.name}</h3>
                <p className="font-pixel text-[7px] text-gray-400 leading-relaxed mb-3">{a.desc}</p>
                <div className="flex justify-between">
                  <span className="font-pixel text-[6px] text-gray-500">⏱ {a.duration}</span>
                  <span className="font-pixel text-[6px] text-wt-sunset">★ {a.xpRate}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function TimerTick({ onTick }: { onTick: () => void }) {
  const { useEffect } = require('react');
  useEffect(() => {
    const id = setInterval(onTick, 1000);
    return () => clearInterval(id);
  }, [onTick]);
  return null;
}

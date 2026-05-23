'use client';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';

const leaderboard = [
  { rank: 1, name: 'WildFox', class: 'ranger', xp: 4200, expeditions: 28, icon: '🦊' },
  { rank: 2, name: 'PeakEagle', class: 'mountaineer', xp: 3850, expeditions: 24, icon: '🦅' },
  { rank: 3, name: 'TrailBlazer', class: 'survivalist', xp: 3600, expeditions: 22, icon: '🔥' },
  { rank: 4, name: 'OceanWolf', class: 'naturalist', xp: 3100, expeditions: 20, icon: '🐺' },
  { rank: 5, name: 'MossWalker', class: 'ranger', xp: 2900, expeditions: 18, icon: '🌿' },
  { rank: 6, name: 'StoneClimb', class: 'mountaineer', xp: 2650, expeditions: 17, icon: '🪨' },
  { rank: 7, name: 'RiverSong', class: 'naturalist', xp: 2400, expeditions: 15, icon: '🎵' },
  { rank: 8, name: 'StormRider', class: 'survivalist', xp: 2200, expeditions: 14, icon: '⛈️' },
];

const classEmoji: Record<string, string> = { ranger: '🏹', mountaineer: '🧗', naturalist: '🔬', survivalist: '🔥' };

export default function LeaderboardPage() {
  const podium = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  const podiumColors = ['border-amber-400 bg-amber-900/20', 'border-gray-400 bg-gray-800/20', 'border-amber-700 bg-amber-900/10'];
  const podiumIcons = ['🥇', '🥈', '🥉'];

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h1 className="font-pixel text-lg text-amber-400 mb-1">🏆 TRAIL RANKINGS</h1>
          <p className="font-pixel text-[8px] text-gray-400 mb-8">Weekly explorer leaderboard</p>
        </motion.div>

        {/* Podium */}
        <motion.div className="grid grid-cols-3 gap-3 mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          {[podium[1], podium[0], podium[2]].map((p, i) => (
            <div key={p.rank} className={`pixel-card p-4 text-center border-2 ${podiumColors[i]} ${i === 1 ? '-mt-4' : ''}`}>
              <span className="text-3xl block mb-1">{podiumIcons[i]}</span>
              <span className="text-2xl block mb-2">{p.icon}</span>
              <p className="font-pixel text-[8px] text-white mb-1">{p.name}</p>
              <p className="font-pixel text-[10px] text-wt-sunset">{p.xp.toLocaleString()}</p>
              <p className="font-pixel text-[6px] text-gray-500 mt-1">XP</p>
              <p className="font-pixel text-[6px] text-gray-600">{classEmoji[p.class]} {p.class}</p>
            </div>
          ))}
        </motion.div>

        {/* Rest of leaderboard */}
        <div className="space-y-2 max-w-2xl mx-auto">
          {rest.map((p, i) => (
            <motion.div key={p.rank} className="pixel-card p-3 flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
              <span className="font-pixel text-sm text-gray-500 w-8 text-center">#{p.rank}</span>
              <span className="text-xl">{p.icon}</span>
              <div className="flex-1">
                <p className="font-pixel text-[8px] text-white">{p.name}</p>
                <p className="font-pixel text-[6px] text-gray-500">{classEmoji[p.class]} {p.class} · {p.expeditions} expeditions</p>
              </div>
              <span className="font-pixel text-[9px] text-wt-sunset">{p.xp.toLocaleString()} XP</span>
            </motion.div>
          ))}
        </div>

        {/* Your position */}
        <motion.div className="pixel-card p-4 mt-6 max-w-2xl mx-auto border-2 border-wt-leaf pixel-glow"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center gap-4">
            <span className="font-pixel text-sm text-wt-leaf">#12</span>
            <span className="text-xl">🏕️</span>
            <div className="flex-1">
              <p className="font-pixel text-[8px] text-wt-leaf">YOU</p>
              <p className="font-pixel text-[6px] text-gray-500">Keep exploring to climb ranks!</p>
            </div>
            <span className="font-pixel text-[9px] text-wt-leaf">1,200 XP</span>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

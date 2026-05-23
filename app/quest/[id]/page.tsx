'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { useStore } from '@/lib/store';
import Link from 'next/link';

const diffColor: Record<string, string> = {
  easy: 'border-green-500 text-green-400',
  medium: 'border-amber-500 text-amber-400',
  hard: 'border-red-500 text-red-400',
  legendary: 'border-purple-500 text-purple-400',
};

const diffBg: Record<string, string> = {
  easy: 'bg-green-500/10', medium: 'bg-amber-500/10', hard: 'bg-red-500/10', legendary: 'bg-purple-500/10',
};

const biomeEmoji: Record<string, string> = {
  forest: '🌲', mountain: '🏔️', coast: '🌊', tundra: '❄️', desert: '🏜️',
};

export default function QuestDetailPage() {
  const params = useParams();
  const { expeditions, completeExpedition, addXP, startExpedition } = useStore();
  const exp = expeditions.find(e => e.id === params.id);

  if (!exp) {
    return (
      <div className="min-h-screen bg-[#0f0f1a]">
        <NavBar />
        <main className="md:ml-48 p-8 text-center">
          <p className="font-pixel text-[9px] text-gray-500">Expedition not found...</p>
          <Link href="/map" className="pixel-btn text-[8px] mt-4 inline-block">← BACK TO MAP</Link>
        </main>
      </div>
    );
  }

  const handleComplete = () => {
    completeExpedition(exp.id);
    addXP(exp.xpReward);
  };

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        <Link href="/map" className="font-pixel text-[7px] text-gray-500 hover:text-white mb-4 inline-block">
          ← BACK TO MAP
        </Link>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="pixel-card p-6 mb-6">
            <div className="flex items-start gap-4">
              <span className="text-5xl">{exp.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="font-pixel text-sm text-white">{exp.title}</h1>
                  <span className={`font-pixel text-[6px] px-2 py-0.5 border ${diffColor[exp.difficulty]} uppercase ${diffBg[exp.difficulty]}`}>
                    {exp.difficulty}
                  </span>
                </div>
                <p className="font-pixel text-[8px] text-gray-400 leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-4">
                  <span className="font-pixel text-[7px] text-gray-500">{biomeEmoji[exp.biome]} {exp.biome.toUpperCase()}</span>
                  <span className="font-pixel text-[7px] text-gray-500">🥾 {exp.distance}</span>
                  <span className="font-pixel text-[7px] text-gray-500 capitalize">🎯 {exp.type}</span>
                  <span className="font-pixel text-[7px] text-wt-sunset">★ {exp.xpReward} XP</span>
                </div>
              </div>
            </div>
          </div>

          {/* Loot */}
          <div className="pixel-card p-5 mb-6">
            <h3 className="font-pixel text-[9px] text-wt-sunset mb-3">📦 POTENTIAL LOOT</h3>
            <div className="flex gap-3 flex-wrap">
              {exp.loot.map(mat => (
                <div key={mat} className="bg-[#1a1a2e] border-2 border-wt-bark px-4 py-2 text-center">
                  <span className="font-pixel text-[8px] text-gray-300 capitalize">{mat.replace('_', ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Survival Challenges */}
          <div className="pixel-card p-5 mb-6">
            <h3 className="font-pixel text-[9px] text-red-400 mb-3">⚠ SURVIVAL CHALLENGES</h3>
            <div className="space-y-2">
              {exp.difficulty === 'legendary' && (
                <div className="flex items-center gap-2 p-2 bg-red-900/20 border border-red-600">
                  <span>💀</span>
                  <span className="font-pixel text-[7px] text-red-300">Extreme weather conditions — pack extra supplies</span>
                </div>
              )}
              {(exp.difficulty === 'hard' || exp.difficulty === 'legendary') && (
                <div className="flex items-center gap-2 p-2 bg-amber-900/20 border border-amber-600">
                  <span>⚡</span>
                  <span className="font-pixel text-[7px] text-amber-300">Technical terrain — climbing gear recommended</span>
                </div>
              )}
              <div className="flex items-center gap-2 p-2 bg-green-900/20 border border-green-600">
                <span>🗺️</span>
                <span className="font-pixel text-[7px] text-green-300">Navigation check — compass required</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-blue-900/20 border border-blue-600">
                <span>💧</span>
                <span className="font-pixel text-[7px] text-blue-300">Water source nearby — refill supplies</span>
              </div>
            </div>
          </div>

          {/* Status & Actions */}
          <div className="pixel-card p-5">
            {exp.completed ? (
              <div className="text-center">
                <span className="text-4xl block mb-3">✅</span>
                <p className="font-pixel text-[9px] text-green-400 mb-2">EXPEDITION COMPLETE</p>
                <p className="font-pixel text-[7px] text-gray-500">Great work, explorer! Materials have been added to your pack.</p>
              </div>
            ) : exp.active ? (
              <div className="text-center">
                <span className="text-4xl block mb-3 animate-pixel-float">🥾</span>
                <p className="font-pixel text-[9px] text-wt-sunset mb-2">EXPEDITION IN PROGRESS</p>
                <p className="font-pixel text-[7px] text-gray-400 mb-4">Stay safe out there!</p>
                <button onClick={handleComplete} className="pixel-btn text-[8px] py-2 px-8 pixel-glow">
                  ✓ MARK COMPLETE
                </button>
              </div>
            ) : (
              <div className="text-center">
                <span className="text-4xl block mb-3">{exp.icon}</span>
                <p className="font-pixel text-[9px] text-wt-leaf mb-2">READY TO DEPART?</p>
                <p className="font-pixel text-[7px] text-gray-400 mb-4">Gather your gear and begin the expedition</p>
                <button onClick={() => startExpedition(exp.id)} className="pixel-btn text-[8px] py-2 px-8 pixel-glow">
                  🚀 START EXPEDITION
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}

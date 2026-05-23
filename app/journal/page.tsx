'use client';
import { motion } from 'framer-motion';
import NavBar from '@/components/NavBar';
import { useStore } from '@/lib/store';
import { useState } from 'react';

const rarityColor: Record<string, string> = {
  common: 'text-gray-400 border-gray-600',
  uncommon: 'text-green-400 border-green-600',
  rare: 'text-blue-400 border-blue-600',
  legendary: 'text-amber-400 border-amber-600',
};

const weatherIcons: Record<string, string> = {
  sunny: '☀️', cloudy: '☁️', rainy: '🌧️', stormy: '⛈️', snowy: '🌨️', foggy: '🌫️',
};

const weatherData = [
  { type: 'sunny', temp: '24°C', wind: '5 km/h', visibility: 'Clear' },
  { type: 'cloudy', temp: '18°C', wind: '12 km/h', visibility: 'Good' },
  { type: 'rainy', temp: '14°C', wind: '20 km/h', visibility: 'Limited' },
];

export default function JournalPage() {
  const { wildlife } = useStore();
  const [tab, setTab] = useState<'wildlife' | 'weather'>('wildlife');

  return (
    <div className="min-h-screen bg-[#0f0f1a]">
      <NavBar />
      <main className="md:ml-48 p-4 md:p-8 pb-24 md:pb-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-pixel text-lg text-wt-sky mb-1">📖 NATURE LOG</h1>
            <p className="font-pixel text-[8px] text-gray-400">Your discoveries and observations</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setTab('wildlife')}
              className={`pixel-btn text-[7px] py-1 ${tab === 'wildlife' ? 'bg-wt-leaf border-wt-leaf' : ''}`}>
              🐾 WILDLIFE
            </button>
            <button onClick={() => setTab('weather')}
              className={`pixel-btn text-[7px] py-1 ${tab === 'weather' ? 'bg-wt-sky border-wt-sky' : ''}`}>
              🌤 WEATHER
            </button>
          </div>
        </motion.div>

        {tab === 'wildlife' && (
          <>
            <motion.div className="pixel-card p-4 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center justify-between">
                <span className="font-pixel text-[8px] text-wt-leaf">SPECIES DISCOVERED</span>
                <span className="font-pixel text-sm text-wt-sunset">{wildlife.length}</span>
              </div>
              <div className="w-full h-3 bg-[#1a1a2e] border-2 border-wt-bark mt-2 overflow-hidden">
                <div className="h-full bg-wt-leaf" style={{ width: `${Math.min(100, wildlife.length * 10)}%` }} />
              </div>
              <p className="font-pixel text-[6px] text-gray-500 mt-1">{wildlife.length}/50 to complete Field Guide</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wildlife.map((w, i) => (
                <motion.div key={w.id} className={`pixel-card p-4 border-2 ${rarityColor[w.rarity]}`}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{w.icon}</span>
                    <div>
                      <h3 className="font-pixel text-[8px] text-white mb-1">{w.name}</h3>
                      <p className="font-pixel text-[6px] text-gray-500 capitalize">{w.biome} · {w.rarity}</p>
                      <p className="font-pixel text-[6px] text-gray-600 mt-1">Found: {w.discoveredAt}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {wildlife.length === 0 && (
                <div className="pixel-card p-8 text-center col-span-full">
                  <span className="text-4xl block mb-3">🔍</span>
                  <p className="font-pixel text-[8px] text-gray-500">No wildlife discovered yet</p>
                  <p className="font-pixel text-[6px] text-gray-600 mt-1">Go on expeditions to find creatures</p>
                </div>
              )}
            </div>
          </>
        )}

        {tab === 'weather' && (
          <div className="space-y-4">
            <motion.div className="pixel-card p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="font-pixel text-[9px] text-wt-sky mb-4">CURRENT CONDITIONS</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {weatherData.map((w, i) => (
                  <div key={i} className="bg-[#1a1a2e] border-2 border-wt-bark p-4 text-center">
                    <span className="text-4xl block mb-2">{weatherIcons[w.type]}</span>
                    <p className="font-pixel text-[8px] text-white mb-1">{w.type.toUpperCase()}</p>
                    <p className="font-pixel text-[7px] text-wt-sunset">{w.temp}</p>
                    <p className="font-pixel text-[6px] text-gray-500 mt-2">Wind: {w.wind}</p>
                    <p className="font-pixel text-[6px] text-gray-500">Vis: {w.visibility}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div className="pixel-card p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <h3 className="font-pixel text-[9px] text-wt-leaf mb-3">🌿 AI TRAIL ADVISOR</h3>
              <div className="bg-[#1a1a2e] border-2 border-wt-bark p-4">
                <p className="font-pixel text-[7px] text-gray-300 leading-relaxed">
                  {'>'} Today is great for forest hikes. Low wind and clear skies make it ideal for wildlife tracking near water sources. Bring extra water — UV index is high.
                </p>
                <p className="font-pixel text-[6px] text-wt-leaf mt-3">Powered by MiMo AI</p>
              </div>
            </motion.div>
          </div>
        )}
      </main>
    </div>
  );
}

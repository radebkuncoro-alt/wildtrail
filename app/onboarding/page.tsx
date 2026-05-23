'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, ExplorerClass, Biome } from '@/lib/store';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const explorerClasses: { id: ExplorerClass; icon: string; name: string; desc: string; bonus: string }[] = [
  { id: 'ranger', icon: '🏹', name: 'RANGER', desc: 'Master of trails and forest paths. Keen eyes spot hidden paths and wildlife.', bonus: '+3 END, +2 NAV' },
  { id: 'mountaineer', icon: '🧗', name: 'MOUNTAINEER', desc: 'Conqueror of peaks and cliffs. Iron legs and steady grip.', bonus: '+4 END, +1 SUR' },
  { id: 'naturalist', icon: '🔬', name: 'NATURALIST', desc: 'Student of all living things. Every plant and creature tells a story.', bonus: '+3 SUR, +2 NAV' },
  { id: 'survivalist', icon: '🔥', name: 'SURVIVALIST', desc: 'Master of wilderness survival. Can craft anything from nothing.', bonus: '+2 SUR, +3 END' },
];

const biomes: { id: Biome; icon: string; name: string; desc: string }[] = [
  { id: 'forest', icon: '🌲', name: 'ANCIENT FOREST', desc: 'Dense canopy, mossy trails, hidden clearings' },
  { id: 'mountain', icon: '🏔️', name: 'HIGH PEAKS', desc: 'Rocky ridges, alpine meadows, thin air' },
  { id: 'coast', icon: '🌊', name: 'WILD COAST', desc: 'Sandy beaches, tide pools, sea cliffs' },
  { id: 'tundra', icon: '❄️', name: 'FROZEN TUNDRA', desc: 'Ice fields, aurora skies, polar wildlife' },
  { id: 'desert', icon: '🏜️', name: 'RED DESERT', desc: 'Canyons, mesa tops, slot canyons' },
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [selectedClass, setSelectedClass] = useState<ExplorerClass>('ranger');
  const [selectedBiome, setSelectedBiome] = useState<Biome>('forest');
  const [explorerName, setExplorerName] = useState('');
  const router = useRouter();
  const { setClass, setHomeBiome, setExplorerName: storeSetName } = useStore();

  const handleComplete = () => {
    setClass(selectedClass);
    setHomeBiome(selectedBiome);
    storeSetName(explorerName || 'Explorer');
    router.push('/dashboard');
  };

  const steps = [
    /* Step 0: Name + Class */
    <motion.div key="class" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.15, ease: 'linear' }}>
      <h2 className="font-pixel text-sm text-wt-leaf text-center mb-2">CHOOSE YOUR PATH</h2>
      <p className="font-pixel text-[7px] text-gray-400 text-center mb-6">Select an explorer archetype</p>

      <div className="mb-4">
        <label className="font-pixel text-[7px] text-gray-400 mb-1 block">EXPLORER NAME</label>
        <input
          type="text"
          value={explorerName}
          onChange={(e) => setExplorerName(e.target.value)}
          className="w-full pixel-input text-[9px]"
          placeholder="Enter your trail name..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {explorerClasses.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedClass(c.id)}
            className={`pixel-card p-4 text-left transition-none ${
              selectedClass === c.id ? 'border-wt-leaf pixel-glow' : ''
            }`}
          >
            <span className="text-2xl">{c.icon}</span>
            <h3 className="font-pixel text-[8px] text-white mt-2">{c.name}</h3>
            <p className="font-pixel text-[6px] text-gray-400 mt-1 leading-relaxed">{c.desc}</p>
            <p className="font-pixel text-[7px] text-wt-sky mt-2">{c.bonus}</p>
            {selectedClass === c.id && (
              <div className="absolute top-2 right-2">
                <Check size={12} className="text-wt-leaf" />
              </div>
            )}
          </button>
        ))}
      </div>
    </motion.div>,

    /* Step 1: Biome */
    <motion.div key="biome" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.15, ease: 'linear' }}>
      <h2 className="font-pixel text-sm text-wt-leaf text-center mb-2">HOME BIOME</h2>
      <p className="font-pixel text-[7px] text-gray-400 text-center mb-6">Choose your starting region</p>
      <div className="space-y-3">
        {biomes.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBiome(b.id)}
            className={`w-full pixel-card p-4 flex items-center gap-4 text-left transition-none ${
              selectedBiome === b.id ? 'border-wt-leaf pixel-glow' : ''
            }`}
          >
            <span className="text-3xl">{b.icon}</span>
            <div>
              <h3 className="font-pixel text-[9px] text-white">{b.name}</h3>
              <p className="font-pixel text-[7px] text-gray-400 mt-1">{b.desc}</p>
            </div>
            {selectedBiome === b.id && <Check size={16} className="text-wt-leaf ml-auto" />}
          </button>
        ))}
      </div>
    </motion.div>,

    /* Step 2: Ready */
    <motion.div key="ready" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.15, ease: 'linear' }}>
      <div className="text-center">
        <motion.span
          className="text-6xl block mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'steps(3)' }}
        >
          🏕️
        </motion.span>
        <h2 className="font-pixel text-sm text-wt-leaf mb-4">READY TO EXPLORE!</h2>
        <div className="pixel-card p-6 mb-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="font-pixel text-[7px] text-gray-400">NAME</span>
            <span className="font-pixel text-[8px] text-white">{explorerName || 'Explorer'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-pixel text-[7px] text-gray-400">CLASS</span>
            <span className="font-pixel text-[8px] text-wt-sunset uppercase">{selectedClass}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-pixel text-[7px] text-gray-400">BIOME</span>
            <span className="font-pixel text-[8px] text-wt-sky uppercase">{selectedBiome}</span>
          </div>
        </div>
        <p className="font-pixel text-[8px] text-gray-400 mb-6">
          Your expedition gear is packed. The wilderness awaits.
        </p>
      </div>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1628] to-[#0f0f1a] px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex justify-center gap-2 mb-8">
          {['CLASS', 'BIOME', 'READY'].map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <div className={`w-8 h-8 flex items-center justify-center font-pixel text-[8px] border-2 ${
                i <= step ? 'border-wt-leaf bg-wt-forest text-white' : 'border-gray-700 text-gray-600'
              }`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`font-pixel text-[6px] ${i <= step ? 'text-wt-leaf' : 'text-gray-600'}`}>{label}</span>
              {i < 2 && <div className={`w-6 h-[2px] ${i < step ? 'bg-wt-leaf' : 'bg-gray-700'}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {steps[step]}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {step > 0 ? (
            <button onClick={() => setStep(step - 1)} className="pixel-btn text-[8px] py-2 px-4 flex items-center gap-2">
              <ArrowLeft size={12} /> BACK
            </button>
          ) : <div />}
          {step < 2 ? (
            <button onClick={() => setStep(step + 1)} className="pixel-btn text-[8px] py-2 px-4 flex items-center gap-2">
              NEXT <ArrowRight size={12} />
            </button>
          ) : (
            <button onClick={handleComplete} className="pixel-btn text-[8px] py-2 px-6 flex items-center gap-2 pixel-glow">
              START TRAIL <ArrowRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

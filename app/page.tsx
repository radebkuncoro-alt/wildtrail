'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Compass, Mountain, TreePine, Waves, Tent, Star } from 'lucide-react';

const features = [
  { icon: Mountain, title: 'EXPEDITIONS', desc: 'Hike, climb, kayak across untamed wilderness', color: 'text-wt-forest' },
  { icon: Compass, title: 'DISCOVER', desc: 'Track and catalog rare wildlife species', color: 'text-wt-sky' },
  { icon: Tent, title: 'CRAFT', desc: 'Build survival gear from gathered materials', color: 'text-wt-sunset' },
  { icon: Star, title: 'LEVEL UP', desc: 'Gain XP and become a legendary explorer', color: 'text-wt-sand' },
];

const classes = [
  { id: 'ranger', icon: '🏹', name: 'RANGER', desc: 'Master of trails and forest paths. Bonus to hiking and wildlife tracking.', stats: 'END+3 NAV+2' },
  { id: 'mountaineer', icon: '🧗', name: 'MOUNTAINEER', desc: 'Conqueror of peaks and cliffs. Bonus to climbing and endurance.', stats: 'END+4 SUR+1' },
  { id: 'naturalist', icon: '🔬', name: 'NATURALIST', desc: 'Student of nature. Bonus to wildlife discovery and herb gathering.', stats: 'SUR+3 NAV+2' },
  { id: 'survivalist', icon: '🔥', name: 'SURVIVALIST', desc: 'Master of wilderness survival. Bonus to crafting and resource gathering.', stats: 'SUR+2 END+3' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a1628] via-[#1a2a1a] to-[#0f0f1a]">
        {/* Stars */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 50}%` }}
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: 'steps(3)' }}
          />
        ))}

        {/* Pixel Mountains */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="flex items-end justify-center gap-0">
            <div className="w-0 h-0 border-l-[60px] border-l-transparent border-r-[60px] border-r-transparent border-b-[80px] border-b-[#2d5a27] opacity-60" />
            <div className="w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[140px] border-b-[#1a3a1a] -ml-6" />
            <div className="w-0 h-0 border-l-[80px] border-l-transparent border-r-[80px] border-r-transparent border-b-[110px] border-b-[#2d5a27] -ml-8" />
            <div className="w-0 h-0 border-l-[120px] border-l-transparent border-r-[120px] border-r-transparent border-b-[170px] border-b-[#1a3a1a] -ml-10" />
            <div className="w-0 h-0 border-l-[70px] border-l-transparent border-r-[70px] border-r-transparent border-b-[90px] border-b-[#2d5a27] -ml-8 opacity-70" />
          </div>
          {/* Trees */}
          <div className="flex justify-around px-20 mb-0">
            {['🌲', '🌲', '🌲', '🌲', '🌲', '🌲', '🌲'].map((t, i) => (
              <motion.span
                key={i}
                className="text-3xl"
                animate={{ rotate: [-1, 1, -1] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.3, ease: 'steps(5)' }}
              >
                {t}
              </motion.span>
            ))}
          </div>
          <div className="h-20 bg-gradient-to-t from-[#0f0f1a] to-transparent" />
        </div>

        {/* Title */}
        <motion.div
          className="relative z-10 text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'linear' }}
        >
          <div className="mb-4">
            <span className="text-5xl">🏔️</span>
          </div>
          <h1 className="font-pixel text-xl md:text-3xl text-wt-leaf text-shadow-pixel mb-4">
            WILDTRAIL
          </h1>
          <p className="font-pixel text-[10px] md:text-xs text-wt-sand mb-2">
            Explore the Wild
          </p>
          <p className="font-pixel text-[8px] md:text-[10px] text-gray-400 mb-8">
            Craft Your Legacy
          </p>

          <Link href="/auth">
            <button className="pixel-btn text-sm px-8 py-3 pixel-glow">
              BEGIN EXPEDITION
            </button>
          </Link>

          <p className="font-pixel text-[7px] text-gray-500 mt-6">
            A pixel-art outdoor adventure
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-[#0f0f1a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-center text-sm text-wt-leaf mb-12">
            ★ TRAIL FEATURES ★
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className="pixel-card p-6"
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: 'linear' }}
                viewport={{ once: true }}
              >
                <f.icon className={`${f.color} mb-3`} size={24} />
                <h3 className="font-pixel text-[10px] text-white mb-2">{f.title}</h3>
                <p className="font-pixel text-[7px] text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Explorer Classes */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-pixel text-center text-sm text-wt-sunset mb-4">
            ★ CHOOSE YOUR PATH ★
          </h2>
          <p className="font-pixel text-center text-[8px] text-gray-400 mb-12">
            Each archetype has unique strengths
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {classes.map((c, i) => (
              <motion.div
                key={c.id}
                className="pixel-card p-5 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.1, ease: 'linear' }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.05 } }}
              >
                <span className="text-4xl block mb-3">{c.icon}</span>
                <h3 className="font-pixel text-[9px] text-wt-leaf mb-2">{c.name}</h3>
                <p className="font-pixel text-[7px] text-gray-400 leading-relaxed mb-3">{c.desc}</p>
                <div className="font-pixel text-[7px] text-wt-sky">{c.stats}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#1a1a2e] text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true }}
        >
          <span className="text-5xl block mb-6">🌲🏕️🌲</span>
          <h2 className="font-pixel text-sm text-wt-leaf mb-4">
            THE TRAIL AWAITS
          </h2>
          <p className="font-pixel text-[8px] text-gray-400 mb-8">
            Forge your path through the wilderness
          </p>
          <Link href="/auth">
            <button className="pixel-btn text-sm px-8 py-3">
              START YOUR JOURNEY
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-[#0a0a14] border-t-[3px] border-wt-forest text-center">
        <p className="font-pixel text-[7px] text-gray-600">
          WILDTRAIL v1.0 — PIXEL ADVENTURE GAME
        </p>
      </footer>
    </div>
  );
}

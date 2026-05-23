'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Expedition } from '@/lib/store';

interface ExpeditionCardProps {
  expedition: Expedition;
  onStart?: () => void;
}

const difficultyColors = {
  easy: 'border-green-500 text-green-400',
  medium: 'border-yellow-500 text-yellow-400',
  hard: 'border-orange-500 text-orange-400',
  legendary: 'border-purple-500 text-purple-400',
};

const typeLabels = {
  hiking: '🥾 Hiking',
  climbing: '🧗 Climbing',
  kayaking: '🚣 Kayaking',
  camping: '⛺ Camping',
  wildlife: '🐾 Wildlife',
};

export default function ExpeditionCard({ expedition, onStart }: ExpeditionCardProps) {
  return (
    <motion.div
      className={`pixel-card p-4 ${expedition.completed ? 'opacity-60' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'linear' }}
      whileHover={!expedition.completed ? { y: -4, transition: { duration: 0.05 } } : undefined}
    >
      <div className="flex items-start gap-3">
        <span className="text-3xl">{expedition.icon}</span>
        <div className="flex-1 min-w-0">
          <Link href={`/quest/${expedition.id}`}>
            <h3 className="font-pixel text-[9px] text-white hover:text-wt-leaf transition-none truncate">
              {expedition.title}
            </h3>
          </Link>
          <p className="font-pixel text-[7px] text-gray-400 mt-1">{typeLabels[expedition.type]}</p>
        </div>
        <span className={`font-pixel text-[7px] px-2 py-1 border-2 ${difficultyColors[expedition.difficulty]}`}>
          {expedition.difficulty.toUpperCase()}
        </span>
      </div>

      <p className="font-pixel text-[7px] text-gray-300 mt-3 leading-relaxed line-clamp-2">
        {expedition.description}
      </p>

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-3">
          <span className="font-pixel text-[7px] text-wt-sky">📏 {expedition.distance}</span>
          <span className="font-pixel text-[7px] text-wt-sunset">⭐ {expedition.xpReward} XP</span>
        </div>

        {expedition.completed ? (
          <span className="font-pixel text-[7px] text-wt-leaf">✓ DONE</span>
        ) : expedition.active ? (
          <span className="font-pixel text-[7px] text-wt-sunset animate-pixel-blink">ACTIVE</span>
        ) : (
          <button
            onClick={onStart}
            className="pixel-btn text-[7px] py-1 px-3"
          >
            START
          </button>
        )}
      </div>

      {/* Loot preview */}
      <div className="flex gap-2 mt-3 pt-2 border-t border-wt-forest/30">
        <span className="font-pixel text-[6px] text-gray-500">LOOT:</span>
        {expedition.loot.map((item) => (
          <span key={item} className="font-pixel text-[6px] text-wt-sand">{item}</span>
        ))}
      </div>
    </motion.div>
  );
}

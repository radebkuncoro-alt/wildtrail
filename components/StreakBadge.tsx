'use client';
import { motion } from 'framer-motion';

interface StreakBadgeProps {
  days: number;
}

export default function StreakBadge({ days }: StreakBadgeProps) {
  return (
    <motion.div
      className="pixel-card p-3 flex items-center gap-3"
      initial={{ scale: 0.9 }}
      animate={{ scale: 1 }}
      transition={{ type: 'tween', duration: 0.1 }}
    >
      <div className="relative">
        <span className="text-2xl">🔥</span>
        <motion.span
          className="absolute -top-1 -right-1 text-lg"
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'steps(3)' }}
        >
          ✨
        </motion.span>
      </div>
      <div>
        <p className="font-pixel text-[10px] text-wt-sunset">{days}</p>
        <p className="font-pixel text-[7px] text-gray-400">DAY STREAK</p>
      </div>
      <div className="flex gap-1 ml-auto">
        {Array.from({ length: Math.min(days, 7) }).map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-wt-ember"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, ease: 'steps(2)' }}
          />
        ))}
      </div>
    </motion.div>
  );
}

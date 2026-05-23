'use client';
import { motion } from 'framer-motion';

interface XPBarProps {
  current: number;
  max: number;
  level: number;
  showLabel?: boolean;
}

export default function XPBar({ current, max, level, showLabel = true }: XPBarProps) {
  const pct = Math.min((current / max) * 100, 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="font-pixel text-[8px] text-wt-leaf">LV.{level}</span>
          <span className="font-pixel text-[7px] text-gray-400">{current}/{max} XP</span>
        </div>
      )}
      <div className="w-full h-4 bg-[#1a1a2e] border-[2px] border-wt-bark relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-wt-forest to-wt-leaf"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: 'linear' }}
        />
        {/* Pixel segments */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-[#1a1a2e]/30" />
          ))}
        </div>
      </div>
    </div>
  );
}

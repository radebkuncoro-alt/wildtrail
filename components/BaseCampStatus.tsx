'use client';
import { motion } from 'framer-motion';
import { Tent, Compass, Shield, TreePine } from 'lucide-react';
import { useStore } from '@/lib/store';

export default function BaseCampStatus() {
  const { explorer, gear, materials } = useStore();
  const equippedGear = gear.filter((g) => g.equipped);
  const totalMats = materials.reduce((sum, m) => sum + m.count, 0);

  return (
    <div className="pixel-card p-4">
      <h3 className="font-pixel text-[9px] text-wt-leaf mb-3 flex items-center gap-2">
        <Tent size={14} /> BASE CAMP
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-pixel text-[7px] text-gray-400 flex items-center gap-2">
            <TreePine size={12} /> Biome
          </span>
          <span className="font-pixel text-[8px] text-wt-sand capitalize">
            {explorer.homeBiome}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-pixel text-[7px] text-gray-400 flex items-center gap-2">
            <Shield size={12} /> Equipped
          </span>
          <span className="font-pixel text-[8px] text-wt-sunset">
            {equippedGear.length}/{gear.length}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-pixel text-[7px] text-gray-400 flex items-center gap-2">
            <Compass size={12} /> Materials
          </span>
          <span className="font-pixel text-[8px] text-wt-sky">
            {totalMats} gathered
          </span>
        </div>
      </div>

      {/* Campfire pixel art */}
      <div className="mt-4 flex justify-center">
        <motion.div
          className="text-2xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: 'steps(3)' }}
        >
          🏕️
        </motion.div>
      </div>
    </div>
  );
}

'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Map, Home, Compass, BookOpen, Package, Trophy, Gift, TrendingUp, Tent, Activity, LogOut } from 'lucide-react';
import { useStore } from '@/lib/store';

const navItems = [
  { href: '/dashboard', label: 'Camp', icon: Home },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/activity', label: 'Trek', icon: Activity },
  { href: '/journal', label: 'Log', icon: BookOpen },
  { href: '/inventory', label: 'Pack', icon: Package },
  { href: '/leaderboard', label: 'Rank', icon: Trophy },
  { href: '/rewards', label: 'Loot', icon: Gift },
  { href: '/progress', label: 'Stats', icon: TrendingUp },
  { href: '/basecamp', label: 'Camp+', icon: Tent },
];

export default function NavBar() {
  const pathname = usePathname();
  const { explorer, logout } = useStore();

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-full w-48 flex-col bg-[#0a0a14] border-r-[3px] border-wt-forest z-50">
        <div className="p-4 border-b-[3px] border-wt-forest">
          <Link href="/dashboard">
            <h1 className="font-pixel text-[10px] text-wt-leaf leading-tight">
              WILD<br />TRAIL
            </h1>
          </Link>
          <p className="font-pixel text-[7px] text-wt-sand mt-2 truncate">
            {explorer.name || 'Explorer'} Lv.{explorer.level}
          </p>
        </div>

        <div className="flex-1 py-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`flex items-center gap-3 px-4 py-3 font-pixel text-[8px] transition-none ${
                    isActive
                      ? 'bg-wt-forest text-white border-l-[3px] border-wt-leaf'
                      : 'text-gray-400 hover:text-white hover:bg-[#1a1a2e] border-l-[3px] border-transparent'
                  }`}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  transition={{ type: 'tween', duration: 0 }}
                >
                  <Icon size={16} />
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 font-pixel text-[8px] text-red-400 hover:bg-red-900/20 border-t-[3px] border-wt-forest"
        >
          <LogOut size={16} />
          Leave
        </button>
      </nav>

      {/* Mobile bottom bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a14] border-t-[3px] border-wt-forest z-50 flex">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className="flex-1">
              <div
                className={`flex flex-col items-center py-2 font-pixel text-[6px] ${
                  isActive ? 'text-wt-leaf' : 'text-gray-500'
                }`}
              >
                <Icon size={18} />
                <span className="mt-1">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}

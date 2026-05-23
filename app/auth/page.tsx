'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { Mail, Lock, ArrowRight } from 'lucide-react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const { setAuth } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setAuth(email);
      router.push('/onboarding');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a1628] to-[#0f0f1a] px-4">
      {/* Stars */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 40}%` }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2, ease: 'steps(3)' }}
        />
      ))}

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'linear' }}
      >
        <div className="text-center mb-8">
          <span className="text-4xl">🏔️</span>
          <h1 className="font-pixel text-lg text-wt-leaf mt-4">WILDTRAIL</h1>
          <p className="font-pixel text-[8px] text-gray-400 mt-2">
            {isLogin ? 'Return to the trail' : 'Begin your adventure'}
          </p>
        </div>

        <div className="pixel-card p-6">
          <div className="flex mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 font-pixel text-[8px] py-2 border-b-[3px] ${
                isLogin ? 'border-wt-leaf text-wt-leaf' : 'border-transparent text-gray-500'
              }`}
            >
              SIGN IN
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 font-pixel text-[8px] py-2 border-b-[3px] ${
                !isLogin ? 'border-wt-leaf text-wt-leaf' : 'border-transparent text-gray-500'
              }`}
            >
              REGISTER
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-pixel text-[7px] text-gray-400 mb-1 block">
                <Mail size={10} className="inline mr-1" /> EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pixel-input text-[9px]"
                placeholder="explorer@wildtrail.com"
                required
              />
            </div>

            <div>
              <label className="font-pixel text-[7px] text-gray-400 mb-1 block">
                <Lock size={10} className="inline mr-1" /> PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pixel-input text-[9px]"
                placeholder="••••••••"
                required
              />
            </div>

            <button type="submit" className="pixel-btn w-full text-[9px] py-3 flex items-center justify-center gap-2">
              {isLogin ? 'SIGN IN' : 'REGISTER'} <ArrowRight size={14} />
            </button>
          </form>
        </div>

        <p className="font-pixel text-[6px] text-gray-600 text-center mt-6">
          Demo: any email works →
        </p>
      </motion.div>
    </div>
  );
}

import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Users,
  Heart,
  Landmark,
  Apple,
  GraduationCap,
  Factory,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

const navItems: NavItem[] = [
  { path: '/', label: 'ホーム', icon: <Home size={20} />, color: 'from-blue-500 to-cyan-500' },
  { path: '/hr', label: '人材業界', icon: <Users size={20} />, color: 'from-purple-500 to-pink-500' },
  { path: '/medical', label: '医療業界', icon: <Heart size={20} />, color: 'from-red-500 to-orange-500' },
  { path: '/finance', label: '金融業界', icon: <Landmark size={20} />, color: 'from-green-500 to-emerald-500' },
  { path: '/food', label: '食品業界', icon: <Apple size={20} />, color: 'from-orange-500 to-yellow-500' },
  { path: '/education', label: '教育業界', icon: <GraduationCap size={20} />, color: 'from-indigo-500 to-purple-500' },
  { path: '/manufacturing', label: '製造業界', icon: <Factory size={20} />, color: 'from-slate-500 to-zinc-500' },
];

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-blue-400" size={28} />
              </motion.div>
              <h1 className="text-lg sm:text-xl font-bold gradient-text">AI Business Solutions</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-slate-300">AI Active</span>
            </div>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
              aria-label="メニュー"
            >
              {menuOpen ? <X size={24} className="text-slate-300" /> : <Menu size={24} className="text-slate-300" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            {/* Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-16 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 max-h-[calc(100vh-4rem)] overflow-y-auto"
            >
              <nav className="p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`flex flex-col items-center gap-2 px-4 py-4 rounded-xl transition-all duration-300 ${
                        isActive
                          ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-slate-700/50'
                      }`}
                    >
                      <span className="text-2xl">
                        {item.icon}
                      </span>
                      <span className="font-medium text-sm text-center">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-16">
        <div className="p-4 sm:p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

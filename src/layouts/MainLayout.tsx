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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              {sidebarOpen ? <X size={24} className="text-slate-300" /> : <Menu size={24} className="text-slate-300" />}
            </button>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="text-blue-400" size={28} />
              </motion.div>
              <h1 className="text-xl font-bold gradient-text">AI Business Solutions Demo</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-slate-300">AI System Active</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed left-0 top-16 bottom-0 w-64 bg-slate-900/90 backdrop-blur-xl border-r border-slate-700/50 z-40 overflow-y-auto"
          >
            <nav className="p-4 space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-blue-500/25`
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <span className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-0'}`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';

interface AIButtonProps {
  onClick: () => void;
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export default function AIButton({
  onClick,
  loading = false,
  children,
  variant = 'primary',
  size = 'md'
}: AIButtonProps) {
  const variants = {
    primary: 'from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600',
    secondary: 'from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600',
    success: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className={`
        relative overflow-hidden rounded-xl font-bold text-white
        bg-gradient-to-r ${variants[variant]} ${sizes[size]}
        shadow-lg shadow-purple-500/25
        disabled:opacity-70 disabled:cursor-not-allowed
        transition-all duration-300
        flex items-center gap-2 justify-center
      `}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {loading ? (
        <>
          <Loader2 className="animate-spin" size={20} />
          <span>AI処理中...</span>
        </>
      ) : (
        <>
          <Sparkles size={20} />
          {children}
        </>
      )}
    </motion.button>
  );
}

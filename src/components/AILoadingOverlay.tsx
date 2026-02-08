import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Zap, CircuitBoard } from 'lucide-react';

interface AILoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

export default function AILoadingOverlay({ isLoading, message = 'AIが分析中...' }: AILoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/90 backdrop-blur-md"
        >
          <div className="relative">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 w-48 h-48"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-pink-500 shadow-lg shadow-pink-500/50" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50" />
            </motion.div>

            {/* Inner rotating ring (opposite direction) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-4 w-40 h-40"
            >
              <div className="absolute top-1/4 left-0 w-2 h-2 rounded-full bg-green-400" />
              <div className="absolute bottom-1/4 right-0 w-2 h-2 rounded-full bg-yellow-400" />
            </motion.div>

            {/* Pulsing circles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-blue-500/30"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1.5, 0.8],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                style={{ width: 192, height: 192 }}
              />
            ))}

            {/* Center brain icon */}
            <motion.div
              className="relative w-48 h-48 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <div className="absolute inset-8 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30" />
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Brain size={56} className="text-blue-400 relative z-10" />
              </motion.div>

              {/* Floating icons */}
              <motion.div
                className="absolute -top-2 -right-2"
                animate={{ y: [-5, 5, -5], rotate: [0, 180, 360] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles size={24} className="text-yellow-400" />
              </motion.div>
              <motion.div
                className="absolute -bottom-2 -left-2"
                animate={{ y: [5, -5, 5], x: [-5, 5, -5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <Zap size={20} className="text-pink-400" />
              </motion.div>
              <motion.div
                className="absolute top-0 -left-4"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              >
                <CircuitBoard size={18} className="text-cyan-400" />
              </motion.div>
            </motion.div>

            {/* Message */}
            <motion.div
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <p className="text-xl font-bold gradient-text">{message}</p>
            </motion.div>

            {/* Progress dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-blue-400"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

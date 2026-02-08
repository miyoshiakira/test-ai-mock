import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface AIResultDisplayProps {
  title: string;
  content: string;
  show: boolean;
  confidence?: number;
}

export default function AIResultDisplay({ title, content, show, confidence }: AIResultDisplayProps) {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-green-500/30 shadow-xl shadow-green-500/10"
    >
      {/* Success badge */}
      <div className="absolute top-4 right-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: 'spring' }}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30"
        >
          <CheckCircle2 size={16} className="text-green-400" />
          <span className="text-sm text-green-400 font-medium">AI生成完了</span>
        </motion.div>
      </div>

      {/* Header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="text-yellow-400" size={24} />
          </motion.div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
        {confidence && (
          <div className="mt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-slate-400">AI信頼度</span>
              <span className="text-sm font-bold text-green-400">{confidence}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${confidence}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-300 whitespace-pre-wrap leading-relaxed"
        >
          {content.split('\n').map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="mb-2"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
    </motion.div>
  );
}

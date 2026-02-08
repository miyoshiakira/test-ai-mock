import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, title, icon, className = '', hover = true }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50
        ${hover ? 'card-hover' : ''}
        ${className}
      `}
    >
      {title && (
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-700/50">
          {icon && <span className="text-blue-400">{icon}</span>}
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </motion.div>
  );
}

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Users,
  Heart,
  Landmark,
  Apple,
  GraduationCap,
  Factory,
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
  TrendingUp
} from 'lucide-react';

const industries = [
  {
    path: '/hr',
    name: '人材業界',
    icon: <Users size={32} />,
    description: 'AI職務経歴書自動生成、スキルマッチング',
    color: 'from-purple-500 to-pink-500',
    features: ['履歴書自動作成', 'スキル分析', '求人マッチング']
  },
  {
    path: '/medical',
    name: '医療業界',
    icon: <Heart size={32} />,
    description: 'AIナレッジ検索、診断支援チャットボット',
    color: 'from-red-500 to-orange-500',
    features: ['医療知識検索', '症状分析', '処方提案']
  },
  {
    path: '/finance',
    name: '金融業界',
    icon: <Landmark size={32} />,
    description: 'AI与信審査、リスク分析、不正検知',
    color: 'from-green-500 to-emerald-500',
    features: ['与信スコアリング', 'リスク予測', '不正検知']
  },
  {
    path: '/food',
    name: '食品業界',
    icon: <Apple size={32} />,
    description: 'AI需要予測、在庫最適化、品質管理',
    color: 'from-orange-500 to-yellow-500',
    features: ['需要予測', '在庫管理', '品質分析']
  },
  {
    path: '/education',
    name: '教育業界',
    icon: <GraduationCap size={32} />,
    description: 'AI学習プラン生成、理解度分析',
    color: 'from-indigo-500 to-purple-500',
    features: ['個別学習プラン', '理解度分析', '問題自動生成']
  },
  {
    path: '/manufacturing',
    name: '製造業界',
    icon: <Factory size={32} />,
    description: 'AI品質検査、予知保全、生産最適化',
    color: 'from-slate-500 to-zinc-500',
    features: ['品質検査', '予知保全', '生産計画']
  },
];

const stats = [
  { icon: <Brain size={28} />, value: '99.2%', label: 'AI精度' },
  { icon: <Zap size={28} />, value: '0.3秒', label: '平均応答時間' },
  { icon: <TrendingUp size={28} />, value: '340%', label: '生産性向上' },
];

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-12"
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center">
          <motion.div
            className="flex justify-center mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm">
              <Sparkles size={48} className="text-yellow-300" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            AI Business Solutions Demo
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            各業界でのAI活用事例をインタラクティブにデモンストレーション。
            実際の業務アプリケーションでAIがどのように活用されるかをご体験ください。
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm"
              >
                <span className="text-white/80">{stat.icon}</span>
                <div className="text-left">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Industry Cards */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">業界別AI活用デモ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.path}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={industry.path} className="block group">
                <div className="relative overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 p-6 card-hover">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${industry.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      {industry.icon}
                    </div>

                    {/* Title & Description */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {industry.name}
                    </h3>
                    <p className="text-slate-400 text-sm mb-4">
                      {industry.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {industry.features.map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 text-xs rounded-full bg-slate-700/50 text-slate-300"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center gap-2 text-blue-400 group-hover:gap-4 transition-all">
                      <span className="text-sm font-medium">デモを見る</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl bg-slate-800/30 border border-slate-700/50 p-8"
      >
        <h3 className="text-xl font-bold text-white mb-4">このデモについて</h3>
        <p className="text-slate-400 leading-relaxed">
          このデモアプリケーションは、各業界においてAI技術がどのように活用できるかを
          視覚的に示すために作成されました。各ページでは実際の業務アプリケーションを
          模したUIを通じて、AI機能の効果を体験していただけます。
          ボタンをクリックすると、ローディングアニメーションとともにAIが処理を行い、
          結果が表示されます（※実際のAI処理ではなくモックデータです）。
        </p>
      </motion.div>
    </div>
  );
}

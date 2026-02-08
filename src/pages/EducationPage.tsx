import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  Brain,
  Target,
  TrendingUp,
  Clock,
  Star,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import Card from '../components/Card';
import AIButton from '../components/AIButton';
import AILoadingOverlay from '../components/AILoadingOverlay';

const studentData = {
  name: '鈴木 健太',
  grade: '高校2年生',
  goal: '国立大学工学部合格',
  subjects: [
    { name: '数学', score: 72, trend: 'up', weak: ['微分積分', '確率'] },
    { name: '英語', score: 65, trend: 'stable', weak: ['長文読解', 'リスニング'] },
    { name: '物理', score: 58, trend: 'down', weak: ['力学', '電磁気学'] },
    { name: '化学', score: 70, trend: 'up', weak: ['有機化学'] },
  ],
  studyHours: 3.5,
  streak: 14,
};

const mockLearningPlan = [
  {
    subject: '物理',
    priority: 'high',
    tasks: [
      { title: '力学の基礎復習', duration: '45分', type: 'review' },
      { title: '運動方程式の演習問題20問', duration: '60分', type: 'practice' },
      { title: '電磁気学入門動画視聴', duration: '30分', type: 'video' },
    ],
  },
  {
    subject: '英語',
    priority: 'medium',
    tasks: [
      { title: '長文読解演習3題', duration: '45分', type: 'practice' },
      { title: 'リスニング練習', duration: '20分', type: 'audio' },
      { title: '単語暗記50語', duration: '30分', type: 'memory' },
    ],
  },
  {
    subject: '数学',
    priority: 'medium',
    tasks: [
      { title: '微分の基本公式復習', duration: '30分', type: 'review' },
      { title: '積分計算演習15問', duration: '45分', type: 'practice' },
    ],
  },
];

const mockQuestions = [
  {
    id: 1,
    question: '次の関数 f(x) = x³ - 3x² + 2x の極値を求めよ。',
    subject: '数学',
    difficulty: '標準',
    aiHint: 'f\'(x) = 0 となる x を求め、その前後での符号変化を確認しましょう。',
  },
  {
    id: 2,
    question: '質量2kgの物体に5Nの力を加えたときの加速度を求めよ。',
    subject: '物理',
    difficulty: '基礎',
    aiHint: 'ニュートンの運動の第二法則 F = ma を使います。',
  },
  {
    id: 3,
    question: '以下の英文を和訳せよ: "The development of AI has significantly impacted various industries."',
    subject: '英語',
    difficulty: '標準',
    aiHint: '「development」「significantly」「impact」がキーワードです。',
  },
];

export default function EducationPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showHint, setShowHint] = useState<number | null>(null);

  const handleGeneratePlan = () => {
    setIsGenerating(true);
    setShowPlan(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowPlan(true);
    }, 3000);
  };

  const handleGenerateQuestions = () => {
    setIsGeneratingQuestions(true);
    setShowQuestions(false);
    setTimeout(() => {
      setIsGeneratingQuestions(false);
      setShowQuestions(true);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <AILoadingOverlay isLoading={isGenerating} message="AIが学習プランを生成中..." />
      <AILoadingOverlay isLoading={isGeneratingQuestions} message="AIが問題を生成中..." />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
          <GraduationCap size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">教育業界向けAIソリューション</h1>
          <p className="text-slate-400">学習管理システム - AI個別学習支援</p>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: <BookOpen />, value: '12,345', label: '学習コンテンツ数' },
          { icon: <Brain />, value: '98.2%', label: 'AI適応精度' },
          { icon: <Clock />, value: `${studentData.studyHours}h`, label: '今日の学習時間' },
          { icon: <Star />, value: `${studentData.streak}日`, label: '連続学習日数' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-indigo-400">{stat.icon}</span>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Profile */}
        <Card title="生徒プロフィール" icon={<GraduationCap size={20} />}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
                {studentData.name[0]}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{studentData.name}</h4>
                <p className="text-slate-400 text-sm">{studentData.grade}</p>
                <p className="text-indigo-400 text-sm flex items-center gap-1">
                  <Target size={14} />
                  目標: {studentData.goal}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm text-slate-400">科目別成績</h5>
              {studentData.subjects.map((subject, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-white">{subject.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${
                        subject.score >= 70 ? 'text-green-400' :
                        subject.score >= 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {subject.score}点
                      </span>
                      {subject.trend === 'up' && <TrendingUp size={14} className="text-green-400" />}
                      {subject.trend === 'down' && <TrendingUp size={14} className="text-red-400 rotate-180" />}
                    </div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.score}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className={`h-full rounded-full ${
                        subject.score >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                        subject.score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
                        'bg-gradient-to-r from-red-500 to-pink-400'
                      }`}
                    />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {subject.weak.map((w) => (
                      <span key={w} className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300">
                        弱点: {w}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* AI Learning Plan Generator */}
        <Card title="AI学習プラン生成" icon={<Brain size={20} />}>
          <div className="space-y-4">
            <p className="text-slate-400">
              生徒の成績データ、学習履歴、目標を分析し、最適な学習プランを自動生成します。
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-slate-700/30 rounded-lg">
                <span className="text-xs text-slate-400">分析対象期間</span>
                <p className="text-white font-medium">過去30日間</p>
              </div>
              <div className="p-3 bg-slate-700/30 rounded-lg">
                <span className="text-xs text-slate-400">学習データ</span>
                <p className="text-white font-medium">156件</p>
              </div>
            </div>

            <div className="flex gap-3">
              <AIButton onClick={handleGeneratePlan} loading={isGenerating}>
                学習プラン生成
              </AIButton>
              <AIButton onClick={handleGenerateQuestions} loading={isGeneratingQuestions} variant="secondary">
                問題を生成
              </AIButton>
            </div>
          </div>
        </Card>
      </div>

      {/* Generated Learning Plan */}
      {showPlan && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="text-indigo-400" />
            AIカスタム学習プラン（本日分）
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockLearningPlan.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className={`bg-slate-800/50 rounded-xl border p-4 ${
                  plan.priority === 'high' ? 'border-red-500/30' : 'border-slate-700/50'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-bold">{plan.subject}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    plan.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {plan.priority === 'high' ? '優先' : '通常'}
                  </span>
                </div>
                <div className="space-y-2">
                  {plan.tasks.map((task, j) => (
                    <div key={j} className="flex items-start gap-2 p-2 bg-slate-700/30 rounded-lg">
                      <CheckCircle2 size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-white text-sm">{task.title}</p>
                        <p className="text-slate-500 text-xs">{task.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Generated Questions */}
      {showQuestions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="text-purple-400" />
            AI生成問題（弱点克服）
          </h3>

          <div className="space-y-4">
            {mockQuestions.map((q, i) => (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 rounded-xl border border-slate-700/50 p-4"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs">
                      {q.subject}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-slate-700 text-slate-300 text-xs">
                      {q.difficulty}
                    </span>
                  </div>
                  <span className="text-slate-500 text-sm">問{i + 1}</span>
                </div>
                <p className="text-white mb-3">{q.question}</p>
                <button
                  onClick={() => setShowHint(showHint === q.id ? null : q.id)}
                  className="flex items-center gap-2 text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  <Lightbulb size={16} />
                  {showHint === q.id ? 'ヒントを隠す' : 'AIヒントを見る'}
                </button>
                {showHint === q.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                  >
                    <p className="text-yellow-200 text-sm flex items-start gap-2">
                      <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                      {q.aiHint}
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  Briefcase,
  Star,
  Target,
  Award,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import Card from '../components/Card';
import AIButton from '../components/AIButton';
import AILoadingOverlay from '../components/AILoadingOverlay';
import AIResultDisplay from '../components/AIResultDisplay';

const mockCandidateData = {
  name: '山田 太郎',
  email: 'yamada@example.com',
  experience: '5年',
  currentRole: 'Webエンジニア',
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
};

const mockGeneratedResume = `【職務経歴概要】
Webエンジニアとして5年間の実務経験を持ち、フロントエンドからバックエンドまで幅広い技術スタックを習得。特にReact.jsを用いたSPA開発において、大規模プロジェクトのテックリードを経験。

【主な実績】
・ECサイトリニューアルプロジェクトにて、ページロード時間を60%短縮
・マイクロサービスアーキテクチャへの移行をリードし、デプロイ頻度を5倍に向上
・新人エンジニア3名のメンター担当、全員が1年以内に主力メンバーへ成長

【技術スキル】
フロントエンド: JavaScript, TypeScript, React, Vue.js
バックエンド: Node.js, Python, Go
インフラ: AWS (EC2, Lambda, S3, RDS), Docker, Kubernetes
その他: Git, CI/CD, Agile開発

【自己PR】
「技術で課題を解決する」ことに喜びを感じ、常に新しい技術へのキャッチアップを欠かしません。チームでの協働を大切にし、コードレビューや技術共有会を通じてチーム全体のスキル向上にも貢献してきました。`;

const mockMatchingResults = [
  { company: 'テックイノベーション株式会社', position: 'シニアフロントエンドエンジニア', match: 95, salary: '800-1000万円' },
  { company: 'グローバルテック・ジャパン', position: 'テックリード', match: 92, salary: '900-1200万円' },
  { company: 'スタートアップX', position: 'フルスタックエンジニア', match: 88, salary: '700-900万円' },
  { company: 'デジタルソリューションズ', position: 'Webアプリケーション開発者', match: 85, salary: '650-850万円' },
];

export default function HRPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  const [showMatching, setShowMatching] = useState(false);

  const handleGenerateResume = () => {
    setIsGenerating(true);
    setShowResume(false);
    setTimeout(() => {
      setIsGenerating(false);
      setShowResume(true);
    }, 3000);
  };

  const handleMatchJobs = () => {
    setIsMatching(true);
    setShowMatching(false);
    setTimeout(() => {
      setIsMatching(false);
      setShowMatching(true);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <AILoadingOverlay isLoading={isGenerating} message="AIが職務経歴書を生成中..." />
      <AILoadingOverlay isLoading={isMatching} message="AIが求人をマッチング中..." />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Users size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">人材業界向けAIソリューション</h1>
          <p className="text-slate-400">求職者管理システム - AI機能デモ</p>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: <FileText />, value: '1,234', label: '登録求職者数' },
          { icon: <Briefcase />, value: '456', label: 'アクティブ求人' },
          { icon: <Star />, value: '89%', label: 'マッチング成功率' },
          { icon: <Award />, value: '234', label: '今月の内定数' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-purple-400">{stat.icon}</span>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Profile Card */}
        <Card title="求職者プロフィール" icon={<Users size={20} />}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold">
                {mockCandidateData.name[0]}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{mockCandidateData.name}</h4>
                <p className="text-slate-400">{mockCandidateData.currentRole}</p>
                <p className="text-sm text-slate-500">経験年数: {mockCandidateData.experience}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">スキル</label>
              <div className="flex flex-wrap gap-2">
                {mockCandidateData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm border border-purple-500/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/50">
              <AIButton onClick={handleGenerateResume} loading={isGenerating}>
                AI職務経歴書を自動生成
              </AIButton>
            </div>
          </div>
        </Card>

        {/* AI Job Matching Card */}
        <Card title="AI求人マッチング" icon={<Target size={20} />}>
          <div className="space-y-4">
            <p className="text-slate-400">
              求職者のスキルと経験を分析し、最適な求人を自動でマッチングします。
            </p>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">分析対象スキル</span>
                <span className="text-purple-400">{mockCandidateData.skills.length}件</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">検索求人データベース</span>
                <span className="text-purple-400">12,345件</span>
              </div>
            </div>

            <AIButton onClick={handleMatchJobs} loading={isMatching} variant="success">
              AI求人マッチング実行
            </AIButton>
          </div>
        </Card>
      </div>

      {/* AI Generated Resume */}
      <AIResultDisplay
        title="AI生成 職務経歴書"
        content={mockGeneratedResume}
        show={showResume}
        confidence={97}
      />

      {/* Matching Results */}
      {showMatching && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-green-400" />
            AIマッチング結果
          </h3>
          <div className="grid gap-4">
            {mockMatchingResults.map((result, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 hover:border-green-500/30 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-white font-medium">{result.company}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
                        {result.match}% マッチ
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{result.position}</p>
                    <p className="text-purple-400 text-sm mt-1">{result.salary}</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-16 h-16 relative">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" fill="none" stroke="#334155" strokeWidth="4" />
                        <motion.circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="url(#gradient)"
                          strokeWidth="4"
                          strokeLinecap="round"
                          initial={{ strokeDasharray: '0 176' }}
                          animate={{ strokeDasharray: `${result.match * 1.76} 176` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                        {result.match}%
                      </span>
                    </div>
                    <ChevronRight className="text-slate-500 group-hover:text-green-400 transition-colors ml-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

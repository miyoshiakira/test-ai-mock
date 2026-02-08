import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Landmark,
  TrendingUp,
  AlertTriangle,
  Shield,
  CreditCard,
  PieChart,
  BarChart3,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Card from '../components/Card';
import AIButton from '../components/AIButton';
import AILoadingOverlay from '../components/AILoadingOverlay';

const applicantData = {
  id: 'APP-2024-1234',
  name: '田中 一郎',
  age: 42,
  occupation: '会社員（部長職）',
  annualIncome: 8500000,
  loanAmount: 35000000,
  loanPurpose: '住宅購入',
  employmentYears: 15,
  existingDebt: 2000000,
};

const riskFactors = [
  { label: '返済負担率', value: 28, status: 'good', threshold: 35 },
  { label: '勤続年数スコア', value: 92, status: 'excellent', threshold: 70 },
  { label: '信用情報スコア', value: 78, status: 'good', threshold: 60 },
  { label: '担保評価率', value: 85, status: 'good', threshold: 80 },
];

const transactionHistory = [
  { id: 1, date: '2024/01/15', type: '給与振込', amount: 450000, status: 'normal' },
  { id: 2, date: '2024/01/20', type: 'カード決済', amount: -25000, status: 'normal' },
  { id: 3, date: '2024/01/22', type: 'ATM出金', amount: -100000, status: 'flagged' },
  { id: 4, date: '2024/01/25', type: '公共料金', amount: -15000, status: 'normal' },
  { id: 5, date: '2024/01/28', type: '海外送金', amount: -500000, status: 'alert' },
];

export default function FinancePage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [isFraudChecking, setIsFraudChecking] = useState(false);
  const [showFraudResult, setShowFraudResult] = useState(false);

  const handleCreditAnalysis = () => {
    setIsAnalyzing(true);
    setShowResult(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3500);
  };

  const handleFraudCheck = () => {
    setIsFraudChecking(true);
    setShowFraudResult(false);
    setTimeout(() => {
      setIsFraudChecking(false);
      setShowFraudResult(true);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <AILoadingOverlay isLoading={isAnalyzing} message="AIが与信審査を実行中..." />
      <AILoadingOverlay isLoading={isFraudChecking} message="AIが不正取引を検知中..." />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <Landmark size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">金融業界向けAIソリューション</h1>
          <p className="text-slate-400">融資審査システム - AI与信・リスク分析</p>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: <CreditCard />, value: '¥12.5B', label: '本日の融資総額' },
          { icon: <PieChart />, value: '2,345', label: '審査件数' },
          { icon: <Shield />, value: '99.7%', label: '不正検知精度' },
          { icon: <BarChart3 />, value: '0.8%', label: 'デフォルト率' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-green-400">{stat.icon}</span>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applicant Info */}
        <Card title="融資申込者情報" icon={<CreditCard size={20} />}>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white text-xl font-bold">
                {applicantData.name[0]}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{applicantData.name}</h4>
                <p className="text-slate-400 text-sm">ID: {applicantData.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <span className="text-xs text-slate-400">年収</span>
                <p className="text-white font-bold">¥{applicantData.annualIncome.toLocaleString()}</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <span className="text-xs text-slate-400">融資希望額</span>
                <p className="text-green-400 font-bold">¥{applicantData.loanAmount.toLocaleString()}</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <span className="text-xs text-slate-400">勤続年数</span>
                <p className="text-white font-bold">{applicantData.employmentYears}年</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <span className="text-xs text-slate-400">既存債務</span>
                <p className="text-yellow-400 font-bold">¥{applicantData.existingDebt.toLocaleString()}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700/50">
              <AIButton onClick={handleCreditAnalysis} loading={isAnalyzing}>
                AI与信審査を実行
              </AIButton>
            </div>
          </div>
        </Card>

        {/* Risk Factors */}
        <Card title="リスク分析ダッシュボード" icon={<BarChart3 size={20} />}>
          <div className="space-y-4">
            {riskFactors.map((factor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">{factor.label}</span>
                  <span className={`font-bold ${
                    factor.status === 'excellent' ? 'text-green-400' :
                    factor.status === 'good' ? 'text-blue-400' : 'text-yellow-400'
                  }`}>
                    {factor.value}%
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.value}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className={`h-full rounded-full ${
                      factor.status === 'excellent' ? 'bg-gradient-to-r from-green-500 to-emerald-400' :
                      factor.status === 'good' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' :
                      'bg-gradient-to-r from-yellow-500 to-orange-400'
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Credit Analysis Result */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-green-500/30 p-6 shadow-xl"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="text-green-400" />
              AI与信審査結果
            </h3>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30">
              <CheckCircle2 className="text-green-400" size={20} />
              <span className="text-green-400 font-bold">承認可能</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-slate-700/30 rounded-xl">
              <div className="text-4xl font-bold text-green-400 mb-2">A</div>
              <div className="text-slate-400">信用格付け</div>
            </div>
            <div className="text-center p-6 bg-slate-700/30 rounded-xl">
              <div className="text-4xl font-bold text-white mb-2">750</div>
              <div className="text-slate-400">AIスコア</div>
            </div>
            <div className="text-center p-6 bg-slate-700/30 rounded-xl">
              <div className="text-4xl font-bold text-blue-400 mb-2">1.2%</div>
              <div className="text-slate-400">推定金利</div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-700/20 rounded-xl">
            <h4 className="font-medium text-white mb-2">AI分析コメント</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              申込者は安定した収入と長期の勤続年数を有しており、返済能力は十分と判断されます。
              既存債務の返済状況も良好であり、信用情報に問題はありません。
              融資希望額に対する返済負担率は28%と、基準値35%を下回っており、健全な範囲内です。
              総合的に判断し、融資を承認可能と判定いたします。
            </p>
          </div>
        </motion.div>
      )}

      {/* Fraud Detection Section */}
      <Card title="AI不正取引検知" icon={<Shield size={20} />}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-slate-400">過去7日間の取引履歴をAIがリアルタイム分析</p>
            <AIButton onClick={handleFraudCheck} loading={isFraudChecking} size="sm">
              不正チェック実行
            </AIButton>
          </div>

          <div className="space-y-2">
            {transactionHistory.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  tx.status === 'alert' ? 'bg-red-500/10 border-red-500/30' :
                  tx.status === 'flagged' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-slate-700/30 border-slate-600/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {tx.status === 'alert' ? (
                    <AlertTriangle className="text-red-400" size={18} />
                  ) : tx.status === 'flagged' ? (
                    <Clock className="text-yellow-400" size={18} />
                  ) : (
                    <CheckCircle2 className="text-green-400" size={18} />
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">{tx.type}</p>
                    <p className="text-slate-500 text-xs">{tx.date}</p>
                  </div>
                </div>
                <div className={`font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-white'}`}>
                  {tx.amount > 0 ? '+' : ''}¥{Math.abs(tx.amount).toLocaleString()}
                </div>
              </motion.div>
            ))}
          </div>

          {showFraudResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/30"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="text-red-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="font-bold text-red-400 mb-1">不審な取引を検知しました</h4>
                  <p className="text-slate-400 text-sm">
                    2024/01/28の海外送金について、通常の取引パターンから逸脱が検出されました。
                    過去6ヶ月間に海外送金の履歴がなく、金額も通常より大きいため、確認が必要です。
                    リスクスコア: <span className="text-red-400 font-bold">87/100</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </Card>
    </div>
  );
}

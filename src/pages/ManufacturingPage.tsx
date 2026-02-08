import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Factory,
  Camera,
  Wrench,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Activity,
  Gauge,
  Thermometer,
  Zap,
  Clock,
  Eye
} from 'lucide-react';
import Card from '../components/Card';
import AIButton from '../components/AIButton';
import AILoadingOverlay from '../components/AILoadingOverlay';

const productionLines = [
  { id: 'LINE-A', name: 'A棟ライン', status: 'running', efficiency: 94, products: 1234 },
  { id: 'LINE-B', name: 'B棟ライン', status: 'running', efficiency: 87, products: 1089 },
  { id: 'LINE-C', name: 'C棟ライン', status: 'warning', efficiency: 72, products: 856 },
  { id: 'LINE-D', name: 'D棟ライン', status: 'maintenance', efficiency: 0, products: 0 },
];

const equipmentData = [
  { id: 'EQ-001', name: 'プレス機#1', health: 92, temperature: 45, vibration: 'normal', nextMaintenance: '14日後' },
  { id: 'EQ-002', name: 'プレス機#2', health: 78, temperature: 52, vibration: 'warning', nextMaintenance: '3日後' },
  { id: 'EQ-003', name: '溶接ロボット#1', health: 95, temperature: 38, vibration: 'normal', nextMaintenance: '21日後' },
  { id: 'EQ-004', name: '検査装置#1', health: 88, temperature: 35, vibration: 'normal', nextMaintenance: '7日後' },
];

const inspectionResults = [
  { id: 'INS-001', product: 'パーツA-2345', result: 'pass', confidence: 99.8, defects: [] },
  { id: 'INS-002', product: 'パーツA-2346', result: 'pass', confidence: 98.5, defects: [] },
  { id: 'INS-003', product: 'パーツA-2347', result: 'fail', confidence: 97.2, defects: ['表面キズ', '寸法誤差'] },
  { id: 'INS-004', product: 'パーツA-2348', result: 'pass', confidence: 99.1, defects: [] },
  { id: 'INS-005', product: 'パーツA-2349', result: 'warning', confidence: 85.3, defects: ['軽微な変色'] },
];

export default function ManufacturingPage() {
  const [isInspecting, setIsInspecting] = useState(false);
  const [showInspection, setShowInspection] = useState(true);
  const [isPredicting, setIsPredicting] = useState(false);
  const [showPrediction, setShowPrediction] = useState(false);

  const handleInspection = () => {
    setIsInspecting(true);
    setShowInspection(false);
    setTimeout(() => {
      setIsInspecting(false);
      setShowInspection(true);
    }, 3000);
  };

  const handlePrediction = () => {
    setIsPredicting(true);
    setShowPrediction(false);
    setTimeout(() => {
      setIsPredicting(false);
      setShowPrediction(true);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <AILoadingOverlay isLoading={isInspecting} message="AI画像検査を実行中..." />
      <AILoadingOverlay isLoading={isPredicting} message="AI故障予測を実行中..." />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-500 to-zinc-500 flex items-center justify-center">
          <Factory size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">製造業界向けAIソリューション</h1>
          <p className="text-slate-400">工場管理システム - AI品質検査・予知保全</p>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: <Activity />, value: '4,523', label: '本日の生産数' },
          { icon: <Eye />, value: '99.7%', label: 'AI検査精度' },
          { icon: <Wrench />, value: '2件', label: '保全アラート' },
          { icon: <Gauge />, value: '87.3%', label: '総合稼働率' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-400">{stat.icon}</span>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Production Lines */}
      <Card title="生産ライン状況" icon={<Factory size={20} />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productionLines.map((line, i) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-4 rounded-xl border ${
                line.status === 'running' ? 'bg-green-500/10 border-green-500/30' :
                line.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                'bg-slate-700/30 border-slate-600/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold">{line.name}</span>
                <span className={`w-3 h-3 rounded-full ${
                  line.status === 'running' ? 'bg-green-400 animate-pulse' :
                  line.status === 'warning' ? 'bg-yellow-400 animate-pulse' :
                  'bg-slate-500'
                }`} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">稼働率</span>
                  <span className="text-white font-medium">{line.efficiency}%</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${line.efficiency}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full rounded-full ${
                      line.efficiency >= 90 ? 'bg-green-500' :
                      line.efficiency >= 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                  />
                </div>
                <div className="text-sm text-slate-400">
                  生産数: <span className="text-white">{line.products.toLocaleString()}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Vision Inspection */}
        <Card title="AI画像検査" icon={<Camera size={20} />}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">リアルタイム製品検査システム</p>
              <AIButton onClick={handleInspection} loading={isInspecting} size="sm">
                検査実行
              </AIButton>
            </div>

            {showInspection && (
              <div className="space-y-2">
                {inspectionResults.map((result, i) => (
                  <motion.div
                    key={result.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      result.result === 'pass' ? 'bg-green-500/10 border-green-500/30' :
                      result.result === 'fail' ? 'bg-red-500/10 border-red-500/30' :
                      'bg-yellow-500/10 border-yellow-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {result.result === 'pass' ? (
                        <CheckCircle2 className="text-green-400" size={18} />
                      ) : result.result === 'fail' ? (
                        <XCircle className="text-red-400" size={18} />
                      ) : (
                        <AlertTriangle className="text-yellow-400" size={18} />
                      )}
                      <div>
                        <p className="text-white text-sm font-medium">{result.product}</p>
                        {result.defects.length > 0 && (
                          <p className="text-red-400 text-xs">{result.defects.join(', ')}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`text-sm font-bold ${
                        result.confidence >= 95 ? 'text-green-400' :
                        result.confidence >= 85 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {result.confidence}%
                      </span>
                      <p className="text-slate-500 text-xs">信頼度</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Predictive Maintenance */}
        <Card title="AI予知保全" icon={<Wrench size={20} />}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-slate-400 text-sm">設備状態監視・故障予測</p>
              <AIButton onClick={handlePrediction} loading={isPredicting} size="sm" variant="secondary">
                故障予測
              </AIButton>
            </div>

            <div className="space-y-3">
              {equipmentData.map((eq, i) => (
                <motion.div
                  key={eq.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-xl border ${
                    eq.health >= 90 ? 'bg-slate-700/30 border-slate-600/30' :
                    eq.health >= 80 ? 'bg-yellow-500/10 border-yellow-500/30' :
                    'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{eq.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      eq.vibration === 'normal' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      振動: {eq.vibration === 'normal' ? '正常' : '注意'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <Gauge size={14} className="text-slate-400" />
                      <span className={`${
                        eq.health >= 90 ? 'text-green-400' :
                        eq.health >= 80 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {eq.health}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer size={14} className="text-slate-400" />
                      <span className="text-white">{eq.temperature}°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-slate-400" />
                      <span className="text-slate-300">{eq.nextMaintenance}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Prediction Result */}
      {showPrediction && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-yellow-500/30 p-6"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <AlertTriangle className="text-yellow-400" />
            AI故障予測アラート
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
              <div className="flex items-start gap-3">
                <Zap className="text-yellow-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-bold mb-1">プレス機#2 - 要注意</h4>
                  <p className="text-slate-400 text-sm mb-2">
                    振動パターンの異常を検知しました。ベアリングの摩耗が進行している可能性があります。
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-yellow-400">故障確率: 72%</span>
                    <span className="text-slate-400">推定残存寿命: 5-7日</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="text-green-400 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h4 className="text-white font-bold mb-1">推奨アクション</h4>
                  <ul className="text-slate-400 text-sm space-y-1">
                    <li>・3日以内にプレス機#2のベアリング交換を実施</li>
                    <li>・予備部品の在庫確認（ベアリングType-B）</li>
                    <li>・メンテナンス担当者へのアラート通知済み</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-slate-700/20 rounded-xl">
            <h4 className="text-white font-medium mb-2">AIによる経済効果分析</h4>
            <p className="text-slate-400 text-sm">
              予知保全による計画停止の場合、非計画停止と比較して<span className="text-green-400 font-bold">約¥2,450,000</span>のコスト削減が見込まれます。
              （停止時間の短縮: 8時間 → 2時間、緊急部品調達費用の回避）
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

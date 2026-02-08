import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Apple,
  TrendingUp,
  Package,
  Thermometer,
  Calendar,
  AlertTriangle,
  BarChart3,
  RefreshCw,
  CheckCircle2,
  Clock
} from 'lucide-react';
import Card from '../components/Card';
import AIButton from '../components/AIButton';
import AILoadingOverlay from '../components/AILoadingOverlay';

const inventoryData = [
  { id: 1, name: 'トマト', stock: 450, unit: 'kg', expiryDays: 5, demand: 'high', status: 'optimal' },
  { id: 2, name: 'キャベツ', stock: 280, unit: 'kg', expiryDays: 7, demand: 'medium', status: 'optimal' },
  { id: 3, name: 'ほうれん草', stock: 60, unit: 'kg', expiryDays: 2, demand: 'high', status: 'warning' },
  { id: 4, name: '牛乳', stock: 800, unit: 'L', expiryDays: 3, demand: 'high', status: 'warning' },
  { id: 5, name: '豚肉', stock: 150, unit: 'kg', expiryDays: 4, demand: 'medium', status: 'optimal' },
  { id: 6, name: '鶏肉', stock: 35, unit: 'kg', expiryDays: 2, demand: 'high', status: 'critical' },
];

const demandForecast = [
  { day: '月', predicted: 1200, actual: 1150 },
  { day: '火', predicted: 980, actual: 1020 },
  { day: '水', predicted: 1100, actual: 1080 },
  { day: '木', predicted: 1350, actual: 1400 },
  { day: '金', predicted: 1500, actual: 1480 },
  { day: '土', predicted: 1800, actual: null },
  { day: '日', predicted: 1650, actual: null },
];

const orderRecommendations = [
  { item: '鶏肉', currentStock: 35, recommendedOrder: 200, reason: '週末需要増加予測', urgency: 'high' },
  { item: 'ほうれん草', currentStock: 60, recommendedOrder: 150, reason: '消費期限が迫っている在庫あり', urgency: 'medium' },
  { item: '牛乳', currentStock: 800, recommendedOrder: 400, reason: '販促キャンペーン対応', urgency: 'medium' },
];

export default function FoodPage() {
  const [isForecasting, setIsForecasting] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [showOptimization, setShowOptimization] = useState(false);

  const handleForecast = () => {
    setIsForecasting(true);
    setShowForecast(false);
    setTimeout(() => {
      setIsForecasting(false);
      setShowForecast(true);
    }, 3000);
  };

  const handleOptimize = () => {
    setIsOptimizing(true);
    setShowOptimization(false);
    setTimeout(() => {
      setIsOptimizing(false);
      setShowOptimization(true);
    }, 2500);
  };

  const maxDemand = Math.max(...demandForecast.map(d => d.predicted));

  return (
    <div className="space-y-6">
      <AILoadingOverlay isLoading={isForecasting} message="AIが需要を予測中..." />
      <AILoadingOverlay isLoading={isOptimizing} message="AIが在庫を最適化中..." />

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
          <Apple size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">食品業界向けAIソリューション</h1>
          <p className="text-slate-400">在庫管理システム - AI需要予測・最適化</p>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: <Package />, value: '1,234', label: '在庫アイテム数' },
          { icon: <TrendingUp />, value: '94.5%', label: 'AI予測精度' },
          { icon: <Thermometer />, value: '-18°C', label: '冷凍庫温度' },
          { icon: <Calendar />, value: '3日', label: '平均消費期限' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-orange-400">{stat.icon}</span>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Table */}
        <Card title="リアルタイム在庫状況" icon={<Package size={20} />}>
          <div className="space-y-3">
            {inventoryData.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center justify-between p-3 rounded-xl border ${
                  item.status === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                  item.status === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30' :
                  'bg-slate-700/30 border-slate-600/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.status === 'critical' ? (
                    <AlertTriangle className="text-red-400" size={18} />
                  ) : item.status === 'warning' ? (
                    <Clock className="text-yellow-400" size={18} />
                  ) : (
                    <CheckCircle2 className="text-green-400" size={18} />
                  )}
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-slate-500 text-xs">消費期限: {item.expiryDays}日後</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{item.stock} {item.unit}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.demand === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    需要: {item.demand === 'high' ? '高' : '中'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <AIButton onClick={handleOptimize} loading={isOptimizing} size="sm">
              AI在庫最適化
            </AIButton>
          </div>
        </Card>

        {/* Demand Forecast */}
        <Card title="AI需要予測" icon={<BarChart3 size={20} />}>
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 text-sm">今週の売上予測（万円）</span>
              <AIButton onClick={handleForecast} loading={isForecasting} size="sm">
                予測更新
              </AIButton>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between h-48 gap-2">
              {demandForecast.map((day, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div className="relative w-full flex justify-center gap-1" style={{ height: '180px' }}>
                    {/* Predicted bar */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(day.predicted / maxDemand) * 100}%` }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="w-4 bg-gradient-to-t from-orange-500 to-yellow-400 rounded-t-md"
                    />
                    {/* Actual bar */}
                    {day.actual && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(day.actual / maxDemand) * 100}%` }}
                        transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                        className="w-4 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-t-md"
                      />
                    )}
                  </div>
                  <span className="text-slate-400 text-xs mt-2">{day.day}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-r from-orange-500 to-yellow-400" />
                <span className="text-slate-400">AI予測</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gradient-to-r from-blue-500 to-cyan-400" />
                <span className="text-slate-400">実績</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Forecast Result */}
      {showForecast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-orange-500/30 p-6"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <TrendingUp className="text-orange-400" />
            AI需要予測レポート
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-4 bg-slate-700/30 rounded-xl text-center">
              <div className="text-3xl font-bold text-orange-400">+18%</div>
              <div className="text-slate-400 text-sm">週末売上予測増加</div>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-xl text-center">
              <div className="text-3xl font-bold text-green-400">¥892万</div>
              <div className="text-slate-400 text-sm">今週売上予測</div>
            </div>
            <div className="p-4 bg-slate-700/30 rounded-xl text-center">
              <div className="text-3xl font-bold text-blue-400">94.5%</div>
              <div className="text-slate-400 text-sm">予測精度</div>
            </div>
          </div>
          <p className="text-slate-400 text-sm">
            天候データ、イベント情報、過去の販売データを分析した結果、今週末は通常より18%の売上増加が予測されます。
            特に肉類と野菜の需要が高まる見込みです。
          </p>
        </motion.div>
      )}

      {/* Optimization Result */}
      {showOptimization && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-green-500/30 p-6"
        >
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
            <RefreshCw className="text-green-400" />
            AI発注提案
          </h3>
          <div className="space-y-3">
            {orderRecommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-4 rounded-xl border ${
                  rec.urgency === 'high' ? 'bg-red-500/10 border-red-500/30' :
                  'bg-yellow-500/10 border-yellow-500/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-bold">{rec.item}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        rec.urgency === 'high' ? 'bg-red-500/20 text-red-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {rec.urgency === 'high' ? '緊急' : '推奨'}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mt-1">{rec.reason}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-white">
                      現在: <span className="text-yellow-400 font-bold">{rec.currentStock}kg</span>
                    </div>
                    <div className="text-green-400 font-bold">
                      発注推奨: +{rec.recommendedOrder}kg
                    </div>
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

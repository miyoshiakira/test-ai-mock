import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  Send,
  Bot,
  User,
  FileSearch,
  Pill,
  Activity,
  Stethoscope,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import Card from '../components/Card';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  sources?: string[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'assistant',
    content: 'こんにちは。医療AIアシスタントです。医療知識に関するご質問にお答えします。症状、薬剤情報、治療法などについてお気軽にお尋ねください。',
  },
];

const mockResponses: { [key: string]: { content: string; sources: string[] } } = {
  '頭痛': {
    content: `頭痛について分析しました。

【考えられる原因】
1. 緊張型頭痛（最も一般的）
   - 肩こり、ストレス、眼精疲労が原因
   - 両側性の締め付けられるような痛み

2. 片頭痛
   - 拍動性の痛み、光や音に過敏
   - 吐き気を伴うことがある

3. 群発頭痛
   - 片側の目の周りに激しい痛み
   - 涙や鼻水を伴うことがある

【推奨される対応】
・十分な休息と水分摂取
・市販の鎮痛剤（アセトアミノフェン等）
・症状が重い場合は医療機関を受診

【注意】突然の激しい頭痛、発熱を伴う頭痛、意識障害がある場合は直ちに医療機関を受診してください。`,
    sources: ['日本頭痛学会ガイドライン2021', '医学大辞典 第6版', 'UpToDate - Headache']
  },
  '糖尿病': {
    content: `糖尿病について解説します。

【疾患概要】
糖尿病はインスリンの作用不足により血糖値が慢性的に高くなる疾患です。

【分類】
1. 1型糖尿病
   - 膵臓のβ細胞が破壊されインスリン分泌が欠乏
   - インスリン治療が必須

2. 2型糖尿病
   - インスリン抵抗性と分泌低下
   - 生活習慣の改善が基本

【診断基準】
・空腹時血糖値 126mg/dL以上
・HbA1c 6.5%以上
・75gOGTT 2時間値 200mg/dL以上

【治療アプローチ】
・食事療法：適切なカロリー摂取、バランスの良い食事
・運動療法：有酸素運動を週150分以上
・薬物療法：経口血糖降下薬、インスリン注射`,
    sources: ['日本糖尿病学会 診療ガイドライン2024', 'Harrison内科学 第21版', 'ADA Standards of Care 2024']
  },
  'default': {
    content: `ご質問ありがとうございます。

入力いただいた症状・疾患について、医学データベースを検索しました。

【分析結果】
・関連する医学文献: 1,234件
・エビデンスレベル: A（強い推奨）
・最新更新日: 2024年1月

詳細な情報が必要な場合は、具体的な症状や状況をお知らせください。また、重篤な症状がある場合は、直ちに医療機関を受診してください。

※このAIは医療従事者の診断を支援するためのツールであり、最終的な診断は必ず医師が行う必要があります。`,
    sources: ['医学中央雑誌', 'PubMed', 'Cochrane Library']
  }
};

const patientData = {
  id: 'P-2024-0892',
  name: '佐藤 花子',
  age: 45,
  gender: '女性',
  bloodType: 'A型',
  allergies: ['ペニシリン系'],
  currentMeds: ['アムロジピン 5mg', 'メトホルミン 500mg'],
};

export default function MedicalPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      let response = mockResponses['default'];
      if (input.includes('頭痛')) response = mockResponses['頭痛'];
      if (input.includes('糖尿病')) response = mockResponses['糖尿病'];

      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.content,
        sources: response.sources,
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
          <Heart size={28} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">医療業界向けAIソリューション</h1>
          <p className="text-slate-400">電子カルテシステム - AI診断支援</p>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { icon: <FileSearch />, value: '2.5M', label: '医学文献数' },
          { icon: <Pill />, value: '12,345', label: '薬剤データベース' },
          { icon: <Activity />, value: '98.5%', label: 'AI診断精度' },
          { icon: <Stethoscope />, value: '156', label: '本日の診療件数' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-red-400">{stat.icon}</span>
              <div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info Card */}
        <Card title="患者情報" icon={<User size={20} />} className="lg:col-span-1">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-xl font-bold">
                {patientData.name[0]}
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{patientData.name}</h4>
                <p className="text-slate-400 text-sm">ID: {patientData.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-slate-700/30 rounded-lg p-3">
                <span className="text-slate-400">年齢</span>
                <p className="text-white font-medium">{patientData.age}歳</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3">
                <span className="text-slate-400">血液型</span>
                <p className="text-white font-medium">{patientData.bloodType}</p>
              </div>
            </div>

            <div>
              <span className="text-sm text-slate-400 flex items-center gap-2">
                <AlertTriangle size={14} className="text-yellow-400" />
                アレルギー
              </span>
              <div className="mt-1 flex flex-wrap gap-2">
                {patientData.allergies.map((allergy) => (
                  <span
                    key={allergy}
                    className="px-2 py-1 rounded-full bg-red-500/20 text-red-300 text-xs border border-red-500/30"
                  >
                    {allergy}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm text-slate-400">現在の処方薬</span>
              <div className="mt-1 space-y-1">
                {patientData.currentMeds.map((med) => (
                  <div
                    key={med}
                    className="px-3 py-2 rounded-lg bg-slate-700/30 text-slate-300 text-sm"
                  >
                    <Pill size={12} className="inline mr-2 text-blue-400" />
                    {med}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* AI Chat Interface */}
        <Card title="AIナレッジ検索チャットボット" icon={<Bot size={20} />} className="lg:col-span-2">
          <div className="flex flex-col h-[500px]">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl p-4 ${
                        message.role === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-700/50 text-slate-200'
                      }`}
                    >
                      <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                      {message.sources && (
                        <div className="mt-3 pt-3 border-t border-slate-600/50">
                          <span className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                            <BookOpen size={12} />
                            参照元
                          </span>
                          <div className="space-y-1">
                            {message.sources.map((source, i) => (
                              <span
                                key={i}
                                className="block text-xs text-blue-400 hover:underline cursor-pointer"
                              >
                                {source}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {message.role === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <User size={16} className="text-white" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-slate-700/50 rounded-2xl p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-slate-400 typing-dot" />
                      <span className="w-2 h-2 rounded-full bg-slate-400 typing-dot" />
                      <span className="w-2 h-2 rounded-full bg-slate-400 typing-dot" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="症状や疾患名を入力してください（例：頭痛、糖尿病）"
                className="flex-1 bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-red-500/50 transition-colors"
              />
              <motion.button
                onClick={handleSend}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-medium"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  Brain, 
  Clock, 
  Trophy,
  ArrowRight,
  X,
  Sparkles,
  MessageSquare,
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { Assessment } from '../types';
import { MOCK_ASSESSMENTS } from '../constants';

interface TestResultsProps {
  completedIds: Set<string>;
}

export const TestResults: React.FC<TestResultsProps> = ({ completedIds }) => {
  const [selectedResult, setSelectedResult] = useState<any | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'analytics'>('list');

  // Historical Performance Data
  const historicalData = [
    { date: 'Sep 15', score: 72 },
    { date: 'Sep 30', score: 78 },
    { date: 'Oct 05', score: 85 },
    { date: 'Oct 15', score: 82 },
    { date: 'Oct 20', score: 92 },
    { date: 'Oct 24', score: 88 },
  ];

  // Topic Breakdown Data
  const topicBreakdown = [
    { topic: 'Algebra', score: 92, status: 'Mastered' },
    { topic: 'Geometry', score: 75, status: 'Review Needed' },
    { topic: 'Calculus', score: 88, status: 'Proficient' },
    { topic: 'Statistics', score: 65, status: 'Struggling' },
  ];

  // Mock results for demonstration if none are completed, or use completed ones
  const results = MOCK_ASSESSMENTS.filter(a => completedIds.has(a.id)).map(a => ({
    ...a,
    score: 85 + Math.floor(Math.random() * 15),
    date: 'Oct 24, 2025',
    timeSpent: '18m 45s',
    strength: 'Algebraic Manipulation',
    weakness: 'Word Problems'
  }));

  // If no real results, show some mock ones for the demo
  const displayResults = results.length > 0 ? results : [
    {
      id: 'mock-1',
      title: 'Algebra Fundamentals Quiz',
      subject: 'Mathematics',
      score: 92,
      date: 'Oct 20, 2025',
      timeSpent: '15m 20s',
      strength: 'Linear Equations',
      weakness: 'Graphing',
      questions: MOCK_ASSESSMENTS[0].questions
    },
    {
      id: 'mock-2',
      title: 'Cell Biology Midterm',
      subject: 'Biology',
      score: 78,
      date: 'Oct 15, 2025',
      timeSpent: '42m 10s',
      strength: 'Cell Structures',
      weakness: 'Mitosis Phases',
      questions: MOCK_ASSESSMENTS[0].questions
    }
  ];

  const handleExplain = (result: any) => {
    setSelectedResult(result);
    setIsExplaining(true);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Test Results</h2>
          <p className="text-slate-500 mt-1">Review your performance and get AI-powered insights.</p>
        </div>
        <div className="flex p-1 bg-slate-100 rounded-xl self-start">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            History
          </button>
          <button 
            onClick={() => setViewMode('analytics')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Analytics
          </button>
        </div>
      </div>

      {viewMode === 'analytics' ? (
        <div className="space-y-8">
          {/* Historical Performance Chart */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Historical Performance</h3>
                <p className="text-sm text-slate-500">Your score progression over the last 2 months.</p>
              </div>
              <TrendingUp size={20} className="text-teal-600" />
            </div>
            <div className="h-64 sm:h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} domain={[0, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="score" stroke="#0d9488" strokeWidth={4} dot={{ r: 6, fill: '#0d9488', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Topic Breakdown */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900">Topic-Level Breakdown</h3>
                <BarChart3 size={20} className="text-teal-600" />
              </div>
              <div className="space-y-6">
                {topicBreakdown.map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-700">{item.topic}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'Mastered' ? 'text-emerald-600' : 
                        item.status === 'Proficient' ? 'text-blue-600' : 
                        item.status === 'Review Needed' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        {item.status} ({item.score}%)
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-1000 ${
                          item.score >= 90 ? 'bg-emerald-500' : 
                          item.score >= 80 ? 'bg-blue-500' : 
                          item.score >= 70 ? 'bg-amber-500' : 'bg-rose-500'
                        }`} 
                        style={{ width: `${item.score}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Brain size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles size={20} className="text-teal-400" />
                  AI Recommendations
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <h4 className="font-bold text-sm mb-1">Focus on Statistics</h4>
                    <p className="text-xs text-white/60 leading-relaxed">Your performance in Statistics is currently at 65%. We recommend spending 30 more minutes on "Probability Basics".</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <h4 className="font-bold text-sm mb-1">Mastery Maintenance</h4>
                    <p className="text-xs text-white/60 leading-relaxed">You've mastered Algebra! Take a quick 5-minute review quiz next week to keep it fresh.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {displayResults.map((result, idx) => (
            <motion.div 
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4 sm:gap-6">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                    result.score >= 90 ? 'bg-emerald-50 text-emerald-600' : 
                    result.score >= 80 ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                  }`}>
                    <span className="text-xl sm:text-2xl font-black">{result.score}%</span>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
                        {result.subject}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                        <Clock size={12} /> {result.date}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-teal-700 transition-colors truncate">
                      {result.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span className="text-xs text-slate-500 font-medium">Strength: {result.strength}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        <span className="text-xs text-slate-500 font-medium">Focus Area: {result.weakness}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleExplain(result)}
                    className="flex-1 sm:flex-none px-6 py-3 bg-teal-50 text-teal-700 rounded-xl font-bold text-sm hover:bg-teal-100 transition-all flex items-center justify-center gap-2 border border-teal-100"
                  >
                    <Sparkles size={18} />
                    Explanation
                  </button>
                  <button className="p-3 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Explanation Modal */}
      <AnimatePresence>
        {isExplaining && selectedResult && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExplaining(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 sm:p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-900/20">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">AI Performance Insights</h2>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-widest">{selectedResult.title}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsExplaining(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-xl transition-all shadow-sm"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8 no-scrollbar">
                {/* Summary Section */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Score</p>
                    <p className="text-2xl font-black text-emerald-900">{selectedResult.score}%</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Time Spent</p>
                    <p className="text-2xl font-black text-blue-900">{selectedResult.timeSpent}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                    <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1">Mastery</p>
                    <p className="text-2xl font-black text-purple-900">High</p>
                  </div>
                </div>

                {/* Detailed Explanation */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 text-slate-900">
                    <MessageSquare size={20} className="text-teal-600" />
                    <h3 className="font-bold">AI Feedback & Explanations</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 relative">
                      <div className="absolute -left-2 top-6 w-4 h-4 bg-slate-50 border-l border-t border-slate-100 rotate-[-45deg]" />
                      <p className="text-sm text-slate-700 leading-relaxed">
                        Excellent work on the <span className="font-bold text-teal-700">{selectedResult.strength}</span> section. You demonstrated a deep understanding of the core concepts, particularly in how you approached the multi-step problems.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100 relative">
                      <div className="absolute -left-2 top-6 w-4 h-4 bg-amber-50 border-l border-t border-amber-100 rotate-[-45deg]" />
                      <p className="text-sm text-amber-900 leading-relaxed">
                        Regarding <span className="font-bold text-amber-700">{selectedResult.weakness}</span>, your results suggest a minor confusion between the conceptual framework and its practical application. I recommend reviewing the "Advanced Applications" lesson in Module 3.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Question Breakdown */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-slate-900">Key Question Explanations</h4>
                  <div className="space-y-3">
                    {[
                      { q: "What is the primary function of mitochondria?", status: "correct", explanation: "You correctly identified that mitochondria are the powerhouses of the cell, converting nutrients into energy (ATP). This is a fundamental concept you've mastered." },
                      { q: "Explain the process of osmosis in plant cells.", status: "incorrect", explanation: "You missed the specific role of the semi-permeable membrane. Osmosis is the movement of water molecules from a region of higher water potential to a region of lower water potential through a partially permeable membrane." }
                    ].map((item, i) => (
                      <div key={i} className="p-4 rounded-xl border border-slate-100 bg-white">
                        <div className="flex items-start gap-3 mb-2">
                          <div className={`mt-1 shrink-0 ${item.status === 'correct' ? 'text-emerald-500' : 'text-rose-500'}`}>
                            <CheckCircle2 size={16} />
                          </div>
                          <p className="text-sm font-bold text-slate-800">{item.q}</p>
                        </div>
                        <p className="text-xs text-slate-500 ml-7 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                          <span className="font-bold text-teal-600 block mb-1">AI Explanation:</span>
                          {item.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 flex gap-4">
                <button 
                  onClick={() => setIsExplaining(false)}
                  className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                >
                  Got it, thanks!
                </button>
                <button className="flex-1 py-4 bg-white text-teal-700 border border-teal-200 rounded-2xl font-bold hover:bg-teal-50 transition-all flex items-center justify-center gap-2">
                  <Sparkles size={18} />
                  Ask AI Tutor
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


import React from 'react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  Brain, 
  Target, 
  Zap, 
  AlertTriangle, 
  CheckCircle2,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  ChevronRight,
  MessageSquare,
  Search,
  Sparkles,
  Filter,
  Calendar,
  FileText,
  Lightbulb,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_STUDENTS, MOCK_BATCHES } from '../constants';
import { Student } from '../types';

export const ResearchInsights: React.FC = () => {
  const [viewMode, setViewMode] = React.useState<'classes' | 'students'>('classes');
  const [selectedStudent, setSelectedStudent] = React.useState<Student | null>(null);
  const [selectedBatch, setSelectedBatch] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [batchFilter, setBatchFilter] = React.useState('All Batches');
  const [compareBatch1, setCompareBatch1] = React.useState(MOCK_BATCHES[0]?.id || '');
  const [compareBatch2, setCompareBatch2] = React.useState(MOCK_BATCHES[1]?.id || '');

  // Subject Mastery Data
  const subjectMastery = [
    { subject: 'Mathematics', mastery: 78, difficulty: 85 },
    { subject: 'Physics', mastery: 65, difficulty: 92 },
    { subject: 'Biology', mastery: 82, difficulty: 60 },
    { subject: 'English', mastery: 88, difficulty: 45 },
    { subject: 'Chemistry', mastery: 72, difficulty: 75 },
    { subject: 'History', mastery: 90, difficulty: 30 },
  ];

  // Retention Risk Factors
  const riskFactors = [
    { name: 'Low Engagement', value: 45, color: '#f43f5e' },
    { name: 'Poor Test Scores', value: 30, color: '#fbbf24' },
    { name: 'Late Submissions', value: 25, color: '#10b981' },
  ];

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Research & Advanced Insights</h1>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex p-1 bg-slate-100 rounded-xl">
              <button 
                onClick={() => setViewMode('classes')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'classes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Classes
              </button>
              <button 
                onClick={() => {
                  setViewMode('students');
                  setSelectedStudent(null);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'students' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Students
              </button>
            </div>
            <span className="text-slate-400 font-medium">•</span>
            <p className="text-slate-500 text-sm">Deep-dive analytics and predictive modeling</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-100 flex items-center gap-2">
            <Zap size={14} className="animate-pulse" />
            AI Model: Enara-V4 Active
          </span>
        </div>
      </div>

      {/* High Level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        {[
          { label: 'Retention Rate', value: '94.2%', trend: '+0.8%', icon: Target, color: 'text-teal-600', bg: 'bg-teal-50' },
          { label: 'Avg. Mastery', value: '78.5%', trend: '+2.4%', icon: Brain, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Engagement Score', value: '8.4/10', trend: '-0.2%', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Risk Index', value: 'Low', trend: 'Stable', icon: AlertTriangle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Teacher Hours Saved', value: '1,240h', trend: '+12%', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((kpi, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center`}>
                <kpi.icon size={20} className="sm:w-6 sm:h-6" />
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">{kpi.trend}</span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-slate-500">{kpi.label}</p>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{kpi.value}</h3>
          </motion.div>
        ))}
      </div>

      {viewMode === 'classes' ? (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Batch Performance Overview */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Batch Performance Benchmarking</h3>
                  <p className="text-sm text-slate-500">Comparative analysis of average scores across batches.</p>
                </div>
                <BarChart3 size={20} className="text-teal-600" />
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={MOCK_BATCHES.map(b => ({
                    name: b.name,
                    score: 70 + Math.floor(Math.random() * 25),
                    engagement: 60 + Math.floor(Math.random() * 35)
                  }))}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="score" fill="#0d9488" radius={[4, 4, 0, 0]} name="Avg Score" />
                    <Bar dataKey="engagement" fill="#6366f1" radius={[4, 4, 0, 0]} name="Engagement" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Batch Insights */}
            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Sparkles size={120} />
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Lightbulb size={20} className="text-teal-400" />
                  Cohort Insights
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <h4 className="font-bold text-sm mb-1 text-teal-400">Batch A: High Velocity</h4>
                    <p className="text-xs text-white/60 leading-relaxed">Batch A shows a 15% higher completion rate in "Algebra" compared to others. This correlates with high peer-to-peer interaction.</p>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
                    <h4 className="font-bold text-sm mb-1 text-rose-400">Batch B: Intervention Alert</h4>
                    <p className="text-xs text-white/60 leading-relaxed">A sudden drop in engagement detected in Batch B. 12 students have not logged in for 3+ days.</p>
                  </div>
                  <button className="w-full py-3 teal-gradient text-white rounded-xl font-bold text-sm shadow-lg shadow-teal-900/20 hover:scale-[1.02] transition-all">
                    View Intervention Plans
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Batch Matrix */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900">Batch Matrix</h3>
              {selectedBatch && (
                <button 
                  onClick={() => setSelectedBatch(null)}
                  className="text-sm font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                >
                  <ChevronRight size={16} className="rotate-180" />
                  Back to Matrix
                </button>
              )}
            </div>

            <AnimatePresence mode="wait">
              {!selectedBatch ? (
                <motion.div 
                  key="matrix"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {MOCK_BATCHES.map((batch, i) => (
                    <button 
                      key={batch.id} 
                      onClick={() => setSelectedBatch(batch.id)}
                      className="p-6 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all group text-left"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                          <Users size={20} />
                        </div>
                        <span className="px-2 py-1 bg-teal-50 text-teal-700 text-[10px] font-bold rounded-md uppercase tracking-wider">
                          {batch.academicYear}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">{batch.name}</h4>
                      <p className="text-xs text-slate-500 mb-4">{batch.studentCount} Students • {batch.groupId}</p>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-slate-400 uppercase">Avg Mastery</span>
                          <span className="text-slate-900">82%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-600" style={{ width: '82%' }} />
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold pt-1">
                          <span className="text-slate-400 uppercase">Hours Saved</span>
                          <span className="text-teal-600">42h</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                  key="batch-details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  {/* Batch Analytics Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Attendance Rate</p>
                          <p className="text-xl font-black text-slate-900">96.4%</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Avg. Progress</p>
                          <p className="text-xl font-black text-slate-900">74.2%</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Active Students</p>
                          <p className="text-xl font-black text-slate-900">{MOCK_BATCHES.find(b => b.id === selectedBatch)?.studentCount}</p>
                        </div>
                        <div className="p-4 bg-teal-50 rounded-2xl border border-teal-100">
                          <p className="text-[10px] font-bold text-teal-600 uppercase mb-1">Teacher Hours Saved</p>
                          <p className="text-xl font-black text-teal-700">156h</p>
                        </div>
                      </div>
                      
                      <div className="h-64 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <h4 className="text-xs font-bold text-slate-900 mb-4 uppercase tracking-widest">Weekly Performance Trend</h4>
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={[
                            { name: 'W1', score: 65 },
                            { name: 'W2', score: 68 },
                            { name: 'W3', score: 75 },
                            { name: 'W4', score: 72 },
                            { name: 'W5', score: 80 },
                            { name: 'W6', score: 82 },
                          ]}>
                            <defs>
                              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                                <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                            <YAxis hide />
                            <Tooltip />
                            <Area type="monotone" dataKey="score" stroke="#0d9488" fillOpacity={1} fill="url(#colorScore)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Top Performers</h4>
                      <div className="space-y-3">
                        {MOCK_STUDENTS.filter(s => s.batchId === selectedBatch).slice(0, 3).map(student => (
                          <div key={student.id} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center text-[10px] font-black">
                                {student.avatar}
                              </div>
                              <span className="text-xs font-bold text-slate-700">{student.name}</span>
                            </div>
                            <span className="text-xs font-black text-teal-600">{student.avgScore}%</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl mt-6">
                        <div className="flex items-center gap-2 text-amber-700 mb-2">
                          <AlertTriangle size={14} />
                          <span className="text-[10px] font-bold uppercase">Batch Alert</span>
                        </div>
                        <p className="text-[11px] text-amber-800 leading-relaxed">
                          3 students in this batch are showing declining performance trends in the last 7 days.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-6">
            <AnimatePresence mode="wait">
              {!selectedStudent ? (
                <motion.div 
                  key="student-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Student Intelligence Matrix</h3>
                      <p className="text-sm text-slate-500">Comprehensive view of all students and their cognitive profiles.</p>
                    </div>
                    <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                      <div className="relative flex-1 sm:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          type="text" 
                          placeholder="Search students..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-4 focus:ring-teal-500/10 transition-all w-full sm:w-64"
                        />
                      </div>
                      <select 
                        value={batchFilter}
                        onChange={(e) => setBatchFilter(e.target.value)}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 outline-none focus:ring-4 focus:ring-teal-500/10 transition-all cursor-pointer"
                      >
                        <option>All Batches</option>
                        {MOCK_BATCHES.map(b => (
                          <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                          <th className="px-6 py-4">Student</th>
                          <th className="px-6 py-4">Batch / Class</th>
                          <th className="px-6 py-4 text-center">Avg Score</th>
                          <th className="px-6 py-4 text-center">Risk Level</th>
                          <th className="px-6 py-4">Intelligence Summary</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {MOCK_STUDENTS.filter(s => {
                          const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.id.toLowerCase().includes(searchQuery.toLowerCase());
                          const matchesBatch = batchFilter === 'All Batches' || s.batchId === batchFilter;
                          return matchesSearch && matchesBatch;
                        }).map((student) => {
                          const batch = MOCK_BATCHES.find(b => b.id === student.batchId);
                          const risk = student.riskPrediction.dropoutRisk;
                          
                          return (
                            <tr key={student.id} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-black text-xs">
                                    {student.avatar}
                                  </div>
                                  <div>
                                    <p className="text-sm font-bold text-slate-900">{student.name}</p>
                                    <p className="text-[10px] text-slate-400 font-medium">{student.id}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col">
                                  <span className="text-xs font-bold text-slate-700">{batch?.name || 'Unassigned'}</span>
                                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{batch?.academicYear || 'N/A'}</span>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center">
                                <span className={`text-sm font-black ${student.avgScore >= 90 ? 'text-emerald-600' : student.avgScore >= 75 ? 'text-blue-600' : 'text-rose-600'}`}>
                                  {student.avgScore}%
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-col items-center gap-1">
                                  <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${risk > 50 ? 'bg-rose-500' : risk > 20 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                                      style={{ width: `${risk}%` }} 
                                    />
                                  </div>
                                  <span className={`text-[9px] font-bold uppercase ${risk > 50 ? 'text-rose-600' : risk > 20 ? 'text-amber-600' : 'text-emerald-600'}`}>
                                    {risk > 50 ? 'High' : risk > 20 ? 'Moderate' : 'Low'}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1 max-w-[200px]">
                                  {student.adaptiveProfile.weaknesses.map((w, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded-md">
                                      {w}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => setSelectedStudent(student)}
                                  className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-xl transition-all"
                                  title="View Deep Intelligence"
                                >
                                  <ArrowUpRight size={18} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="student-intelligence"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="flex items-center justify-between">
                    <button 
                      onClick={() => setSelectedStudent(null)}
                      className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-teal-600 transition-colors"
                    >
                      <ChevronRight size={16} className="rotate-180" />
                      Back to Student Matrix
                    </button>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full uppercase">
                        {selectedStudent.status === 'at risk' ? 'Intervention Required' : 'Stable Profile'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Profile & Stats */}
                    <div className="space-y-6">
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <div className="flex flex-col items-center text-center mb-8">
                          <div className="w-24 h-24 rounded-[2rem] bg-teal-50 text-teal-600 flex items-center justify-center text-3xl font-black mb-4">
                            {selectedStudent.avatar}
                          </div>
                          <h2 className="text-2xl font-black text-slate-900">{selectedStudent.name}</h2>
                          <p className="text-slate-500 font-medium">{selectedStudent.id}</p>
                          <div className="mt-4 flex gap-2">
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">
                              {MOCK_BATCHES.find(b => b.id === selectedStudent.batchId)?.name}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">TTU</p>
                            <p className="text-lg font-black text-slate-900">{selectedStudent.ttu}m</p>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Avg Score</p>
                            <p className="text-lg font-black text-teal-600">{selectedStudent.avgScore}%</p>
                          </div>
                        </div>
                      </div>

                      {/* Mastery Radar */}
                      <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h4 className="text-xs font-bold text-slate-900 mb-6 uppercase tracking-widest">Cognitive Mastery</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={Object.entries(selectedStudent.adaptiveProfile.topicMastery).map(([topic, mastery]) => ({ topic, mastery }))}>
                              <PolarGrid stroke="#f1f5f9" />
                              <PolarAngleAxis dataKey="topic" tick={{ fontSize: 8, fontWeight: 'bold' }} />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                              <Radar name={selectedStudent.name} dataKey="mastery" stroke="#0d9488" fill="#0d9488" fillOpacity={0.5} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: AI Insights & Actions */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Interaction Analytics */}
                      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-900 mb-6 flex items-center gap-2">
                          <MessageSquare size={16} className="text-teal-600" />
                          AI Tutor Interaction Depth
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Sentiment</span>
                                <span className="text-xs font-bold text-emerald-600">Positive</span>
                              </div>
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500" style={{ width: '85%' }}></div>
                              </div>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-slate-500 uppercase">Interaction Depth</span>
                                <span className="text-xs font-bold text-indigo-600">High</span>
                              </div>
                              <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500" style={{ width: '72%' }}></div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase mb-3">Struggling Topics (from Chat)</p>
                            <div className="flex flex-wrap gap-2">
                              {selectedStudent.adaptiveProfile.weaknesses.map((w, i) => (
                                <span key={i} className="px-3 py-1.5 bg-white border border-slate-200 text-[10px] font-bold text-slate-600 rounded-xl">
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Improvement Plan */}
                      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          <Brain size={120} />
                        </div>
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                              <Lightbulb size={20} />
                            </div>
                            <h3 className="text-xl font-bold">AI-Generated Improvement Plan</h3>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {selectedStudent.nextBestActions.map((action) => (
                              <div key={action.id} className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm">
                                <div className="flex justify-between items-start mb-3">
                                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${
                                    action.priority === 'High' ? 'bg-rose-500/20 text-rose-400' : 
                                    action.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' : 'bg-teal-500/20 text-teal-400'
                                  }`}>
                                    {action.priority} Priority
                                  </span>
                                  <span className="text-[10px] font-bold text-white/40">{action.confidenceLevel}% Conf.</span>
                                </div>
                                <h4 className="font-bold text-sm mb-2">{action.title}</h4>
                                <p className="text-xs text-white/60 leading-relaxed mb-4">{action.description}</p>
                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                  <span className="text-[10px] font-bold text-teal-400">Impact: +{action.expectedImpact}%</span>
                                  <button className="text-[10px] font-black uppercase tracking-widest text-white hover:text-teal-400 transition-colors">Execute</button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cohort Intelligence Layer */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Cohort Intelligence Layer</h3>
                <p className="text-sm text-slate-500">Comparative analysis across different batches and groups.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Batch 1</span>
                  <select 
                    value={compareBatch1}
                    onChange={(e) => setCompareBatch1(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer"
                  >
                    {MOCK_BATCHES.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Batch 2</span>
                  <select 
                    value={compareBatch2}
                    onChange={(e) => setCompareBatch2(e.target.value)}
                    className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer"
                  >
                    {MOCK_BATCHES.map(b => (
                      <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { topic: 'Algebra', batch1: 85, batch2: 72 },
                    { topic: 'Geometry', batch1: 78, batch2: 88 },
                    { topic: 'Physics', batch1: 65, batch2: 62 },
                    { topic: 'Chemistry', batch1: 92, batch2: 85 },
                    { topic: 'Biology', batch1: 88, batch2: 95 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="topic" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      formatter={(value, name) => [value + '%', name === 'batch1' ? MOCK_BATCHES.find(b => b.id === compareBatch1)?.name : MOCK_BATCHES.find(b => b.id === compareBatch2)?.name]}
                    />
                    <Bar dataKey="batch1" fill="#0d9488" radius={[4, 4, 0, 0]} name={MOCK_BATCHES.find(b => b.id === compareBatch1)?.name || 'Batch 1'} />
                    <Bar dataKey="batch2" fill="#6366f1" radius={[4, 4, 0, 0]} name={MOCK_BATCHES.find(b => b.id === compareBatch2)?.name || 'Batch 2'} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100">
                  <h4 className="text-sm font-bold text-indigo-900 mb-4 flex items-center gap-2">
                    <AlertTriangle size={16} />
                    Critical Performance Gap Detected
                  </h4>
                  <p className="text-xs text-indigo-700 leading-relaxed mb-4">
                    {MOCK_BATCHES.find(b => b.id === compareBatch2)?.name} is struggling with <strong>Algebra</strong> significantly more than {MOCK_BATCHES.find(b => b.id === compareBatch1)?.name} (-13% variance). AI analysis suggests this is due to lower engagement with the "Quadratic Foundations" module in {MOCK_BATCHES.find(b => b.id === compareBatch2)?.name}.
                  </p>
                  <button className="text-xs font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors">View Detailed Comparison</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

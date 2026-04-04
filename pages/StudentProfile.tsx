
import React from 'react';
import { 
  ChevronLeft, 
  Mail, 
  GraduationCap, 
  TrendingUp, 
  Clock, 
  Award, 
  MessageSquare, 
  FileText, 
  Calendar,
  ArrowUpRight,
  Brain,
  CheckCircle2,
  XCircle,
  BarChart3,
  Search,
  Filter,
  X,
  ChevronRight,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { Student, ExamResult } from '../types';

interface StudentProfileProps {
  student: Student;
  onBack: () => void;
  onViewDeepAnalytics?: () => void;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ student, onBack, onViewDeepAnalytics }) => {
  const [isAllExamsModalOpen, setIsAllExamsModalOpen] = React.useState(false);
  const [selectedExam, setSelectedExam] = React.useState<ExamResult | null>(null);

  // Mock data for score history trend
  const scoreHistoryData = [
    { date: 'Jan', score: 82 },
    { date: 'Feb', score: 85 },
    { date: 'Mar', score: 88 },
    { date: 'Apr', score: 84 },
    { date: 'May', score: 91 },
    { date: 'Jun', score: student.avgScore },
  ];

  // AI Tutor analytics mock
  const aiTutorData = [
    { subject: 'Math', queries: 45 },
    { subject: 'Physics', queries: 32 },
    { subject: 'English', queries: 12 },
    { subject: 'Biology', queries: 8 },
  ];

  // Sentiment Analytics
  const sentimentData = [
    { name: 'Confused', value: 40, color: '#f43f5e' },
    { name: 'Curious', value: 35, color: '#0ea5e9' },
    { name: 'Confident', value: 25, color: '#10b981' },
  ];

  // Weekly Activity Analytics
  const activityData = [
    { day: 'Mon', interactions: 12 },
    { day: 'Tue', interactions: 18 },
    { day: 'Wed', interactions: 15 },
    { day: 'Thu', interactions: 25 },
    { day: 'Fri', interactions: 10 },
    { day: 'Sat', interactions: 5 },
    { day: 'Sun', interactions: 8 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excelling': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'on track': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'at risk': return 'bg-rose-50 text-rose-700 border-rose-100';
      default: return 'bg-slate-50 text-slate-700 border-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-bottom border-slate-100 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-50 rounded-xl transition-colors text-slate-500"
            >
              <ChevronLeft size={24} />
            </button>
            <div className="h-8 w-[1px] bg-slate-100 mx-2" />
            <h1 className="text-xl font-bold text-slate-900">Student Profile</h1>
          </div>
          <div className="flex items-center gap-3">
            {onViewDeepAnalytics && (
              <button 
                onClick={onViewDeepAnalytics}
                className="px-4 py-2 rounded-xl bg-teal-50 text-teal-700 text-sm font-bold hover:bg-teal-100 transition-all flex items-center gap-2"
              >
                <Sparkles size={16} />
                Deep Analytics
              </button>
            )}
            <button className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-all">
              Export Report
            </button>
            <button className="px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Message Student
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Top Section: Info Card & Quick Stats */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start"
          >
            <div className="w-32 h-32 rounded-[2rem] bg-teal-600 flex items-center justify-center text-white text-4xl font-bold shadow-xl shadow-teal-100 shrink-0">
              {student.avatar}
            </div>
            <div className="flex-1 text-center md:text-left space-y-4">
              <div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                  <h2 className="text-3xl font-bold text-slate-900">{student.name}</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(student.status)}`}>
                    {student.status}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Mail size={16} />
                    <span className="text-sm">{student.email}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap size={16} />
                    <span className="text-sm">{student.grade}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={16} />
                    <span className="text-sm">Joined Sep 2023</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Score</p>
                  <p className="text-xl font-bold text-slate-900">{student.avgScore}%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Progress</p>
                  <p className="text-xl font-bold text-slate-900">{student.progress}%</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Study Time</p>
                  <p className="text-xl font-bold text-slate-900">{student.studyTime}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Streak</p>
                  <p className="text-xl font-bold text-slate-900">{student.streak} Days</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Performance Overview */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp size={18} className="text-teal-600" />
                Score History
              </h3>
              <select className="text-xs font-bold text-slate-400 bg-transparent outline-none">
                <option>Last 6 Months</option>
              </select>
            </div>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={scoreHistoryData}>
                  <defs>
                    <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" hide />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#0d9488" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#scoreGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-sm">
              <span className="text-slate-500">Overall Improvement</span>
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <ArrowUpRight size={16} />
                +12%
              </span>
            </div>
          </motion.div>
        </div>

        {/* Middle Section: Course Performance & AI Tutor Analytics */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Performance */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Award size={18} className="text-teal-600" />
                Enrolled Courses Performance
              </h3>
            </div>
            <div className="space-y-6">
              {student.subjects.map((subject, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="font-bold text-slate-900">{subject.name}</h4>
                      <p className="text-xs text-slate-500">Current Module: {student.currentModule}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold text-slate-900">{subject.score}%</span>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">Avg Score</p>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                      className="h-full bg-teal-600 rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>PROGRESS: {subject.progress}%</span>
                    <span>TARGET: 95%</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Tutor Analytics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Brain size={18} className="text-teal-600" />
                AI Tutor Engagement
              </h3>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aiTutorData} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} width={60} style={{ fontSize: '12px', fontWeight: 'bold' }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="queries" radius={[0, 4, 4, 0]} barSize={20}>
                    {aiTutorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 0 ? '#0d9488' : '#94a3b8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50 border border-teal-100">
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-teal-600" />
                  <span className="text-xs font-bold text-teal-900">Total Queries</span>
                </div>
                <span className="text-sm font-bold text-teal-900">97</span>
              </div>
              <p className="text-[10px] text-slate-400 text-center uppercase font-bold tracking-widest">
                Most active in Mathematics
              </p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section: Exam Results & Recent AI Logs */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Exam Results */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <FileText size={18} className="text-teal-600" />
                Recent Exam Results
              </h3>
              <button 
                onClick={() => setIsAllExamsModalOpen(true)}
                className="text-xs font-bold text-teal-600 hover:underline"
              >
                View All
              </button>
            </div>
            <div className="space-y-4">
              {student.pastResults?.slice(0, 3).map((result, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setSelectedExam(result)}
                  className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${result.score >= 85 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      {result.score >= 85 ? <CheckCircle2 size={24} /> : <BarChart3 size={24} />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{result.assessmentTitle}</h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Calendar size={12} />
                        {new Date(result.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${result.score >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {result.score}%
                    </span>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Result</p>
                  </div>
                </div>
              ))}
              {(!student.pastResults || student.pastResults.length === 0) && (
                <div className="py-12 text-center text-slate-400 italic text-sm">
                  No recent exam results found.
                </div>
              )}
            </div>
          </motion.div>

          {/* AI Tutor Interaction Analytics */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Brain size={18} className="text-teal-600" />
                AI Interaction Intelligence
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              {/* Sentiment Pie */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Student Sentiment</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        innerRadius={40}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-3">
                  {sentimentData.map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{s.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weekly Activity */}
              <div className="space-y-4">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Activity</p>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activityData}>
                      <XAxis dataKey="day" axisLine={false} tickLine={false} style={{ fontSize: '10px', fontWeight: 'bold' }} />
                      <Bar dataKey="interactions" fill="#0d9488" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Peak Time</p>
                  <p className="text-sm font-bold text-slate-900">Thursday Afternoon</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Top Challenging Concepts</p>
              <div className="flex flex-wrap gap-2">
                {['Quadratic Equations', 'Newton\'s Laws', 'Cell Mitosis', 'Organic Chemistry'].map((concept, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600">
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {isAllExamsModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAllExamsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">All Exam Results</h2>
                  <p className="text-sm text-slate-500">Full assessment history for {student.name}</p>
                </div>
                <button 
                  onClick={() => setIsAllExamsModalOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search assessments..."
                      className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all font-medium"
                    />
                  </div>
                  <button className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                    <Filter size={18} />
                    Filter
                  </button>
                </div>

                <div className="grid gap-4">
                  {student.pastResults?.map((result, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => {
                        setSelectedExam(result);
                        setIsAllExamsModalOpen(false);
                      }}
                      className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-xl hover:border-teal-100 transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${result.score >= 85 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                          {result.score >= 85 ? <CheckCircle2 size={28} /> : <BarChart3 size={28} />}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-slate-900">{result.assessmentTitle}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={14} />
                              {new Date(result.date).toLocaleDateString()}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={14} />
                              45 mins
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-8">
                        <div className="text-right">
                          <span className={`text-2xl font-black ${result.score >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {result.score}%
                          </span>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Score</p>
                        </div>
                        <ChevronRight size={20} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {selectedExam && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedExam(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedExam.score >= 85 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {selectedExam.score >= 85 ? <CheckCircle2 size={24} /> : <BarChart3 size={24} />}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedExam.assessmentTitle}</h2>
                    <p className="text-sm text-slate-500">{new Date(selectedExam.date).toLocaleDateString()} • Detailed Review</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedExam(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X size={24} className="text-slate-400" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-8">
                {/* Score Summary */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Final Score</p>
                    <p className={`text-3xl font-black ${selectedExam.score >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>{selectedExam.score}%</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Correct</p>
                    <p className="text-3xl font-black text-slate-900">18/20</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Spent</p>
                    <p className="text-3xl font-black text-slate-900">32m</p>
                  </div>
                </div>

                {/* Question Review */}
                <div className="space-y-6">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2">
                    <Search size={18} className="text-teal-600" />
                    Question-by-Question Analysis
                  </h3>
                  
                  {selectedExam.answers.length > 0 ? (
                    selectedExam.answers.map((answer, i) => (
                      <div key={i} className={`p-6 rounded-3xl border ${answer.isCorrect ? 'bg-emerald-50/30 border-emerald-100' : 'bg-rose-50/30 border-rose-100'}`}>
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex gap-4">
                            <span className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                              {i + 1}
                            </span>
                            <p className="font-bold text-slate-900">{answer.questionText}</p>
                          </div>
                          {answer.isCorrect ? (
                            <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                          ) : (
                            <XCircle className="text-rose-500 shrink-0" size={20} />
                          )}
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4 ml-12">
                          <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Student's Answer</p>
                            <p className={`text-sm font-bold ${answer.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>{answer.studentAnswer}</p>
                          </div>
                          {!answer.isCorrect && (
                            <div className="space-y-1">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Correct Answer</p>
                              <p className="text-sm font-bold text-emerald-700">{answer.correctAnswer}</p>
                            </div>
                          )}
                        </div>

                        {answer.explanation && (
                          <div className="mt-4 ml-12 p-4 rounded-2xl bg-white/50 border border-slate-100 text-xs text-slate-600 leading-relaxed">
                            <div className="flex items-center gap-2 mb-1 text-teal-600 font-bold uppercase tracking-widest text-[9px]">
                              <Brain size={12} />
                              AI Explanation
                            </div>
                            {answer.explanation}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-12 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
                      <AlertCircle className="mx-auto text-slate-300 mb-3" size={40} />
                      <p className="text-slate-500 font-medium">Detailed question data is not available for this legacy assessment.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};


import React from 'react';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Clock, 
  AlertCircle, 
  TrendingUp, 
  Search, 
  Filter, 
  ChevronRight, 
  SearchCheck,
  Zap,
  Activity,
  Calendar,
  Monitor,
  BrainCircuit,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Lightbulb,
  FileText,
  Share2,
  X
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
  PieChart,
  Pie,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const COURSES = [
  { id: 'math10', name: 'Advanced Mathematics', grade: 'Grade 10' },
  { id: 'phys11', name: 'Classical Mechanics', grade: 'Grade 11' },
  { id: 'bio10', name: 'Cell Biology', grade: 'Grade 10' },
  { id: 'chem12', name: 'Organic Chemistry', grade: 'Grade 12' },
];

const MOCK_DATA: Record<string, any> = {
  math10: {
    engagement: [
      { day: 'Mon', depth: 4.2, resolution: 88, duration: 12 },
      { day: 'Tue', depth: 3.8, resolution: 85, duration: 10 },
      { day: 'Wed', depth: 5.1, resolution: 92, duration: 15 },
      { day: 'Thu', depth: 4.5, resolution: 90, duration: 14 },
      { day: 'Fri', depth: 3.2, resolution: 82, duration: 8 },
    ],
    mostAsked: [
      { text: "How to solve quadratic equations using the formula?", count: 124, topic: "Algebra" },
      { text: "What is the discriminant in a quadratic equation?", count: 86, topic: "Algebra" },
      { text: "When do we use factoring vs the quadratic formula?", count: 54, topic: "Algebra" },
      { text: "What are complex roots?", count: 42, topic: "Algebra" },
    ],
    preExam: [
      { time: '48h', volume: 120, spike: 'Factoring' },
      { time: '36h', volume: 180, spike: 'Quadratic Formula' },
      { time: '24h', volume: 450, spike: 'Discriminant' },
      { time: '12h', volume: 820, spike: 'Complex Roots' },
      { time: 'Exam', volume: 50, spike: 'Last Minute' },
    ],
    stats: { depth: '4.5', resolution: '91.2%', repetition: '12.4%', duration: '14.2' },
    predictiveSuccess: [
      { name: 'Week 1', rate: 72 },
      { name: 'Week 2', rate: 75 },
      { name: 'Week 3', rate: 78 },
      { name: 'Week 4', rate: 82 },
      { name: 'Week 5', rate: 88 },
    ],
    curriculum: [
      { topic: 'Algebra Basics', status: 'completed', progress: 100 },
      { topic: 'Quadratic Equations', status: 'completed', progress: 100 },
      { topic: 'Functions & Graphs', status: 'in-progress', progress: 65 },
      { topic: 'Trigonometry', status: 'upcoming', progress: 0 },
      { topic: 'Calculus Intro', status: 'upcoming', progress: 0 },
    ],
    aiInsights: [
      { type: 'positive', text: '85% of students have mastered "Quadratic Functions" ahead of schedule.', icon: Sparkles },
      { type: 'warning', text: 'Spike in confusion detected regarding "Complex Roots" in the last 24 hours.', icon: AlertCircle },
      { type: 'action', text: 'Recommended: Assign "Discriminant Practice Set B" to 12 students in the "At Risk" group.', icon: Lightbulb },
    ],
    topicMastery: [
      { subject: 'Algebra', A: 120, fullMark: 150 },
      { subject: 'Geometry', A: 98, fullMark: 150 },
      { subject: 'Calculus', A: 86, fullMark: 150 },
      { subject: 'Trigonometry', A: 99, fullMark: 150 },
      { subject: 'Statistics', A: 85, fullMark: 150 },
    ],
    students: [
      { name: 'Sarah Ahmed', progress: 92, struggle: '2.4h', correlation: 0.94, badge: 'Healthy', color: 'emerald', predictiveSuccess: 95 },
      { name: 'Omar Khalid', progress: 45, struggle: '12.8h', correlation: 0.42, badge: 'Alert', color: 'rose', predictiveSuccess: 48 },
      { name: 'Layla Hassan', progress: 78, struggle: '4.2h', correlation: 0.82, badge: 'Watch', color: 'amber', predictiveSuccess: 80 },
      { name: 'Zaid Mansour', progress: 62, struggle: '8.5h', correlation: 0.65, badge: 'At Risk', color: 'orange', predictiveSuccess: 65 },
    ]
  },
  phys11: {
    engagement: [
      { day: 'Mon', depth: 3.5, resolution: 82, duration: 15 },
      { day: 'Tue', depth: 4.1, resolution: 88, duration: 18 },
      { day: 'Wed', depth: 3.9, resolution: 84, duration: 14 },
      { day: 'Thu', depth: 5.2, resolution: 94, duration: 22 },
      { day: 'Fri', depth: 4.8, resolution: 91, duration: 20 },
    ],
    mostAsked: [
      { text: "Newton's second law in non-inertial frames?", count: 98, topic: "Dynamics" },
      { text: "Conservation of angular momentum examples", count: 74, topic: "Rotational Motion" },
      { text: "Difference between static and kinetic friction?", count: 62, topic: "Forces" },
      { text: "Work-energy theorem derivation", count: 45, topic: "Work & Energy" },
    ],
    preExam: [
      { time: '48h', prob: 80, volume: 150, spike: 'Friction' },
      { time: '36h', prob: 85, volume: 220, spike: 'Newton Laws' },
      { time: '24h', prob: 90, volume: 510, spike: 'Conservation' },
      { time: '12h', prob: 95, volume: 940, spike: 'Angular Momentum' },
      { time: 'Exam', prob: 98, volume: 80, spike: 'Final Review' },
    ],
    stats: { depth: '4.2', resolution: '88.5%', repetition: '15.2%', duration: '18.5' },
    predictiveSuccess: [
      { name: 'Week 1', rate: 65 },
      { name: 'Week 2', rate: 68 },
      { name: 'Week 3', rate: 72 },
      { name: 'Week 4', rate: 70 },
      { name: 'Week 5', rate: 75 },
    ],
    curriculum: [
      { topic: 'Kinematics', status: 'completed', progress: 100 },
      { topic: 'Dynamics', status: 'completed', progress: 100 },
      { topic: 'Work & Energy', status: 'in-progress', progress: 45 },
      { topic: 'Rotational Motion', status: 'upcoming', progress: 0 },
      { topic: 'Thermodynamics', status: 'upcoming', progress: 0 },
    ],
    aiInsights: [
      { type: 'positive', text: 'Engagement in "Classical Mechanics" is 15% higher than the institutional average.', icon: Sparkles },
      { type: 'warning', text: '4 students are showing signs of "Passive Participation" (high duration, low depth).', icon: AlertCircle },
      { type: 'action', text: 'Recommended: Host a live Q&A on "Angular Momentum" before Friday\'s assessment.', icon: Lightbulb },
    ],
    topicMastery: [
      { subject: 'Dynamics', A: 110, fullMark: 150 },
      { subject: 'Statics', A: 130, fullMark: 150 },
      { subject: 'Kinematics', A: 140, fullMark: 150 },
      { subject: 'Energy', A: 95, fullMark: 150 },
      { subject: 'Rotation', A: 75, fullMark: 150 },
    ],
    students: [
      { name: 'Ahmed Ali', progress: 85, struggle: '3.1h', correlation: 0.88, badge: 'Healthy', color: 'emerald', predictiveSuccess: 88 },
      { name: 'Fatima Zahra', progress: 38, struggle: '15.2h', correlation: 0.35, badge: 'Alert', color: 'rose', predictiveSuccess: 40 },
      { name: 'Youssef Idris', progress: 65, struggle: '7.8h', correlation: 0.72, badge: 'Watch', color: 'amber', predictiveSuccess: 68 },
      { name: 'Nour El-Din', progress: 55, struggle: '10.2h', correlation: 0.58, badge: 'At Risk', color: 'orange', predictiveSuccess: 58 },
    ]
  }
};

import { 
  MOCK_CURRICULUMS, 
  MOCK_COURSE_INSTANCES, 
  MOCK_STUDENTS 
} from '../constants';

export const CourseTeacherAnalytics: React.FC<{ onViewStudent?: (student: any) => void }> = ({ onViewStudent }) => {
  const [selectedInstanceId, setSelectedInstanceId] = React.useState(MOCK_COURSE_INSTANCES[0].id);
  const [viewMode, setViewMode] = React.useState<'classes' | 'students' | 'compare'>('classes');
  const [selectedCompareIds, setSelectedCompareIds] = React.useState<string[]>([MOCK_COURSE_INSTANCES[0].id]);
  const [selectedStudent, setSelectedStudent] = React.useState<any>(null);
  
  const instance = MOCK_COURSE_INSTANCES.find(i => i.id === selectedInstanceId) || MOCK_COURSE_INSTANCES[0];
  const curriculum = MOCK_CURRICULUMS.find(c => c.id === instance.curriculumId);
  
  const data = MOCK_DATA[instance.courseId] || MOCK_DATA.math10;

  // Use curriculum data if available
  const curriculumDisplay = curriculum ? curriculum.chapters.map(ch => ({
    topic: ch.title,
    status: ch.uploads.length > 0 ? 'completed' : 'in-progress',
    progress: ch.uploads.length > 0 ? 100 : 45
  })) : data.curriculum;

  const [isGenerating, setIsGenerating] = React.useState(false);

  const handleGeneratePrep = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
  };

  const toggleCompareId = (id: string) => {
    setSelectedCompareIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const comparisonData = selectedCompareIds.map(id => {
    const inst = MOCK_COURSE_INSTANCES.find(i => i.id === id) || MOCK_COURSE_INSTANCES[0];
    const cData = MOCK_DATA[inst.courseId] || MOCK_DATA.math10;
    return {
      name: inst.courseName,
      depth: parseFloat(cData.stats.depth),
      resolution: parseFloat(cData.stats.resolution),
      repetition: parseFloat(cData.stats.repetition),
      duration: parseFloat(cData.stats.duration),
      predictive: cData.predictiveSuccess[cData.predictiveSuccess.length - 1].rate
    };
  });

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-[1600px] mx-auto relative">
      {/* Deep Insights Side Panel */}
      <AnimatePresence>
        {selectedStudent && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStudent(null)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-slate-900">Deep Insights</h2>
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                  >
                    <X size={24} className="text-slate-400" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-8 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-16 h-16 rounded-2xl teal-gradient flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-teal-900/20">
                    {selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{selectedStudent.name}</h3>
                    <p className="text-sm text-slate-500 font-medium">{instance.courseName} • {instance.academicYear}</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Cognitive Profile</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-teal-50 border border-teal-100">
                        <p className="text-[10px] font-bold text-teal-600 uppercase mb-1">Mastery</p>
                        <p className="text-2xl font-black text-teal-900">{selectedStudent.progress}%</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-100">
                        <p className="text-[10px] font-bold text-indigo-600 uppercase mb-1">Correlation</p>
                        <p className="text-2xl font-black text-indigo-900">{selectedStudent.correlation}</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Behavioral Patterns</h4>
                    <div className="space-y-3">
                      {[
                        { label: 'Struggle Duration', value: selectedStudent.struggle, icon: Clock, color: 'text-rose-500' },
                        { label: 'Engagement Depth', value: 'High', icon: Activity, color: 'text-emerald-500' },
                        { label: 'Resolution Speed', value: 'Fast', icon: Zap, color: 'text-amber-500' },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-3">
                            <item.icon size={18} className={item.color} />
                            <span className="text-sm font-bold text-slate-700">{item.label}</span>
                          </div>
                          <span className="text-sm font-black text-slate-900">{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">AI Recommendations</h4>
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex gap-3">
                        <Lightbulb size={20} className="text-amber-500 shrink-0" />
                        <p className="text-xs text-amber-900 leading-relaxed font-medium">
                          Student is struggling with <span className="font-bold">Abstract Reasoning</span>. Recommend visual aids and interactive simulations for the next module.
                        </p>
                      </div>
                      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-3">
                        <Target size={20} className="text-blue-500 shrink-0" />
                        <p className="text-xs text-blue-900 leading-relaxed font-medium">
                          High correlation between <span className="font-bold">late-night study</span> and lower quiz scores. Suggest earlier study blocks.
                        </p>
                      </div>
                    </div>
                  </section>

                  <button className="w-full py-4 teal-gradient text-white rounded-2xl font-bold shadow-lg shadow-teal-900/20 hover:scale-[1.02] transition-all">
                    Generate Personalized Study Plan
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-widest">
            <BrainCircuit size={14} />
            AI-Powered Analytics
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Course Intelligence</h1>
          <p className="text-slate-500 text-sm font-medium">Real-time cognitive mapping and student performance tracking.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setViewMode('classes')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'classes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Institutional View
            </button>
            <button 
              onClick={() => setViewMode('students')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'students' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Student Matrix
            </button>
            <button 
              onClick={() => setViewMode('compare')}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${viewMode === 'compare' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Compare
            </button>
          </div>
          
          {viewMode !== 'compare' ? (
            <div className="relative">
              <select 
                value={selectedInstanceId}
                onChange={(e) => setSelectedInstanceId(e.target.value)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-900 outline-none focus:ring-4 focus:ring-teal-500/10 transition-all cursor-pointer"
              >
                {MOCK_COURSE_INSTANCES.map(inst => (
                  <option key={inst.id} value={inst.id}>{inst.courseName} ({inst.academicYear})</option>
                ))}
              </select>
              <ChevronRight size={16} className="absolute right-3 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Select Instances:</span>
              {MOCK_COURSE_INSTANCES.map(inst => (
                <button
                  key={inst.id}
                  onClick={() => toggleCompareId(inst.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                    selectedCompareIds.includes(inst.id) 
                      ? 'bg-teal-50 border-teal-200 text-teal-700' 
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {inst.courseName}
                </button>
              ))}
            </div>
          )}

          <button className="p-2.5 bg-white border border-slate-200 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all">
            <Share2 size={20} />
          </button>
          
          <button 
            onClick={handleGeneratePrep}
            disabled={isGenerating}
            className="px-6 py-2.5 teal-gradient text-white rounded-2xl text-sm font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-teal-900/20 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Activity size={18} className="animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Zap size={18} />
                Generate Prep
              </>
            )}
          </button>
        </div>
      </div>

      {/* AI Intelligence Brief - Only show in single course views */}
      {viewMode !== 'compare' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-500/20 transition-all duration-700" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center text-teal-400">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">AI Intelligence Brief</h2>
                  <p className="text-slate-400 text-xs">Automated insights for {instance.courseName}</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-3 gap-6">
                {data.aiInsights.map((insight: any, i: number) => {
                  const Icon = insight.icon;
                  return (
                    <div key={i} className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        insight.type === 'positive' ? 'bg-emerald-500/20 text-emerald-400' :
                        insight.type === 'warning' ? 'bg-rose-500/20 text-rose-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        <Icon size={16} />
                      </div>
                      <p className="text-xs leading-relaxed text-slate-300">{insight.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Class Health Score</h3>
              <p className="text-xs text-slate-500 mb-6">Based on engagement & mastery</p>
              <div className="flex items-end gap-3">
                <span className="text-6xl font-black text-slate-900 tracking-tighter">88</span>
                <div className="mb-2">
                  <div className="flex items-center gap-1 text-emerald-600 font-bold text-sm">
                    <ArrowUpRight size={16} />
                    +4.2%
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Excellent</div>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Participation</span>
                <span className="text-slate-900">92%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full teal-gradient" style={{ width: '92%' }} />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {viewMode === 'compare' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resolution & Success Comparison */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Performance Benchmarking</h3>
                  <p className="text-sm text-slate-500">Resolution vs. Predictive Success</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                  <Activity size={20} />
                </div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 600 }} 
                    />
                    <Bar dataKey="resolution" name="Resolution Rate (%)" fill="#0A5F6D" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="predictive" name="Predictive Success (%)" fill="#6366f1" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Depth & Duration */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Engagement Intensity</h3>
                  <p className="text-sm text-slate-500">Conversation Depth vs. Session Duration</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 600 }} 
                    />
                    <Bar dataKey="depth" name="Avg Depth (msgs)" fill="#0d9488" radius={[6, 6, 0, 0]} />
                    <Bar dataKey="duration" name="Avg Duration (min)" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Detailed Comparison Table */}
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50">
              <h3 className="text-xl font-bold text-slate-900">Comparative Metrics Matrix</h3>
              <p className="text-sm text-slate-500">Side-by-side raw data analysis</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                    <th className="px-8 py-5">Course</th>
                    <th className="px-8 py-5">Resolution Rate</th>
                    <th className="px-8 py-5">Repetition Rate</th>
                    <th className="px-8 py-5">Avg Depth</th>
                    <th className="px-8 py-5">Avg Duration</th>
                    <th className="px-8 py-5">Predictive Success</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {comparisonData.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-900">{c.name}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-teal-600">{c.resolution}%</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-rose-600">{c.repetition}%</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-700">{c.depth} msgs</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-700">{c.duration} min</span>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500" style={{width: `${c.predictive}%`}} />
                          </div>
                          <span className="text-xs font-black text-slate-900">{c.predictive}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {viewMode === 'classes' ? (
        <div className="space-y-8">
          {/* Engagement Quality Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Avg Conv. Depth', value: `${data.stats.depth} msgs`, trend: '+0.8 vs last week', trendUp: true, icon: MessageSquare, color: 'text-teal-600', bg: 'bg-teal-50' },
              { label: 'Resolution Rate', value: data.stats.resolution, trend: 'Stable', trendUp: true, icon: SearchCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Repetition Rate', value: data.stats.repetition, trend: '+2.1% increase', trendUp: false, icon: Clock, color: 'text-rose-600', bg: 'bg-rose-50' },
              { label: 'Avg Session Duration', value: `${data.stats.duration} min`, trend: 'Peak: 22 min', trendUp: true, icon: Monitor, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon size={20} />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                <p className={`text-[10px] font-bold mt-1 ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {stat.trend}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Predictive Success Rate */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Predictive Success</h3>
                  <p className="text-xs text-slate-500">AI-forecasted pass rate trend</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <TrendingUp size={20} />
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.predictiveSuccess}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 600 }} 
                    />
                    <Line type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={4} dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <p className="text-xs text-indigo-900 font-bold">Forecast Insight</p>
                <p className="text-[10px] text-indigo-700 font-medium mt-1">
                  Class is on a <span className="font-bold">positive trajectory</span>. Predicted final pass rate: <span className="font-bold">92%</span>.
                </p>
              </div>
            </div>

            {/* Curriculum Progress */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900">Curriculum Coverage</h3>
                <BookOpen size={20} className="text-slate-400" />
              </div>
              <div className="space-y-6">
                {curriculumDisplay.map((item: any, i: number) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-slate-700">{item.topic}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'completed' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'in-progress' ? 'bg-blue-50 text-blue-600' :
                        'bg-slate-50 text-slate-400'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${
                        item.status === 'completed' ? 'bg-emerald-500' :
                        item.status === 'in-progress' ? 'bg-blue-500' :
                        'bg-slate-200'
                      }`} style={{ width: `${item.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Topic Mastery Radar */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900">Topic Mastery</h3>
                <Target size={20} className="text-slate-400" />
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.topicMastery}>
                    <PolarGrid stroke="#f1f5f9" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                    <Radar
                      name="Mastery"
                      dataKey="A"
                      stroke="#0A5F6D"
                      strokeWidth={3}
                      fill="#0A5F6D"
                      fillOpacity={0.2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Strongest</p>
                  <p className="text-sm font-bold text-slate-900">{data.topicMastery.sort((a: any, b: any) => b.A - a.A)[0].subject}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Needs Focus</p>
                  <p className="text-sm font-bold text-slate-900">{data.topicMastery.sort((a: any, b: any) => a.A - b.A)[0].subject}</p>
                </div>
              </div>
            </div>

            {/* Most Asked Questions */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900">Knowledge Gaps</h3>
                <div className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                  Critical Gaps: 2
                </div>
              </div>
              <div className="space-y-4">
                {data.mostAsked.map((q: any, i: number) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-teal-500 transition-all cursor-pointer">
                    <div className="flex-1">
                      <p className="text-sm font-bold text-slate-900 leading-tight">"{q.text}"</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-teal-600 font-bold uppercase tracking-widest">{q.topic}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] text-slate-400 font-bold">{q.count} students</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-teal-600 ml-4 shrink-0" />
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border-2 border-dashed border-slate-200 rounded-2xl text-xs font-bold text-slate-500 hover:border-teal-500 hover:text-teal-600 transition-all flex items-center justify-center gap-2">
                <FileText size={14} />
                Generate Lesson Plan for Gaps
              </button>
            </div>

            {/* Pre-Exam Behavior */}
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-slate-900">Pre-Exam Behavior</h3>
                <Calendar size={20} className="text-slate-400" />
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.preExam}>
                    <defs>
                      <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0A5F6D" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#0A5F6D" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 600}} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 600 }} 
                    />
                    <Area type="monotone" dataKey="volume" stroke="#0A5F6D" strokeWidth={4} fillOpacity={1} fill="url(#colorVolume)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                <Zap className="text-amber-500 shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-xs text-amber-900 font-bold">Topic Spike Detected</p>
                  <p className="text-[10px] text-amber-700 font-medium mt-0.5">
                    <span className="font-bold">{data.preExam[data.preExam.length - 2].spike}</span> mentioned {data.preExam[data.preExam.length - 2].volume} times in last 12 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
        >
          <div className="p-8 border-b border-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Student Performance Matrix</h3>
              <p className="text-sm text-slate-500">Individual cognitive metrics for {instance.courseName}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                High Mastery: {data.students.filter((s: any) => s.progress > 80).length}
              </div>
              <div className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-rose-100">
                At Risk: {data.students.filter((s: any) => s.badge === 'At Risk' || s.badge === 'Alert').length}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input type="text" placeholder="Search matrix..." className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium outline-none focus:bg-white focus:ring-4 focus:ring-teal-500/10 transition-all w-48" />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                  <th className="px-8 py-5">Student</th>
                  <th className="px-8 py-5">Engagement Depth</th>
                  <th className="px-8 py-5">Knowledge Progression</th>
                  <th className="px-8 py-5">Struggle Timeline</th>
                  <th className="px-8 py-5">Predictive Success</th>
                  <th className="px-8 py-5">Success Correlation</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data.students.map((s: any, i: number) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl teal-gradient flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-teal-900/10`}>
                          {s.name.split(' ').map((n: string) => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{s.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: STU-00{i+1}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                          <MessageSquare size={14} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{(Math.random() * 5 + 2).toFixed(1)} msgs</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full teal-gradient`} style={{ width: `${s.progress}%` }}></div>
                        </div>
                        <span className="text-xs font-black text-slate-900">{s.progress}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-sm font-bold">{s.struggle}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full bg-indigo-500`} style={{ width: `${s.predictiveSuccess}%` }}></div>
                        </div>
                        <span className="text-xs font-black text-slate-900">{s.predictiveSuccess}%</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg w-fit ${s.correlation > 0.7 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {s.correlation > 0.7 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        <span className="text-xs font-black">{s.correlation}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        s.color === 'emerald' ? 'bg-emerald-50 text-emerald-700' :
                        s.color === 'rose' ? 'bg-rose-50 text-rose-700' :
                        s.color === 'amber' ? 'bg-amber-50 text-amber-700' :
                        'bg-orange-50 text-orange-700'
                      }`}>
                        {s.badge}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => setSelectedStudent(s)}
                        className="px-4 py-2 bg-teal-50 text-teal-600 rounded-xl text-xs font-bold hover:bg-teal-600 hover:text-white transition-all flex items-center gap-2 ml-auto"
                      >
                        Inspect
                        <ChevronRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
};
;

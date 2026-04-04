
import React, { useState, useMemo } from 'react';
import { 
  Zap, 
  TrendingUp, 
  Users, 
  BookOpen, 
  AlertCircle, 
  Download, 
  Filter, 
  Search, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  Calendar,
  MoreVertical,
  ShieldAlert
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
  Area
} from 'recharts';
import { motion } from 'motion/react';

export const AICredits: React.FC = () => {
  const [selectedInstitution, setSelectedInstitution] = useState('All Institutions');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Last 30 Days');
  const [selectedView, setSelectedView] = useState<'overview' | 'classes' | 'students' | 'monetization'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock Data for Credits
  const stats = [
    { label: 'Total Credits Used', value: '4.2M', trend: '+15%', trendUp: true, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Avg per Student', value: '324', trend: '+2.4%', trendUp: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Remaining Budget', value: '1.8M', trend: '-8%', trendUp: false, icon: ShieldAlert, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const usageByClass = [
    { name: 'Batch 2024-A', usage: 450000, students: 1200, color: '#0d9488' },
    { name: 'Group 10-B', usage: 380000, students: 850, color: '#0284c7' },
    { name: 'Science Batch C', usage: 290000, students: 600, color: '#7c3aed' },
  ];

  const usageByCourse = [
    { name: 'Mathematics', usage: 1250000, students: 45000, color: '#0d9488' },
    { name: 'Physics', usage: 850000, students: 32000, color: '#0284c7' },
    { name: 'Biology', usage: 620000, students: 28000, color: '#7c3aed' },
    { name: 'English', usage: 450000, students: 52000, color: '#db2777' },
    { name: 'Chemistry', usage: 380000, students: 15000, color: '#ea580c' },
  ];

  const dailyUsage = [
    { date: 'Oct 18', usage: 95000 },
    { date: 'Oct 19', usage: 102000 },
    { date: 'Oct 20', usage: 115000 },
    { date: 'Oct 21', usage: 108000 },
    { date: 'Oct 22', usage: 125000 },
    { date: 'Oct 23', usage: 118000 },
    { date: 'Oct 24', usage: 132000 },
  ];

  const highConsumers = [
    { id: 'STU001', name: 'Sarah Ahmed', course: 'Physics', usage: 4500, limit: 5000, status: 'Warning' },
    { id: 'STU042', name: 'James Wilson', course: 'Mathematics', usage: 4200, limit: 5000, status: 'Warning' },
    { id: 'STU115', name: 'Elena Rodriguez', course: 'Biology', usage: 3800, limit: 5000, status: 'Normal' },
    { id: 'STU089', name: 'Omar Khalid', course: 'Chemistry', usage: 3600, limit: 5000, status: 'Normal' },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest mb-2">
            <Zap size={14} fill="currentColor" />
            Resource Management
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">AI Credits Intelligence</h1>
          <p className="text-slate-500 mt-2 max-w-2xl">Monitor and optimize AI token consumption across institutions, courses, and individual student sessions.</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-xl mr-4">
            <button 
              onClick={() => setSelectedView('overview')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${selectedView === 'overview' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Overview
            </button>
            <button 
              onClick={() => setSelectedView('classes')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${selectedView === 'classes' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Classes
            </button>
            <button 
              onClick={() => setSelectedView('monetization')}
              className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${selectedView === 'monetization' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Monetization
            </button>
          </div>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={selectedInstitution}
              onChange={(e) => setSelectedInstitution(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20 appearance-none"
            >
              <option>All Institutions</option>
              <option>Cairo Campus</option>
              <option>Alexandria Campus</option>
              <option>Dubai International</option>
            </select>
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="pl-10 pr-8 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-teal-500/20 appearance-none"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Quarter</option>
            </select>
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition-all">
            <Download size={20} />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-black ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-3xl font-black text-slate-900 mt-1">{stat.value}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Credit Consumption Trends</h3>
                <p className="text-sm text-slate-500">Daily token usage across all active sessions.</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-teal-500" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Usage</span>
                </div>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyUsage}>
                  <defs>
                    <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold', fill: '#94a3b8'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#0d9488', strokeWidth: 2, strokeDasharray: '5 5' }}
                  />
                  <Area type="monotone" dataKey="usage" stroke="#0d9488" strokeWidth={4} fillOpacity={1} fill="url(#usageGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8">Consumption by Course</h3>
            <div className="space-y-6">
              {usageByCourse.map((course, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-sm font-bold text-slate-800">{course.name}</p>
                      <p className="text-[10px] text-slate-400 font-medium">{course.students.toLocaleString()} Students</p>
                    </div>
                    <span className="text-sm font-black text-slate-900">{(course.usage / 1000).toFixed(0)}K <span className="text-[10px] text-slate-400 font-bold">credits</span></span>
                  </div>
                  <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(course.usage / 1250000) * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: course.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
              View Detailed Breakdown
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {selectedView === 'classes' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8">Consumption by Class/Batch</h3>
            <div className="space-y-6">
              {usageByClass.map((cls, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{cls.name}</p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{cls.students} Students</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900">{(cls.usage / 1000).toFixed(0)}K</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Credits Used</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
             <div className="relative z-10">
               <h3 className="text-xl font-bold mb-6">High Consumption Batches</h3>
               <div className="space-y-4">
                 {[
                   { name: 'Batch 2024-A', reason: 'Intensive Exam Prep', surge: '+45%' },
                   { name: 'Group 10-B', reason: 'High AI Tutor Engagement', surge: '+22%' },
                 ].map((b, i) => (
                   <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                     <div className="flex justify-between items-center mb-2">
                       <p className="text-sm font-bold">{b.name}</p>
                       <span className="text-xs font-bold text-rose-400">{b.surge} surge</span>
                     </div>
                     <p className="text-[10px] text-slate-400">Reason: {b.reason}</p>
                   </div>
                 ))}
               </div>
             </div>
          </div>
        </div>
      )}

      {selectedView === 'monetization' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-8">Credit Monetization Overview</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">Subscription Revenue</p>
                <p className="text-3xl font-black text-emerald-900">$8,420</p>
                <p className="text-[10px] text-emerald-600 mt-2">From 1,200 active subscriptions</p>
              </div>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Top-up Revenue</p>
                <p className="text-3xl font-black text-blue-900">$3,980</p>
                <p className="text-[10px] text-blue-600 mt-2">From 450 credit pack purchases</p>
              </div>
            </div>
            <div className="mt-8">
              <h4 className="text-sm font-bold text-slate-900 mb-4">Pricing Tiers Performance</h4>
              <div className="space-y-4">
                {[
                  { name: 'Basic (500 credits)', users: 850, revenue: '$4,250' },
                  { name: 'Pro (2000 credits)', users: 320, revenue: '$3,200' },
                  { name: 'Ultimate (Unlimited)', users: 30, revenue: '$970' },
                ].map((tier, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div>
                      <p className="text-sm font-bold text-slate-900">{tier.name}</p>
                      <p className="text-[10px] text-slate-500">{tier.users} Active Users</p>
                    </div>
                    <p className="text-sm font-black text-slate-900">{tier.revenue}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Credit Distribution</h3>
            <div className="space-y-6">
              <div className="p-6 bg-slate-900 rounded-2xl text-white">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">System-wide Allocation</p>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span>Allocated</span>
                      <span>6.0M</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-500" style={{ width: '70%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] font-bold mb-1">
                      <span>Used</span>
                      <span>4.2M</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500" style={{ width: '42%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 bg-teal-600 text-white rounded-xl text-xs font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-900/20">
                Adjust Global Limits
              </button>
            </div>
          </div>
        </div>
      )}

      {/* High Consumption Users */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">High Consumption Users</h3>
            <p className="text-sm text-slate-500">Students approaching their monthly token allocation.</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-teal-500/20 w-full sm:w-64"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-4">Student</th>
                <th className="px-8 py-4">Primary Course</th>
                <th className="px-8 py-4">Credits Used</th>
                <th className="px-8 py-4">Allocation</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {highConsumers.map((user, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{user.name}</p>
                        <p className="text-[10px] text-slate-400 font-medium">{user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-slate-600">{user.course}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{user.usage.toLocaleString()}</span>
                      <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${user.status === 'Warning' ? 'bg-amber-500' : 'bg-teal-500'}`} style={{ width: `${(user.usage / user.limit) * 100}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500 font-medium">{user.limit.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      user.status === 'Warning' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-between items-center">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Showing top consumers across 128,400 students</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">Previous</button>
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

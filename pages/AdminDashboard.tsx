
import React from 'react';
/* Added Search to imports */
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  ChevronLeft,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Search
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { MOCK_ANALYTICS, MOCK_STUDENTS } from '../constants';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const chartData = MOCK_ANALYTICS.labels.map((label, i) => ({
    name: label,
    value: MOCK_ANALYTICS.engagement[i]
  }));

  const stats = [
    { label: 'Total Students', value: '1,284', trend: '+12%', trendUp: true, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Avg Progress', value: '64.2%', trend: '+5.4%', trendUp: true, icon: TrendingUp, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Study Time', value: '18.4h', trend: '-2.1%', trendUp: false, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Avg Score', value: '76.8%', trend: '+3.2%', trendUp: true, icon: BookOpen, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-8 max-w-[1600px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.history.back()} 
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all"
            title="Go Back"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard Overview</h1>
            <p className="text-sm sm:text-base text-slate-500 mt-1">International School of Cairo • Academic Year 2025-2026</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <select className="flex-1 sm:flex-none px-3 sm:px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-semibold outline-none focus:border-teal-500">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
            <option>Current Semester</option>
          </select>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 card-hover">
              <div className="flex justify-between items-start mb-3 sm:mb-4">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:xl ${stat.bg} ${stat.color} flex items-center justify-center`}>
                  <Icon size={20} sm:size={24} />
                </div>
                <div className={`flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg text-[10px] sm:text-xs font-bold ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                  {stat.trendUp ? <ArrowUpRight size={10} sm:size={12} /> : <ArrowDownRight size={10} sm:size={12} />}
                  {stat.trend}
                </div>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-slate-500">{stat.label}</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-0.5 sm:mt-1">{stat.value}</h3>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1.5 sm:mt-2">vs. previous period</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">Student Engagement Over Time</h3>
              <p className="text-xs sm:text-sm text-slate-500">Active hours per week across all departments</p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none px-3 py-1 rounded-lg bg-teal-50 text-teal-700 text-[10px] sm:text-xs font-bold border border-teal-100">Week</button>
              <button className="flex-1 sm:flex-none px-3 py-1 rounded-lg bg-slate-50 text-slate-500 text-[10px] sm:text-xs font-bold border border-slate-100">Month</button>
            </div>
          </div>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }} 
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={window.innerWidth < 640 ? 20 : 40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#0A5F6D' : '#94e2e2'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 sm:mb-6">Performance Distribution</h3>
          <div className="space-y-4 sm:space-y-6">
            {[
              { label: 'Excellent', count: 342, color: 'bg-emerald-500', pct: 45 },
              { label: 'Good', count: 285, color: 'bg-blue-500', pct: 32 },
              { label: 'Average', count: 178, color: 'bg-amber-500', pct: 15 },
              { label: 'Needs Help', count: 92, color: 'bg-red-500', pct: 8 },
            ].map((row, i) => (
              <div key={i} className="space-y-1.5 sm:space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-xs sm:text-sm font-semibold text-slate-700">{row.label}</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">{row.count} <span className="text-slate-400 font-normal">pts</span></span>
                </div>
                <div className="h-1.5 sm:h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${row.color}`} style={{ width: `${row.pct}%` }}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-12 bg-red-50 rounded-xl sm:rounded-2xl p-4 border border-red-100">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                <AlertCircle size={16} sm:size={18} />
              </div>
              <h4 className="font-bold text-red-900 text-xs sm:text-sm">Critical Alert</h4>
            </div>
            <p className="text-[10px] sm:text-xs text-red-800 leading-relaxed">
              AI has identified <span className="font-bold">12 students</span> in Grade 10 Mathematics who are at high risk of failure based on their recent participation drop.
            </p>
            <button 
              onClick={() => onNavigate('students')}
              className="mt-3 sm:mt-4 w-full py-2 bg-red-600 text-white rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-bold hover:bg-red-700 transition-colors"
            >
              Review flagged students
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { title: 'Create Assessment', desc: 'Design new tests with AI support', color: 'bg-teal-50', text: 'text-teal-700', page: 'assessments' },
          { title: 'Management Dashboard', desc: 'Usage, billing & institutional stats', color: 'bg-indigo-50', text: 'text-indigo-700', page: 'management' },
          { title: 'Generate Report', desc: 'Custom institutional analytics', color: 'bg-blue-50', text: 'text-blue-700' },
          { title: 'Manage Groups', desc: 'Organize student cohorts', color: 'bg-purple-50', text: 'text-purple-700' },
          { title: 'Send Bulletin', desc: 'Institutional announcements', color: 'bg-orange-50', text: 'text-orange-700' },
        ].map((action, i) => (
          <button 
            key={i} 
            onClick={() => action.page && onNavigate(action.page)}
            className="group p-5 sm:p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-teal-500 hover:bg-teal-50/20 text-left transition-all"
          >
            <div className={`w-10 h-10 rounded-xl ${action.color} ${action.text} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Plus size={20} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">{action.title}</h4>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-1">{action.desc}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900">Student Progress Tracking</h3>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <div className="relative flex-1 sm:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search students..." className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:border-teal-500 bg-slate-50" />
            </div>
            <button className="px-4 py-2 rounded-xl teal-gradient text-white text-sm font-bold shadow-lg shadow-teal-900/10">
              Add Student
            </button>
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Current Module</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Avg Score</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_STUDENTS.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full teal-gradient flex items-center justify-center text-white font-bold text-xs">
                        {s.avatar}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{s.name}</p>
                        <p className="text-xs text-slate-500 truncate">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{s.currentModule}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-600" style={{ width: `${s.progress}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{s.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono font-bold text-sm text-slate-900">{s.avgScore}%</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold capitalize ${
                      s.status === 'excelling' ? 'bg-emerald-50 text-emerald-700' :
                      s.status === 'on track' ? 'bg-blue-50 text-blue-700' :
                      'bg-red-50 text-red-700'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-50 bg-slate-50/30 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>Showing 2 of 1,284 students</p>
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded bg-teal-600 text-white font-bold">1</button>
            <button className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

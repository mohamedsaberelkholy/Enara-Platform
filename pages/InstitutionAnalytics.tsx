
import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  Clock, 
  Users, 
  BookOpen, 
  AlertTriangle, 
  DollarSign, 
  LifeBuoy,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Search,
  Filter
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
  Pie
} from 'recharts';

const CREDIT_DATA = [
  { name: 'Used', value: 350000, color: '#0A5F6D' },
  { name: 'Remaining', value: 650000, color: '#e2e8f0' },
];

const COURSE_BURN = [
  { name: 'Mathematics', credits: 124000 },
  { name: 'Physics', credits: 98000 },
  { name: 'Chemistry', credits: 75000 },
  { name: 'Biology', credits: 42000 },
  { name: 'English', credits: 11000 },
];

const COURSE_RANKING = [
  { name: 'Advanced Mathematics', engagement: 94, struggle: 12 },
  { name: 'Classical Mechanics', engagement: 88, struggle: 18 },
  { name: 'Organic Chemistry', engagement: 72, struggle: 34 },
  { name: 'Cell Biology', engagement: 65, struggle: 42 },
];

export const InstitutionAnalytics: React.FC = () => {
  return (
    <div className="space-y-8 p-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Institutional Governance</h1>
          <p className="text-slate-500 mt-1">Comprehensive AI oversight for International School of Cairo</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
            Download Report
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            Contact Enara Support
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
              <Zap size={24} />
            </div>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">High Burn</span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Credits Used</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">350,000 / 1M</h3>
          <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
            <Clock size={12} /> Projected depletion: <span className="font-bold text-rose-600">May 12, 2026</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <DollarSign size={24} />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency Metrics</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">$10.42 / stu</h3>
          <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
            <TrendingUp size={12} className="text-emerald-500" /> $0.14 per resolved question
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <LifeBuoy size={24} />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Teacher ROI</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">1,240 Hours</h3>
          <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
            <ArrowUpRight size={12} className="text-emerald-500" /> 94% Student Self-Service Rate
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users size={24} />
            </div>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Adoption Ratio</p>
          <h3 className="text-2xl font-black text-slate-900 mt-1">84.2%</h3>
          <p className="text-[10px] text-slate-500 mt-2 flex items-center gap-1">
            <Users size={12} /> 1,081 Active / 1,284 Enrolled
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Credit Burn Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Credits Burned per Course</h3>
              <p className="text-sm text-slate-500">Identifying high-consumption academic areas</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={COURSE_BURN} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} width={100} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px' }} 
                />
                <Bar dataKey="credits" fill="#0A5F6D" radius={[0, 4, 4, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credit Distribution */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Credit Allocation</h3>
          <div className="h-64 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={CREDIT_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CREDIT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-900">35%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Consumed</span>
            </div>
          </div>
          <div className="space-y-3 mt-6">
            {CREDIT_DATA.map((item, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs font-bold text-slate-700">{item.name}</span>
                </div>
                <span className="text-xs font-black text-slate-900">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Course Engagement & Struggle Ranking */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Course Engagement & Health Ranking</h3>
            <p className="text-sm text-slate-500">Ranking courses by student interaction and health metrics.</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <Filter size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all">
              <Search size={20} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border-b border-slate-100">
                <th className="px-8 py-5">Course Name</th>
                <th className="px-8 py-5">Engagement Score</th>
                <th className="px-8 py-5">Struggle Rate</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {COURSE_RANKING.map((course, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 font-bold text-xs">
                        {course.name[0]}
                      </div>
                      <span className="text-sm font-bold text-slate-900">{course.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full ${course.engagement > 80 ? 'bg-emerald-500' : course.engagement > 70 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${course.engagement}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-slate-700">{course.engagement}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`text-sm font-bold ${course.struggle > 30 ? 'text-rose-600' : 'text-slate-700'}`}>{course.struggle}%</span>
                  </td>
                  <td className="px-8 py-6">
                    {course.struggle > 30 ? (
                      <div className="flex items-center gap-1.5 text-rose-600">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Critical Intervention</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-emerald-600">
                        <TrendingUp size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Healthy</span>
                      </div>
                    )}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                      <ChevronRight size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight,
  Zap
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const GROWTH_DATA = [
  { name: 'Sep', mrr: 280000, arr: 3360000, students: 900000, growth: 5.2 },
  { name: 'Oct', mrr: 310000, arr: 3720000, students: 950000, growth: 10.7 },
  { name: 'Nov', mrr: 340000, arr: 4080000, students: 1020000, growth: 9.6 },
  { name: 'Dec', mrr: 320000, arr: 3840000, students: 1050000, growth: -5.8 },
  { name: 'Jan', mrr: 380000, arr: 4560000, students: 1120000, growth: 18.7 },
  { name: 'Feb', mrr: 400000, arr: 4800000, students: 1180000, growth: 5.2 },
  { name: 'Mar', mrr: 420000, arr: 5040000, students: 1200000, growth: 5.0 },
];

export const RevenueGrowth: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <DollarSign size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ArrowUpRight size={14} /> +12.4%
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">MRR</p>
          <h3 className="text-2xl font-black text-slate-900">$420,000</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ArrowUpRight size={14} /> +15.2%
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">ARR</p>
          <h3 className="text-2xl font-black text-slate-900">$5.04M</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Users size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ArrowUpRight size={14} /> +8.1%
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Students</p>
          <h3 className="text-2xl font-black text-slate-900">842,000</h3>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Zap size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <ArrowUpRight size={14} /> +24%
            </span>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Credit Consumption</p>
          <h3 className="text-2xl font-black text-slate-900">2.4M / mo</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6">MRR Growth Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorMrr" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Area type="monotone" dataKey="mrr" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorMrr)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6">MoM Growth Rate (%)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={GROWTH_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="growth" radius={[4, 4, 0, 0]}>
                  {GROWTH_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.growth > 0 ? '#10b981' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
